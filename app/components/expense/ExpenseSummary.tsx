import React from "react";
import InfoTooltip from "../shared/InfoTooltip";
import { TrendingDown } from "lucide-react";

type ExpenseSummaryProps = {
  totalExpense: string;
  percentageDifference: string;
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  totalExpense,
  percentageDifference,
}) => {
  const parsedChange = parseFloat(percentageDifference);
  // For expenses, a decrease is good (emerald); an increase is bad (rose).
  const isGood = !Number.isNaN(parsedChange) && parsedChange <= 0;
  const changeText = Number.isNaN(parsedChange)
    ? "—"
    : `${parsedChange > 0 ? "+" : ""}${parsedChange.toFixed(2)}% from last month`;

  const toneText = isGood ? "text-emerald-600" : "text-rose-600";
  const toneDot = isGood ? "bg-emerald-500" : "bg-rose-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            This Month&apos;s Expenses
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-rose-600 tabular-nums truncate">
            {totalExpense || "₹0"}
          </p>
          {!Number.isNaN(parsedChange) && (
            <div className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${toneText}`}>
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${toneDot}`} aria-hidden />
              <span className="tabular-nums">{changeText}</span>
            </div>
          )}
        </div>
        <div
          className="rounded-full bg-rose-50 ring-1 ring-rose-100 p-2.5 text-rose-600 shrink-0"
          aria-hidden
        >
          <TrendingDown className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            AI Insights
          </span>
          <InfoTooltip text="Coming soon — automatic summary based on your last 3 months of spending." />
        </div>
        <div className="rounded-lg bg-gray-50 border border-dashed border-gray-200 p-3 text-sm text-gray-600 italic">
          Smart insights about your spending patterns will appear here soon.
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
