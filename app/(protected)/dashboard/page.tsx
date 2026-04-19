"use client";

import React, { useMemo, useState } from "react";
import {
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
  AlertTriangle,
} from "lucide-react";
import MainLayout from "@/app/components/layout/MainLayout";
import MonthlyOverviewChart from "@/app/components/dashboard/MonthlyOverviewChart";
import RecentActivityCard from "@/app/components/dashboard/RecentActivityCard";
import QuickActions from "@/app/components/dashboard/QuickActions";
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
  /** Controls the color of the change pill. */
  changeTone: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
  iconFg: string;
}

const StatTile: React.FC<StatCardData> = ({
  title,
  value,
  change,
  changeTone,
  icon,
  iconBg,
  iconFg,
}) => {
  const toneClasses =
    changeTone === "positive"
      ? "text-emerald-600"
      : changeTone === "negative"
        ? "text-red-600"
        : "text-gray-500";

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="space-y-2 min-w-0">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-800 truncate">
          {value}
        </h3>
        {change && (
          <div className={`flex items-center text-sm font-medium ${toneClasses}`}>
            {changeTone === "positive" ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : changeTone === "negative" ? (
              <TrendingDown className="mr-1 h-4 w-4" />
            ) : null}
            {change}
          </div>
        )}
      </div>
      <div className={`rounded-full p-3 ${iconBg} ${iconFg} shrink-0`}>
        {icon}
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
      <div className="h-full p-6 space-y-6 bg-gray-50 min-h-screen">
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
                icon={<Wallet className="h-5 w-5" />}
                iconBg="bg-emerald-50"
                iconFg="text-emerald-600"
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
                icon={<TrendingDown className="h-5 w-5" />}
                iconBg="bg-red-50"
                iconFg="text-red-600"
              />
              <StatTile
                title="Net Savings"
                value={formatCurrency(netSavings)}
                change={
                  savingsChangePct === null ? null : formatPct(savingsChangePct)
                }
                changeTone={savingsTileTone}
                icon={<PiggyBank className="h-5 w-5" />}
                iconBg="bg-blue-50"
                iconFg="text-blue-600"
              />
            </>
          ) : (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border bg-white p-5 shadow-sm animate-pulse"
                >
                  <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                  <div className="h-7 w-32 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 w-28 bg-gray-100 rounded"></div>
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
              <div className="rounded-2xl border bg-white p-5 shadow-sm animate-pulse">
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
              <div className="rounded-2xl border bg-white p-5 shadow-sm animate-pulse">
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
