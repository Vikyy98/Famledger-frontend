"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";
import { IncomeDetails } from "@/app/types/income";
import { ExpenseDetails, ExpenseCategoryOption } from "@/app/types/expense";

interface RecentActivityCardProps {
  incomes: IncomeDetails[];
  expenses: ExpenseDetails[];
  memberNamesByUserId?: Record<number, string>;
  categories?: ExpenseCategoryOption[];
  currentUserId?: number;
  currentUserName?: string;
  limit?: number;
}

type ActivityItem = {
  key: string;
  kind: "income" | "expense";
  title: string;
  subtitle: string;
  amount: number;
  sortKey: string;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatIndianDate = (value?: string) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  incomes,
  expenses,
  memberNamesByUserId,
  categories,
  currentUserId,
  currentUserName,
  limit = 5,
}) => {
  const resolveMember = (userId: number) => {
    if (currentUserId === userId) {
      return currentUserName || memberNamesByUserId?.[userId] || "You";
    }
    return memberNamesByUserId?.[userId] || `Member ${userId}`;
  };

  const categoryNameByValue = useMemo(() => {
    const map: Record<number, string> = {};
    for (const c of categories ?? []) map[c.value] = c.name;
    return map;
  }, [categories]);

  const items = useMemo<ActivityItem[]>(() => {
    const incomeItems: ActivityItem[] = incomes
      .filter((i) => i.status)
      .map((i) => ({
        key: `inc-${i.id}-${i.type}`,
        kind: "income",
        title: i.source,
        subtitle: `${resolveMember(i.userId)} · ${formatIndianDate(i.dateReceived)}`,
        amount: i.amount,
        sortKey: i.updatedOn || i.createdOn || i.dateReceived,
      }));

    const expenseItems: ActivityItem[] = expenses
      .filter((e) => e.status)
      .map((e) => ({
        key: `exp-${e.id}`,
        kind: "expense",
        title: e.description,
        subtitle: `${resolveMember(e.userId)} · ${
          categoryNameByValue[e.category] ?? ""
        } · ${formatIndianDate(e.expenseDate)}`.replace(/·\s*·/g, "·"),
        amount: e.amount,
        sortKey: e.updatedOn || e.createdOn || e.expenseDate,
      }));

    return [...incomeItems, ...expenseItems]
      .sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1))
      .slice(0, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomes, expenses, memberNamesByUserId, categoryNameByValue, currentUserId, currentUserName, limit]);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No activity yet. Add income or an expense to get started.
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {items.map((item) => {
              const isIncome = item.kind === "income";
              return (
                <li
                  key={item.key}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div
                    className={`rounded-full p-2 shrink-0 ${
                      isIncome
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600"
                    }`}
                    aria-hidden
                  >
                    {isIncome ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {item.subtitle}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-semibold whitespace-nowrap ${
                      isIncome ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {isIncome ? "+" : "−"}
                    {formatCurrency(item.amount)}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-center justify-end gap-4 text-xs font-medium">
            <Link
              href="/income"
              className="text-emerald-600 hover:text-emerald-700"
            >
              View income →
            </Link>
            <Link href="/expense" className="text-red-600 hover:text-red-700">
              View expenses →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentActivityCard;
