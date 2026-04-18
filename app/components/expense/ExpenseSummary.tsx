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
  const isDown = !Number.isNaN(parsedChange) && parsedChange < 0;
  const changeText = Number.isNaN(parsedChange)
    ? "—"
    : `${parsedChange > 0 ? "+" : ""}${parsedChange.toFixed(2)}% from last month`;

  return (
    <div className="rounded-2xl border bg-red-50 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">This Month&apos;s Expenses</h3>
          <p className="mt-2 text-3xl font-bold text-red-700">
            {totalExpense || "₹0"}
          </p>
          <p
            className={`mt-1 text-sm ${
              isDown ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeText}
          </p>
        </div>
        <div className="rounded-full bg-red-100 p-3">
          <TrendingDown className="h-6 w-6 text-red-700" />
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-red-700">AI Insights:</span>
          <InfoTooltip text="Coming soon — automatic summary based on your last 3 months of spending." />
        </div>
        <div className="rounded-md bg-white/60 border border-dashed border-red-200 p-3 text-sm text-gray-600 italic">
          Smart insights about your spending patterns will appear here soon.
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
