// components/income/IncomeSummarySkeleton.tsx

import React from "react";

const IncomeSummarySkeleton: React.FC = () => {
  return (
    // This div mimics the layout and size of the final IncomeSummary component
    <div className="rounded-2xl border bg-gray-50 p-6 shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between">
        <div>
          {/* Total Income Label */}
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          {/* Total Income Value */}
          <div className="h-8 bg-gray-400 rounded w-1/2"></div>
          {/* Comparison Line */}
          <div className="h-3 bg-gray-300 rounded w-1/4 mt-2"></div>
        </div>
        <div className="rounded-full bg-gray-300 p-5"></div>
      </div>

      {/* Insights Skeleton */}
      <div className="mt-5 border-t pt-4 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default IncomeSummarySkeleton;
