"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuickActionsProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddIncome,
  onAddExpense,
}) => {
  const actions = [
    {
      name: "Add Income",
      Icon: Plus,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      hoverRing: "hover:ring-emerald-200",
      onClick: onAddIncome,
    },
    {
      name: "Add Expense",
      Icon: Minus,
      color: "text-red-600",
      bgColor: "bg-red-50",
      hoverRing: "hover:ring-red-200",
      onClick: onAddExpense,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.name}
          type="button"
          onClick={action.onClick}
          className={`flex flex-col items-center justify-center gap-2 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ring-1 ring-transparent ${action.hoverRing}`}
        >
          <div
            className={`rounded-full p-3 ${action.bgColor} ${action.color}`}
          >
            <action.Icon className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-gray-700">{action.name}</p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
