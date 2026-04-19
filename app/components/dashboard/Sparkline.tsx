"use client";

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export type SparklineTone = "income" | "expense" | "savings" | "neutral";

interface SparklineProps {
  data: number[];
  tone?: SparklineTone;
  height?: number;
}

const toneToColor: Record<SparklineTone, string> = {
  income: "#059669",
  expense: "#E11D48",
  savings: "#0F172A",
  neutral: "#94A3B8",
};

const Sparkline: React.FC<SparklineProps> = ({
  data,
  tone = "neutral",
  height = 40,
}) => {
  if (!data || data.length < 2) {
    return <div style={{ height }} className="w-full" aria-hidden />;
  }

  const color = toneToColor[tone];
  const gradientId = `spark-${tone}`;
  const series = data.map((v, i) => ({ i, v }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={series}
          margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.75}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sparkline;
