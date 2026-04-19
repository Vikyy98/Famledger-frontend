"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import MainLayout from "@/app/components/layout/MainLayout";
import MonthlyOverviewChart from "@/app/components/dashboard/MonthlyOverviewChart";
import RecentActivityCard from "@/app/components/dashboard/RecentActivityCard";
import QuickActions from "@/app/components/dashboard/QuickActions";
import Sparkline, {
  SparklineTone,
} from "@/app/components/dashboard/Sparkline";
import IncomeModal, {
  IncomeFormData,
} from "@/app/components/income/IncomeModal";
import ExpenseModal, {
  ExpenseFormData,
} from "@/app/components/expense/ExpenseModal";
import {
  useGetIncomeDetailsQuery,
  useAddIncomeMutation,
} from "@/app/services/api/incomeAPI";
import incomeApi from "@/app/services/api/incomeAPI";
import {
  useGetExpenseDetailsQuery,
  useGetExpenseCategoriesQuery,
  useAddExpenseMutation,
} from "@/app/services/api/expenseAPI";
import expenseApi from "@/app/services/api/expenseAPI";
import { useGetFamilyMembersQuery } from "@/app/services/api/familyAPI";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useAuth";
import {
  AddIncomeRequest,
  IncomeDetails,
  IncomeMonthlyTrend,
} from "@/app/types/income";
import {
  AddExpenseRequest,
  ExpenseDetails,
  ExpenseMonthlyTrend,
} from "@/app/types/expense";

