"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TrendChartProps {
  data: { name: string; value: number }[];
  color?: string;
  title?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  color = "#22c55e",
  title,
}) => {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
