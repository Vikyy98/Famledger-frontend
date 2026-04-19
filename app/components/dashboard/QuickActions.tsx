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
      accent: "text-emerald-600",
      onClick: onAddIncome,
    },
    {
      name: "Add Expense",
      Icon: Minus,
      accent: "text-rose-600",
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
          className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-colors duration-200 hover:border-gray-300 hover:bg-gray-50"
        >
          <div
            className={`rounded-full bg-gray-50 ring-1 ring-gray-100 p-2 ${action.accent}`}
          >
            <action.Icon className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium text-gray-800">{action.name}</p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
