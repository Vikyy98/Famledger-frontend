"use client";

import React, { Suspense } from "react";
import MainLayout from "../components/layout/MainLayout";
import IncomeSummary from "../components/income/IncomeSummary";
import RecurringIncomeCard from "../components/income/RecurringIncomeCard";
import IncomeTrendChart from "../components/income/IncomeTrendChart";
import IncomeTable from "../components/income/IncomeTable";
import { useGetIncomeDetailsQuery } from "../services/api/incomeAPI";
import IncomeSummarySkeleton from "../components/income/IncomeSummarySkeleton";
import { AlertTriangle } from "lucide-react";
import RecurringIncomeCardSkeleton from "../components/income/RecurringIncomeCardSkeleton";
import IncomeTableSkeleton from "../components/income/IncomeTableSkeleton";

const IncomePage: React.FC = () => {
  const { data, isSuccess, isLoading, error, isError } =
    useGetIncomeDetailsQuery(1);

  if (isError) {
    return (
      <MainLayout>
        <div className="h-screen flex justify-center items-center bg-red-100 text-red-700">
          <AlertTriangle className="h-8 w-8 mr-2" />
          <p>Fatal Error: Could not load data.</p>
        </div>
      </MainLayout>
    );
  }

  const isDataReady = isSuccess && data;

  return (
    <MainLayout>
      <div className="h-full p-6 space-y-8 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<IncomeSummarySkeleton />}>
            {isDataReady ? (
              <IncomeSummary
                totalIncome={data.totalIncome}
                totalRecurringIncome={data.totalRecurringIncome}
                percentageDifference={data.percentageDifference}
              />
            ) : (
              <IncomeSummarySkeleton />
            )}
          </Suspense>
          <IncomeTrendChart />
        </div>

        <Suspense fallback={<RecurringIncomeCardSkeleton />}>
          {isDataReady ? (
            <RecurringIncomeCard
              totalRecurringIncomeAmount={data.totalRecurringIncome}
              recurringIncomeCount={data.recurringIncomeCount}
            />
          ) : (
            <RecurringIncomeCardSkeleton />
          )}
        </Suspense>

        <Suspense fallback={<IncomeTableSkeleton />}>
          {isDataReady ? (
            <IncomeTable incomeTableDetails={data.incomes} />
          ) : (
            <IncomeTableSkeleton />
          )}
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default IncomePage;
