import React from "react";
import { CategoryBreakdown } from "@/app/types/expense";
import { PieChart } from "lucide-react";

interface CategoryBreakdownCardProps {
  breakdown: CategoryBreakdown[];
}

// Tailwind classes for the stacked bar segments and legend dots.
// Keep the two maps in sync so the dot color matches the segment color.
const CATEGORY_SEGMENT_COLORS: Record<string, string> = {
  Food: "bg-orange-500",
  Housing: "bg-indigo-500",
  Transport: "bg-sky-500",
  Utilities: "bg-amber-500",
  Entertainment: "bg-pink-500",
  Medical: "bg-red-500",
  Education: "bg-emerald-500",
  Other: "bg-gray-500",
};

const DEFAULT_SEGMENT_COLOR = "bg-gray-400";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const CategoryBreakdownCard: React.FC<CategoryBreakdownCardProps> = ({
  breakdown,
}) => {
  const total = breakdown.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Category Breakdown
        </h3>
        <span className="text-xs text-gray-500">(this month)</span>
        {total > 0 && (
          <span className="ml-auto text-sm font-medium text-gray-700">
            {formatCurrency(total)}
          </span>
        )}
      </div>

      {breakdown.length === 0 ? (
        <div className="py-10 text-center text-gray-500 text-sm">
          No expenses recorded for this month yet.
        </div>
      ) : (
        <>
          {/* Stacked horizontal bar */}
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
            {breakdown.map((item) => {
              const colorClass =
                CATEGORY_SEGMENT_COLORS[item.categoryName] ??
                DEFAULT_SEGMENT_COLOR;
              // Clamp tiny segments so they remain visible.
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

          {/* Legend */}
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
            {breakdown.map((item) => {
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
                  <span className="ml-auto text-gray-500 text-xs whitespace-nowrap">
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
