"use client";

import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { IncomeMonthlyTrend } from "@/app/types/income";
import { ExpenseMonthlyTrend } from "@/app/types/expense";

interface MonthlyOverviewChartProps {
  incomeTrend: IncomeMonthlyTrend[];
  expenseTrend: ExpenseMonthlyTrend[];
}

type MergedPoint = {
  label: string;
  income: number;
  expense: number;
};

// Merge both trends keyed by "month year" so misalignment never silently drops data.
const mergeTrends = (
  incomeTrend: IncomeMonthlyTrend[],
  expenseTrend: ExpenseMonthlyTrend[]
): MergedPoint[] => {
  const keyOf = (m: string, y: number) => `${m}-${y}`;
  const byKey = new Map<string, MergedPoint>();

  for (const i of incomeTrend) {
    const k = keyOf(i.month, i.year);
    byKey.set(k, {
      label: `${i.month} ${String(i.year).slice(-2)}`,
      income: i.total,
      expense: 0,
    });
  }
  for (const e of expenseTrend) {
    const k = keyOf(e.month, e.year);
    const existing = byKey.get(k);
    if (existing) {
      existing.expense = e.total;
    } else {
      byKey.set(k, {
        label: `${e.month} ${String(e.year).slice(-2)}`,
        income: 0,
        expense: e.total,
      });
    }
  }
  // Preserve chronological order coming from the API; the backend already returns oldest first.
  return Array.from(byKey.values());
};

// Abbreviate for Y-axis: 1,25,000 -> "₹1.25L", 12,000 -> "₹12k".
const formatShortINR = (value: number) => {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(0)}k`;
  return `₹${value}`;
};

const formatFullINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const MonthlyOverviewChart: React.FC<MonthlyOverviewChartProps> = ({
  incomeTrend,
  expenseTrend,
}) => {
  const data = mergeTrends(incomeTrend, expenseTrend);
  const hasData = data.some((d) => d.income > 0 || d.expense > 0);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Overview</h3>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center text-emerald-600">
            <span className="inline-block w-2 h-2 mr-1 bg-emerald-500 rounded-full" />
            Income
          </span>
          <span className="flex items-center text-red-500">
            <span className="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full" />
            Expense
          </span>
        </div>
      </div>

      {hasData ? (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="label" className="text-xs" />
            <YAxis tickFormatter={formatShortINR} className="text-xs" />
            <Tooltip
              formatter={(value) => {
                const n = typeof value === "number" ? value : Number(value);
                return Number.isFinite(n) ? formatFullINR(n) : "—";
              }}
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[280px] flex items-center justify-center text-sm text-gray-500">
          Add some income or expenses to see your monthly overview.
        </div>
      )}
    </div>
  );
};

export default MonthlyOverviewChart;
