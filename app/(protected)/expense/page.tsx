"use client";

import React, { Suspense, useMemo } from "react";
import MainLayout from "@/app/components/layout/MainLayout";
import ExpenseSummary from "@/app/components/expense/ExpenseSummary";
import ExpenseTrendChart from "@/app/components/expense/ExpenseTrendChart";
import ExpenseTable from "@/app/components/expense/ExpenseTable";
import CategoryBreakdownCard from "@/app/components/expense/CategoryBreakdownCard";
import ExpenseSummarySkeleton from "@/app/components/expense/ExpenseSummarySkeleton";
import ExpenseTableSkeleton from "@/app/components/expense/ExpenseTableSkeleton";
import {
  useGetExpenseDetailsQuery,
  useGetExpenseCategoriesQuery,
} from "@/app/services/api/expenseAPI";
import { useGetFamilyMembersQuery } from "@/app/services/api/familyAPI";
import { useAppSelector } from "@/app/hooks/useAuth";
import { AlertTriangle } from "lucide-react";

const ExpensePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const familyId = user?.familyId;

  const { data: members = [] } = useGetFamilyMembersQuery(familyId ?? 0, {
    skip: !familyId,
  });
  const memberNamesByUserId = useMemo(() => {
    const map: Record<number, string> = {};
    for (const m of members) map[m.id] = m.fullName;
    return map;
  }, [members]);

  const { data, isSuccess, error, isError } = useGetExpenseDetailsQuery(
    familyId ?? 0,
    { skip: !familyId }
  );

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetExpenseCategoriesQuery();

  if (isError) {
    return (
      <MainLayout>
        <div className="h-screen flex justify-center items-center bg-red-100 text-red-700">
          <AlertTriangle className="h-8 w-8 mr-2" />
          <p>Fatal Error: Could not load expenses. {JSON.stringify(error)}</p>
        </div>
      </MainLayout>
    );
  }

  const isDataReady = isSuccess && data;

  return (
    <MainLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<ExpenseSummarySkeleton />}>
            {isDataReady ? (
              <ExpenseSummary
                totalExpense={data.totalExpense ?? "₹0"}
                percentageDifference={data.percentageDifference ?? "0"}
              />
            ) : (
              <ExpenseSummarySkeleton />
            )}
          </Suspense>

          {isDataReady ? (
            <ExpenseTrendChart monthlyTrend={data.monthlyTrend ?? []} />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse">
              <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-[250px] w-full bg-gray-100 rounded"></div>
            </div>
          )}
        </div>

        {isDataReady ? (
          <CategoryBreakdownCard
            breakdown={data.categoryBreakdown ?? []}
            expenses={data.expenses ?? []}
            categories={categories}
          />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
            <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded w-full" />
              ))}
            </div>
          </div>
        )}

        <Suspense fallback={<ExpenseTableSkeleton />}>
          {isDataReady ? (
            <ExpenseTable
              expenses={data.expenses ?? []}
              memberNamesByUserId={memberNamesByUserId}
              categories={categories}
              categoriesLoading={categoriesLoading}
            />
          ) : (
            <ExpenseTableSkeleton />
          )}
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default ExpensePage;
