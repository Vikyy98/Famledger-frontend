import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import TableContainer from "@/app/components/shared/TableContainer";
import { DebtItem } from "@/app/types/debt";

interface DebtTableProps {
  debts: DebtItem[];
  onEdit: (debt: DebtItem) => void;
  onDelete: (debt: DebtItem) => void;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const CATEGORY_PILL: Record<string, string> = {
  Mortgage: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  "Auto Loan": "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "Credit Card": "bg-rose-50 text-rose-700 ring-rose-100",
  Education: "bg-amber-50 text-amber-700 ring-amber-100",
  Personal: "bg-sky-50 text-sky-700 ring-sky-100",
  Other: "bg-gray-50 text-gray-700 ring-gray-200",
};

const STATUS_PILL: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "Paid off": "bg-gray-50 text-gray-700 ring-gray-200",
  Archived: "bg-gray-50 text-gray-500 ring-gray-200",
};

const DebtTable: React.FC<DebtTableProps> = ({
  debts,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer title="Debt Records">
      {debts.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No debts yet. Tap “Add Debt” to track your first one.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-gray-500">
            <tr className="border-b border-gray-200">
              <th className="py-2 pr-3 font-medium">Debt</th>
              <th className="py-2 px-3 font-medium">Type</th>
              <th className="py-2 px-3 font-medium text-right">Principal</th>
              <th className="py-2 px-3 font-medium text-right">Remaining</th>
              <th className="py-2 px-3 font-medium text-right">Rate</th>
              <th className="py-2 px-3 font-medium text-right">Monthly EMI</th>
              <th className="py-2 px-3 font-medium">Progress</th>
              <th className="py-2 pl-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {debts.map((debt) => {
              const pillClass =
                CATEGORY_PILL[debt.categoryName] ?? CATEGORY_PILL.Other;
              const statusClass =
                STATUS_PILL[debt.statusName] ?? STATUS_PILL.Active;
              return (
                <tr
                  key={debt.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-3 pr-3">
                    <div className="font-medium text-gray-900">
                      {debt.debtName}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      {debt.lenderName && (
                        <span className="text-xs text-gray-500">
                          {debt.lenderName}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ${statusClass}`}
                      >
                        {debt.statusName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${pillClass}`}
                    >
                      {debt.categoryName}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-gray-700">
                    {formatCurrency(debt.principalAmount)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-medium text-rose-600">
                    {formatCurrency(debt.remainingAmount)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-gray-700">
                    {debt.interestRate.toFixed(2)}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-gray-700">
                    {formatCurrency(debt.monthlyEmi)}
                  </td>
                  <td className="py-3 px-3 min-w-[140px]">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-indigo-500"
                        style={{
                          width: `${Math.min(Math.max(debt.progressPercent, 0), 100)}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 tabular-nums">
                      {debt.progressPercent.toFixed(0)}% paid
                    </p>
                  </td>
                  <td className="py-3 pl-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(debt)}
                        className="rounded-md p-1.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-700"
                        aria-label={`Edit ${debt.debtName}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(debt)}
                        className="rounded-md p-1.5 text-gray-500 hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`Delete ${debt.debtName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </TableContainer>
  );
};

export default DebtTable;
