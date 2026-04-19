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

const formatShortINR = (value: number) => {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(0)}k`;
  return `₹${value}`;
};

const formatFullINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  color = "#6366F1",
  title,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {title && (
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-500">
          {title}
        </p>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatShortINR}
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => {
              const n = typeof value === "number" ? value : Number(value);
              return Number.isFinite(n) ? formatFullINR(n) : "—";
            }}
            cursor={{ stroke: "#E2E8F0", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
              fontSize: 12,
              fontVariantNumeric: "tabular-nums",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
