import React from "react";
import MainLayout from "../components/layout/MainLayout";
import IncomeSummary from "../components/income/IncomeSummary";
import RecurringIncomeCard from "../components/income/RecurringIncomeCard";
import IncomeTrendChart from "../components/income/IncomeTrendChart";
import IncomeTable from "../components/income/IncomeTable";

const IncomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="h-full p-6 space-y-8 bg-gray-50 min-h-screen">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeSummary />
          <IncomeTrendChart />
        </div>

        {/* Recurring Income Section */}
        <RecurringIncomeCard />

        {/* Income Table Section */}
        <IncomeTable />
      </div>
    </MainLayout>
  );
};

export default IncomePage;
