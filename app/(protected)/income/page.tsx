"use client";

import React, { Suspense } from "react";
import MainLayout from "@/app/components/layout/MainLayout";
import IncomeSummary from "@/app/components/income/IncomeSummary";
import RecurringIncomeCard from "@/app/components/income/RecurringIncomeCard";
import IncomeTrendChart from "@/app/components/income/IncomeTrendChart";
import IncomeTable from "@/app/components/income/IncomeTable";
import { useGetIncomeDetailsQuery } from "@/app/services/api/incomeAPI";
import IncomeSummarySkeleton from "@/app/components/income/IncomeSummarySkeleton";
import { AlertTriangle } from "lucide-react";
import RecurringIncomeCardSkeleton from "@/app/components/income/RecurringIncomeCardSkeleton";
import IncomeTableSkeleton from "@/app/components/income/IncomeTableSkeleton";
import { useAppSelector } from "@/app/hooks/useAuth";

const IncomePage: React.FC = () => {

  const user = useAppSelector((state) => state.auth.user);
  const { data, isSuccess, isLoading, error, isError } =
    useGetIncomeDetailsQuery(user?.familyId ?? 0);

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
