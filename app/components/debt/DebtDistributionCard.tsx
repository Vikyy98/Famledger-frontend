import React from "react";
import { DebtCategoryBreakdown } from "@/app/types/debt";

interface DebtDistributionCardProps {
  breakdown: DebtCategoryBreakdown[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Mortgage: "bg-indigo-500",
  "Auto Loan": "bg-emerald-500",
  "Credit Card": "bg-rose-500",
  Education: "bg-amber-500",
  Personal: "bg-sky-500",
  Other: "bg-gray-400",
};

const DEFAULT_COLOR = "bg-gray-300";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const DebtDistributionCard: React.FC<DebtDistributionCardProps> = ({
  breakdown,
}) => {
  const total = breakdown.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Debt Distribution
        </p>
        {total > 0 && (
          <span className="ml-auto text-sm font-semibold tabular-nums text-gray-900">
            {formatCurrency(total)}
          </span>
        )}
      </div>

      {breakdown.length === 0 ? (
        <div className="py-10 text-center text-gray-500 text-sm">
          No active debts recorded yet.
        </div>
      ) : (
        <>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
            {breakdown.map((item) => {
              const colorClass =
                CATEGORY_COLORS[item.categoryName] ?? DEFAULT_COLOR;
              const width = Math.max(item.percentage, 0.5);
              return (
                <div
                  key={item.category}
                  className={`${colorClass} h-full transition-all`}
                  style={{ width: `${width}%` }}
                  title={`${item.categoryName} — ${formatCurrency(
                    item.amount
                  )} (${item.percentage.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            {breakdown.map((item) => {
              const colorClass =
                CATEGORY_COLORS[item.categoryName] ?? DEFAULT_COLOR;
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

export default DebtDistributionCard;
