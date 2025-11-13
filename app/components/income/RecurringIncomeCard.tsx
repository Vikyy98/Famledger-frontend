import React from "react";
import { DollarSign } from "lucide-react";

const RecurringIncomeCard: React.FC = () => {
  return (
    <div className="mt-6 rounded-2xl border bg-green-50 p-6 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Monthly Recurring Income
        </h3>
        <p className="mt-2 text-2xl font-bold text-green-700">₹6,150</p>
        <p className="text-sm text-gray-600">
          Guaranteed income from 3 sources
        </p>
      </div>

      <div className="rounded-full bg-green-100 p-4">
        <DollarSign className="h-8 w-8 text-green-600" />
      </div>
    </div>
  );
};

export default RecurringIncomeCard;
