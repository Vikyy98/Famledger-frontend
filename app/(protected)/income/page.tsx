"use client";

import React, { Suspense, useMemo } from "react";
import MainLayout from "@/app/components/layout/MainLayout";
import IncomeSummary from "@/app/components/income/IncomeSummary";
import RecurringIncomeCard from "@/app/components/income/RecurringIncomeCard";
import IncomeTrendChart from "@/app/components/income/IncomeTrendChart";
import IncomeTable from "@/app/components/income/IncomeTable";
import { useGetIncomeDetailsQuery } from "@/app/services/api/incomeAPI";
import { useGetFamilyMembersQuery } from "@/app/services/api/familyAPI";
import IncomeSummarySkeleton from "@/app/components/income/IncomeSummarySkeleton";
import { AlertTriangle } from "lucide-react";
import RecurringIncomeCardSkeleton from "@/app/components/income/RecurringIncomeCardSkeleton";
import IncomeTableSkeleton from "@/app/components/income/IncomeTableSkeleton";
import { useAppSelector } from "@/app/hooks/useAuth";

const IncomePage: React.FC = () => {

  const user = useAppSelector((state) => state.auth.user);
  const familyId = user?.familyId;
  const { data: members = [] } = useGetFamilyMembersQuery(familyId ?? 0, {
    skip: !familyId,
  });
  const memberNamesByUserId = useMemo(() => {
    const map: Record<number, string> = {};
    for (const m of members) {
      map[m.id] = m.fullName;
    }
    return map;
  }, [members]);

  const { data, isSuccess, isError } = useGetIncomeDetailsQuery(
    user?.familyId ?? 0,
    { skip: !user?.familyId }
  );

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
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<IncomeSummarySkeleton />}>
            {isDataReady ? (
              <IncomeSummary
                totalIncome={data.totalIncome}
                percentageDifference={data.percentageDifference}
              />
            ) : (
              <IncomeSummarySkeleton />
            )}
          </Suspense>
          {isDataReady ? (
            <IncomeTrendChart monthlyTrend={data.monthlyTrend ?? []} />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
              <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-[250px] w-full bg-gray-100 rounded"></div>
            </div>
          )}
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
            <IncomeTable
              incomeTableDetails={data.incomes}
              memberNamesByUserId={memberNamesByUserId}
            />
          ) : (
            <IncomeTableSkeleton />
          )}
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default IncomePage;
