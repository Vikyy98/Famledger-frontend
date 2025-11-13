import React from "react";
import TrendChart from "../shared/TrendChart";

const IncomeTrendChart: React.FC = () => {
  const data = [
    { name: "Jan", value: 7400 },
    { name: "Feb", value: 7600 },
    { name: "Mar", value: 7500 },
    { name: "Apr", value: 7800 },
    { name: "May", value: 7850 },
  ];

  return <TrendChart title="Income Trend" data={data} color="#16a34a" />;
};

export default IncomeTrendChart;
