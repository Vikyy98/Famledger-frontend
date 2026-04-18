import React from "react";
import TrendChart from "../shared/TrendChart";
import { IncomeMonthlyTrend } from "@/app/types/income";

interface IncomeTrendChartProps {
  monthlyTrend: IncomeMonthlyTrend[];
}

const IncomeTrendChart: React.FC<IncomeTrendChartProps> = ({ monthlyTrend }) => {
  const data = monthlyTrend.map((m) => ({ name: m.month, value: m.total }));
  return <TrendChart title="Income Trend" data={data} color="#16a34a" />;
};

export default IncomeTrendChart;
