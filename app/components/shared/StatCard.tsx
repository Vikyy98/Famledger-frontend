import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

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
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="space-y-2">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        {change && (
          <div
            className={`flex items-center text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            {change}
          </div>
        )}
      </div>
      <div className="rounded-full bg-green-100 p-3 text-green-700">{icon}</div>
    </div>
  );
};

export default StatCard;
