import React from "react";
import { TrendingUp } from "lucide-react";
import InfoTooltip from "../shared/InfoTooltip";

const IncomeSummary: React.FC = () => {
  return (
    <div className="rounded-2xl border bg-green-50 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total Income</h3>
          <p className="mt-2 text-3xl font-bold text-green-700">₹8,150</p>
          <p className="mt-1 text-sm text-green-600">+12.5% from last month</p>
        </div>
        <div className="rounded-full bg-green-100 p-3">
          <TrendingUp className="h-6 w-6 text-green-700" />
        </div>
      </div>

      {/* Insights */}
      <div className="mt-5 border-t pt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-green-700">AI Insights:</span>
          <InfoTooltip text="Automatically generated summary based on last 3 months trend." />
        </div>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>
            Recurring income (₹6,150) covers 75% of total – excellent stability
            for your family budget.
          </li>
          <li>
            Side business shows +22.3% growth – consider scaling this income
            stream for maximum impact.
          </li>
          <li>
            Diversified across 5 categories – reduces risk and provides multiple
            growth opportunities.
          </li>
          <li>
            3-month upward trend detected. Projected income for June: ₹8,400
            based on current growth rate.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IncomeSummary;
