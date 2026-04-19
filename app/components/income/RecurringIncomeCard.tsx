import React from "react";
import { Repeat } from "lucide-react";

type RecurringIncomeCardProps = {
  totalRecurringIncomeAmount: string;
  recurringIncomeCount: number;
};

const RecurringIncomeCard: React.FC<RecurringIncomeCardProps> = ({
  totalRecurringIncomeAmount,
  recurringIncomeCount,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center justify-between">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Monthly Recurring Income
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-600 tabular-nums">
          {totalRecurringIncomeAmount || "₹0"}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Guaranteed income from {recurringIncomeCount} source
          {recurringIncomeCount === 1 ? "" : "s"}
        </p>
      </div>

      <div
        className="rounded-full bg-emerald-50 ring-1 ring-emerald-100 p-3 text-emerald-600 shrink-0"
        aria-hidden
      >
        <Repeat className="h-6 w-6" />
      </div>
    </div>
  );
};

export default RecurringIncomeCard;
