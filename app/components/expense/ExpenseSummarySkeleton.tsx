import React from "react";

const ExpenseSummarySkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border bg-gray-50 p-6 shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-400 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 mt-2"></div>
        </div>
        <div className="rounded-full bg-gray-300 p-5"></div>
      </div>
      <div className="mt-5 border-t pt-4 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default ExpenseSummarySkeleton;
