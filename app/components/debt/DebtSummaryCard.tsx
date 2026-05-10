import React from "react";
import { CreditCard } from "lucide-react";

interface DebtSummaryCardProps {
  totalDebts: number;
  totalMonthlyEmi: number;
  activeDebtCount: number;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const DebtSummaryCard: React.FC<DebtSummaryCardProps> = ({
  totalDebts,
  totalMonthlyEmi,
  activeDebtCount,
}) => {
  return (
    <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Debts
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-rose-600">
            {formatCurrency(totalDebts)}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Monthly EMI:{" "}
            <span className="font-medium text-gray-900 tabular-nums">
              {formatCurrency(totalMonthlyEmi)}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="font-medium text-gray-900">{activeDebtCount}</span>{" "}
            active debt{activeDebtCount === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
          <CreditCard className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default DebtSummaryCard;
