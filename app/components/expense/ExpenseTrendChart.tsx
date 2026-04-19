import React from "react";
import TrendChart from "../shared/TrendChart";
import { ExpenseMonthlyTrend } from "@/app/types/expense";

interface ExpenseTrendChartProps {
  monthlyTrend: ExpenseMonthlyTrend[];
}

const ExpenseTrendChart: React.FC<ExpenseTrendChartProps> = ({ monthlyTrend }) => {
  const data = monthlyTrend.map((m) => ({ name: m.month, value: m.total }));
  return <TrendChart title="Expense Trend" data={data} color="#F43F5E" />;
};

export default ExpenseTrendChart;
