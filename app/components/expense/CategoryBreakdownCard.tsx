import React, { useMemo, useState } from "react";
import {
  CategoryBreakdown,
  ExpenseCategoryOption,
  ExpenseDetails,
} from "@/app/types/expense";

type RangeKey = "this" | "last" | "3m" | "all";

interface CategoryBreakdownCardProps {
  /** Fallback breakdown from the API (used only for "this month" when expenses aren't provided). */
  breakdown: CategoryBreakdown[];
  /** All active expenses for the family. Required for non-current-month ranges. */
  expenses?: ExpenseDetails[];
  /** Category metadata used to resolve names for client-side computed breakdowns. */
  categories?: ExpenseCategoryOption[];
}

// Tailwind classes for the stacked bar segments and legend dots.
// Kept slightly desaturated (400s) so the whole stack reads as one unit rather than
// eight competing primaries. The dot in the legend uses the same class.
const CATEGORY_SEGMENT_COLORS: Record<string, string> = {
  Food: "bg-orange-400",
  Housing: "bg-indigo-500",
  Transport: "bg-sky-400",
  Utilities: "bg-amber-400",
  Entertainment: "bg-pink-400",
  Medical: "bg-rose-500",
  Education: "bg-emerald-400",
  Other: "bg-gray-400",
};

const DEFAULT_SEGMENT_COLOR = "bg-gray-300";

const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "this", label: "This Month" },
  { key: "last", label: "Last Month" },
  { key: "3m", label: "3M" },
  { key: "all", label: "All" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Inclusive range [start, end] of ISO yyyy-MM-dd strings for the selected window.
const getRangeBounds = (range: RangeKey): { start?: string; end?: string } => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-based

  const toISO = (d: Date) => d.toISOString().slice(0, 10);

  if (range === "this") {
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0);
    return { start: toISO(start), end: toISO(end) };
  }
  if (range === "last") {
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0);
    return { start: toISO(start), end: toISO(end) };
  }
  if (range === "3m") {
    // Current month + previous 2 full months (3 months inclusive).
    const start = new Date(y, m - 2, 1);
    const end = new Date(y, m + 1, 0);
    return { start: toISO(start), end: toISO(end) };
  }
  return {};
};

const computeBreakdown = (
  expenses: ExpenseDetails[],
  categories: ExpenseCategoryOption[],
  range: RangeKey
): CategoryBreakdown[] => {
  const { start, end } = getRangeBounds(range);
  const filtered = expenses.filter((e) => {
    if (!e.status) return false;
    if (start && e.expenseDate < start) return false;
    if (end && e.expenseDate > end) return false;
    return true;
  });

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  if (total <= 0) return [];

  const nameByValue = new Map(categories.map((c) => [c.value, c.name]));
  const totalsByCategory = new Map<number, number>();
  for (const e of filtered) {
    totalsByCategory.set(
      e.category,
      (totalsByCategory.get(e.category) ?? 0) + e.amount
    );
  }

  return Array.from(totalsByCategory.entries())
    .map(([category, amount]) => ({
      category,
      categoryName: nameByValue.get(category) ?? "Other",
      amount,
      percentage: Math.round((amount / total) * 10000) / 100,
    }))
    .sort((a, b) => b.amount - a.amount);
};

const CategoryBreakdownCard: React.FC<CategoryBreakdownCardProps> = ({
  breakdown,
  expenses,
  categories,
}) => {
  const [range, setRange] = useState<RangeKey>("this");

  const activeBreakdown = useMemo(() => {
    // Use server-supplied breakdown for "this" when we can't compute client-side.
    if (range === "this" && (!expenses || !categories)) return breakdown;
    if (!expenses || !categories) return breakdown;
    return computeBreakdown(expenses, categories, range);
  }, [range, expenses, categories, breakdown]);

  const total = activeBreakdown.reduce((sum, b) => sum + b.amount, 0);

  const emptyMessage = {
    this: "No expenses recorded for this month yet.",
    last: "No expenses recorded last month.",
    "3m": "No expenses recorded in the last 3 months.",
    all: "No expenses recorded yet.",
  }[range];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Category Breakdown
        </p>
        {total > 0 && (
          <span className="ml-auto text-sm font-semibold tabular-nums text-gray-900">
            {formatCurrency(total)}
          </span>
        )}
      </div>

      <div
        className="mb-4 inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5"
        role="tablist"
        aria-label="Category breakdown time range"
      >
        {RANGE_OPTIONS.map((opt) => {
          const isActive = opt.key === range;
          return (
            <button
              key={opt.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setRange(opt.key)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-white text-gray-900 ring-1 ring-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {activeBreakdown.length === 0 ? (
        <div className="py-10 text-center text-gray-500 text-sm">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
            {activeBreakdown.map((item) => {
              const colorClass =
                CATEGORY_SEGMENT_COLORS[item.categoryName] ??
                DEFAULT_SEGMENT_COLOR;
              const width = Math.max(item.percentage, 0.5);
              return (
                <div
                  key={item.category}
                  className={`${colorClass} h-full transition-all`}
                  style={{ width: `${width}%` }}
                  title={`${item.categoryName} — ${formatCurrency(item.amount)} (${item.percentage.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
            {activeBreakdown.map((item) => {
              const colorClass =
                CATEGORY_SEGMENT_COLORS[item.categoryName] ??
                DEFAULT_SEGMENT_COLOR;
              return (
                <li
                  key={item.category}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${colorClass}`}
                    aria-hidden
                  />
                  <span className="truncate text-gray-700">
                    {item.categoryName}
                  </span>
                  <span className="ml-auto text-gray-600 text-xs tabular-nums whitespace-nowrap">
                    {formatCurrency(item.amount)}{" "}
                    <span className="text-gray-400">
                      ({item.percentage.toFixed(1)}%)
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CategoryBreakdownCard;
