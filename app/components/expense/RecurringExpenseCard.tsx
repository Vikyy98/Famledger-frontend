import React from "react";
import { Repeat } from "lucide-react";

type RecurringExpenseCardProps = {
  totalRecurringExpenseAmount: string;
  recurringExpenseCount: number;
};

const RecurringExpenseCard: React.FC<RecurringExpenseCardProps> = ({
  totalRecurringExpenseAmount,
  recurringExpenseCount,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center justify-between">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Monthly Recurring Expense
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-rose-600 tabular-nums">
          {totalRecurringExpenseAmount || "₹0"}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Committed spend across {recurringExpenseCount} item
          {recurringExpenseCount === 1 ? "" : "s"}
        </p>
      </div>

      <div
        className="rounded-full bg-rose-50 ring-1 ring-rose-100 p-3 text-rose-600 shrink-0"
        aria-hidden
      >
        <Repeat className="h-6 w-6" />
      </div>
    </div>
  );
};

export default RecurringExpenseCard;
