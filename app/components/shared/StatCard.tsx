import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
}) => {
  const toneText = isPositive ? "text-emerald-600" : "text-rose-600";
  const toneDot = isPositive ? "bg-emerald-500" : "bg-rose-500";

  return (
    <div className="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-200 hover:border-gray-300">
      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {title}
        </p>
        <h3 className="text-3xl font-semibold tracking-tight text-gray-900 tabular-nums truncate">
          {value}
        </h3>
        {change && (
          <div className={`flex items-center gap-1.5 text-xs font-medium ${toneText}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${toneDot}`} aria-hidden />
            <span className="tabular-nums">{change}</span>
          </div>
        )}
      </div>
      {icon && (
        <div className="rounded-full bg-gray-50 ring-1 ring-gray-100 p-2.5 text-gray-600 shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;