// Parse "12,450" / "₹12,450.00" into a number. Returns 0 for falsy/NaN.
const parseCurrencyString = (value: string | undefined): number => {
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Compute Net Savings percentage change vs last month.
const computeNetSavingsPercentChange = (
  incomeTrend: IncomeMonthlyTrend[],
  expenseTrend: ExpenseMonthlyTrend[]
): number | null => {
  if (incomeTrend.length < 2 && expenseTrend.length < 2) return null;

  const buildMap = (
    trend: { month: string; year: number; total: number }[]
  ) => {
    const m = new Map<string, number>();
    for (const p of trend) m.set(`${p.month}-${p.year}`, p.total);
    return m;
  };

  // Use the last two entries from income trend as the month anchors (oldest -> newest).
  const lastTwo = incomeTrend.slice(-2);
  if (lastTwo.length < 2) return null;
  const [prev, curr] = lastTwo;
  const expByKey = buildMap(expenseTrend);

  const prevNet =
    prev.total - (expByKey.get(`${prev.month}-${prev.year}`) ?? 0);
  const currNet =
    curr.total - (expByKey.get(`${curr.month}-${curr.year}`) ?? 0);

  if (prevNet === 0) {
    if (currNet === 0) return 0;
    return currNet > 0 ? 100 : -100;
  }
  return ((currNet - prevNet) / Math.abs(prevNet)) * 100;
};

interface StatCardData {
  title: string;
  value: string;
  change: string | null;
  /** Controls the color of the change indicator and sparkline accent. */
  changeTone: "positive" | "negative" | "neutral";
  /** Controls the color of the headline number. income=emerald, expense=rose, neutral=ink. */
  valueTone: "income" | "expense" | "neutral";
  sparklineData: number[];
  sparklineTone: SparklineTone;
}

const StatTile: React.FC<StatCardData> = ({
  title,
  value,
  change,
  changeTone,
  valueTone,
  sparklineData,
  sparklineTone,
}) => {
  const toneText =
    changeTone === "positive"
      ? "text-emerald-600"
      : changeTone === "negative"
        ? "text-rose-600"
        : "text-gray-500";

  const toneDot =
    changeTone === "positive"
      ? "bg-emerald-500"
      : changeTone === "negative"
        ? "bg-rose-500"
        : "bg-gray-400";

  const valueToneClass =
    valueTone === "income"
      ? "text-emerald-600"
      : valueTone === "expense"
        ? "text-rose-600"
        : "text-gray-900";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-200 hover:border-gray-300">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {title}
          </p>
          <h3 className={`mt-2 text-3xl font-semibold tracking-tight tabular-nums truncate ${valueToneClass}`}>
            {value}
          </h3>
          {change ? (
            <div
              className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${toneText}`}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${toneDot}`}
                aria-hidden
              />
              <span className="tabular-nums">{change}</span>
            </div>
          ) : (
            <div className="mt-2 h-4" aria-hidden />
          )}
        </div>
        <div className="w-24 shrink-0 sm:w-28">
          <Sparkline data={sparklineData} tone={sparklineTone} height={44} />
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const familyId = user?.familyId;
  const dispatch = useAppDispatch();

  const {
    data: incomeData,
    isSuccess: incomeSuccess,
    isError: incomeError,
  } = useGetIncomeDetailsQuery(familyId ?? 0, { skip: !familyId });
  const {
    data: expenseData,
    isSuccess: expenseSuccess,
    isError: expenseError,
  } = useGetExpenseDetailsQuery(familyId ?? 0, { skip: !familyId });
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetExpenseCategoriesQuery();
  const { data: members = [] } = useGetFamilyMembersQuery(familyId ?? 0, {
    skip: !familyId,
  });

  const memberNamesByUserId = useMemo(() => {
    const map: Record<number, string> = {};
    for (const m of members) map[m.id] = m.fullName;
    return map;
  }, [members]);

  const [addIncomeMutation] = useAddIncomeMutation();
  const [addExpenseMutation] = useAddExpenseMutation();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const isDataReady = incomeSuccess && expenseSuccess && incomeData && expenseData;
  const hasFatalError = incomeError || expenseError;

  // Totals & changes
  const totalIncome = parseCurrencyString(incomeData?.totalIncome);
  const totalExpense = parseCurrencyString(expenseData?.totalExpense);
  const netSavings = totalIncome - totalExpense;

  const incomeChangePct = parseFloat(incomeData?.percentageDifference ?? "");
  const expenseChangePct = parseFloat(expenseData?.percentageDifference ?? "");
  const savingsChangePct = useMemo(
    () =>
      isDataReady
        ? computeNetSavingsPercentChange(
            incomeData.monthlyTrend ?? [],
            expenseData.monthlyTrend ?? []
          )
        : null,
    [isDataReady, incomeData, expenseData]
  );

  // Aligned monthly series for the three stat-tile sparklines.
  // All three share the same month axis (union of income+expense months, chronological).
  const sparkSeries = useMemo(() => {
    if (!isDataReady) {
      return { income: [] as number[], expense: [] as number[], savings: [] as number[] };
    }
    const incomeTrend = incomeData.monthlyTrend ?? [];
    const expenseTrend = expenseData.monthlyTrend ?? [];
    const keyOf = (m: string, y: number) => `${y}-${m}`;

    const order: string[] = [];
    const incomeBy = new Map<string, number>();
    const expenseBy = new Map<string, number>();
    const seen = new Set<string>();

    for (const p of incomeTrend) {
      const k = keyOf(p.month, p.year);
      incomeBy.set(k, p.total);
      if (!seen.has(k)) {
        seen.add(k);
        order.push(k);
      }
    }
    for (const p of expenseTrend) {
      const k = keyOf(p.month, p.year);
      expenseBy.set(k, p.total);
      if (!seen.has(k)) {
        seen.add(k);
        order.push(k);
      }
    }

    const income = order.map((k) => incomeBy.get(k) ?? 0);
    const expense = order.map((k) => expenseBy.get(k) ?? 0);
    const savings = order.map((_, i) => income[i] - expense[i]);
    return { income, expense, savings };
  }, [isDataReady, incomeData, expenseData]);

  const formatPct = (v: number) =>
    `${v > 0 ? "+" : ""}${v.toFixed(1)}% from last month`;

  const incomeTileTone: StatCardData["changeTone"] = Number.isNaN(incomeChangePct)
    ? "neutral"
    : incomeChangePct >= 0
      ? "positive"
      : "negative";

  // For expenses, a decrease is GOOD → show green; an increase is bad → red.
  const expenseTileTone: StatCardData["changeTone"] = Number.isNaN(expenseChangePct)
    ? "neutral"
    : expenseChangePct <= 0
      ? "positive"
      : "negative";

  const savingsTileTone: StatCardData["changeTone"] =
    savingsChangePct === null
      ? "neutral"
      : savingsChangePct >= 0
        ? "positive"
        : "negative";

  const handleSubmitIncome = async (formData: IncomeFormData) => {
    try {
      const payload: AddIncomeRequest = {
        source: formData.source,
        amount: parseFloat(formData.amount),
        userId: user?.id,
        familyId: user?.familyId,
        type: formData.incomeType === "RECURRING" ? 1 : 2,
        frequency:
          formData.incomeType === "RECURRING"
            ? formData.recurringFrequency
            : "ONETIME",
        dateReceived: formData.date,
      };
      const created: IncomeDetails = await addIncomeMutation(payload).unwrap();
      if (created && created.familyId) {
        dispatch(
          incomeApi.util.updateQueryData(
            "getIncomeDetails",
            created.familyId,
            (draft) => {
              if (!draft.incomes) draft.incomes = [];
              draft.incomes.unshift(created);
            }
          )
        );
      }
    } catch (err) {
      console.error("Failed to add income:", err);
      throw err;
    }
  };

  const handleSubmitExpense = async (formData: ExpenseFormData) => {
    try {
      const payload: AddExpenseRequest = {
        userId: user?.id,
        familyId: user?.familyId,
        description: formData.description,
        category: parseInt(formData.category, 10),
        amount: parseFloat(formData.amount),
        expenseDate: formData.expenseDate,
      };
      const created: ExpenseDetails = await addExpenseMutation(payload).unwrap();
      if (created && created.familyId) {
        dispatch(
          expenseApi.util.updateQueryData(
            "getExpenseDetails",
            created.familyId,
            (draft) => {
              if (!draft.expenses) draft.expenses = [];
              draft.expenses.unshift(created);
            }
          )
        );
      }
    } catch (err) {
      console.error("Failed to add expense:", err);
      throw err;
    }
  };

  if (hasFatalError) {
    return (
      <MainLayout>
        <div className="h-screen flex justify-center items-center bg-red-100 text-red-700">
          <AlertTriangle className="h-8 w-8 mr-2" />
          <p>Could not load your dashboard. Please try again.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {isDataReady ? (
            <>
              <StatTile
                title="Total Income"
                value={formatCurrency(totalIncome)}
                change={
                  Number.isNaN(incomeChangePct) ? null : formatPct(incomeChangePct)
                }
                changeTone={incomeTileTone}
                valueTone="income"
                sparklineData={sparkSeries.income}
                sparklineTone="income"
              />
              <StatTile
                title="Total Expenses"
                value={formatCurrency(totalExpense)}
                change={
                  Number.isNaN(expenseChangePct)
                    ? null
                    : formatPct(expenseChangePct)
                }
                changeTone={expenseTileTone}
                valueTone="expense"
                sparklineData={sparkSeries.expense}
                sparklineTone="expense"
              />
              <StatTile
                title="Net Savings"
                value={formatCurrency(netSavings)}
                change={
                  savingsChangePct === null ? null : formatPct(savingsChangePct)
                }
                changeTone={savingsTileTone}
                valueTone="neutral"
                sparklineData={sparkSeries.savings}
                sparklineTone="savings"
              />
            </>
          ) : (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
                      <div className="h-8 w-32 bg-gray-200 rounded mb-3" />
                      <div className="h-3 w-28 bg-gray-100 rounded" />
                    </div>
                    <div className="h-11 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {isDataReady ? (
              <MonthlyOverviewChart
                incomeTrend={incomeData.monthlyTrend ?? []}
                expenseTrend={expenseData.monthlyTrend ?? []}
              />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
                <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-[280px] w-full bg-gray-100 rounded"></div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {isDataReady ? (
              <RecentActivityCard
                incomes={incomeData.incomes ?? []}
                expenses={expenseData.expenses ?? []}
                memberNamesByUserId={memberNamesByUserId}
                categories={categories}
                currentUserId={user?.id}
                currentUserName={user?.name}
              />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
                <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <QuickActions
          onAddIncome={() => setIsIncomeModalOpen(true)}
          onAddExpense={() => setIsExpenseModalOpen(true)}
        />
      </div>

      <IncomeModal
        mode="add"
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onSubmit={handleSubmitIncome}
      />
      <ExpenseModal
        mode="add"
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleSubmitExpense}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />
    </MainLayout>
  );
};

export default DashboardPage;
