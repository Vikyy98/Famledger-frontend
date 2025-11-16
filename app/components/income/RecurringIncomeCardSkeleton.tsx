import React from "react";

const RecurringIncomeCardSkeleton = () => {
  return (
    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3 w-3/4">
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/5"></div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-green-200/50"></div>
        </div>
      </div>
    </div>
  );
};

export default RecurringIncomeCardSkeleton;
