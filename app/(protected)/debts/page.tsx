"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import MainLayout from "@/app/components/layout/MainLayout";
import AddButton from "@/app/components/shared/AddButton";
import ConfirmModal from "@/app/components/shared/ConfirmModal";
import DebtModal, {
  DebtFormData,
} from "@/app/components/debt/DebtModal";
import DebtSummaryCard from "@/app/components/debt/DebtSummaryCard";
import DebtDistributionCard from "@/app/components/debt/DebtDistributionCard";
import UpcomingEmiBanner from "@/app/components/debt/UpcomingEmiBanner";
import DebtTable from "@/app/components/debt/DebtTable";
import {
  useGetDebtDetailsQuery,
  useGetDebtCategoriesQuery,
  useAddDebtMutation,
  useUpdateDebtMutation,
  useDeleteDebtMutation,
} from "@/app/services/api/debtsAPI";
import { useAppSelector } from "@/app/hooks/useAuth";
import {
  AddDebtRequest,
  DebtItem,
  UpdateDebtRequest,
} from "@/app/types/debt";

const toRequestPayload = (data: DebtFormData): AddDebtRequest => ({
  debtName: data.debtName.trim(),
  category: parseInt(data.category, 10),
  lenderName: data.lenderName.trim() ? data.lenderName.trim() : undefined,
  principalAmount: parseFloat(data.principalAmount),
  remainingAmount: parseFloat(data.remainingAmount),
  interestRate: parseFloat(data.interestRate),
  monthlyEmi: parseFloat(data.monthlyEmi),
  emiDayOfMonth: parseInt(data.emiDayOfMonth, 10),
  startDate: data.startDate,
  endDate: data.endDate ? data.endDate : null,
  notes: data.notes.trim() ? data.notes.trim() : undefined,
  trackEmiAsExpense: data.trackEmiAsExpense,
});

const DebtsPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const familyId = user?.familyId;

  const { data, isSuccess, isError, error } = useGetDebtDetailsQuery(
    familyId ?? 0,
    { skip: !familyId }
  );
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetDebtCategoriesQuery();

  const [addDebt] = useAddDebtMutation();
  const [updateDebt] = useUpdateDebtMutation();
  const [deleteDebt, { isLoading: deleteInFlight }] = useDeleteDebtMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DebtItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DebtItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDebts = useMemo(() => {
    const debts = data?.debts ?? [];
    const q = searchTerm.trim().toLowerCase();
    if (!q) return debts;
    return debts.filter(
      (d) =>
        d.debtName.toLowerCase().includes(q) ||
        (d.lenderName ?? "").toLowerCase().includes(q) ||
        d.categoryName.toLowerCase().includes(q)
    );
  }, [data?.debts, searchTerm]);

  const handleAddSubmit = async (form: DebtFormData) => {
    await addDebt(toRequestPayload(form)).unwrap();
  };

  const handleEditSubmit = async (form: DebtFormData) => {
    if (!editTarget || !familyId) return;
    const payload: UpdateDebtRequest = {
      ...toRequestPayload(form),
      id: editTarget.id,
      familyId,
    };
    await updateDebt(payload).unwrap();
    setEditTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget || !familyId) return;
    await deleteDebt({ id: deleteTarget.id, familyId }).unwrap();
    setDeleteTarget(null);
  };

  if (isError) {
    return (
      <MainLayout>
        <div className="h-screen flex justify-center items-center bg-red-100 text-red-700">
          <AlertTriangle className="h-8 w-8 mr-2" />
          <p>We couldn&apos;t load your debts right now. Please refresh and try again.</p>
        </div>
      </MainLayout>
    );
  }

  const isDataReady = isSuccess && data;

  return (
    <MainLayout>
      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {isDataReady ? (
            <DebtSummaryCard
              totalDebts={data.totalDebts ?? 0}
              totalMonthlyEmi={data.totalMonthlyEmi ?? 0}
              activeDebtCount={data.activeDebtCount ?? 0}
            />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="h-3 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-40 bg-gray-200 rounded mb-3" />
              <div className="h-3 w-56 bg-gray-100 rounded" />
            </div>
          )}

          {isDataReady ? (
            <DebtDistributionCard
              breakdown={data.categoryBreakdown ?? []}
            />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="h-3 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-3 w-full bg-gray-100 rounded mb-3" />
              <div className="h-3 w-3/4 bg-gray-100 rounded" />
            </div>
          )}
        </div>

        {isDataReady && (data.upcomingEmis?.length ?? 0) > 0 && (
          <UpcomingEmiBanner upcoming={data.upcomingEmis ?? []} />
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search debts..."
              className="flex-1 min-w-[200px] rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <AddButton label="Add Debt" onClick={() => setIsAddOpen(true)} />
          </div>

          {isDataReady ? (
            <DebtTable
              debts={filteredDebts}
              onEdit={(debt) => setEditTarget(debt)}
              onDelete={(debt) => setDeleteTarget(debt)}
            />
          ) : (
            <div className="space-y-3 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded" />
              ))}
            </div>
          )}
        </div>
      </div>

      <DebtModal
        mode="add"
        isOpen={isAddOpen}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSubmit}
      />

      <DebtModal
        mode="edit"
        isOpen={editTarget !== null}
        initialData={editTarget ?? undefined}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onClose={() => setEditTarget(null)}
        onSubmit={handleEditSubmit}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Delete this debt?"
        message={
          deleteTarget ? (
            <>
              <p>
                <span className="font-medium text-gray-900">
                  {deleteTarget.debtName}
                </span>{" "}
                will be removed from your debt tracker.
              </p>
              {deleteTarget.isEmiTrackedAsExpense && (
                <p className="mt-2 text-xs text-rose-700 bg-rose-50 ring-1 ring-rose-100 rounded px-2 py-1.5">
                  The linked monthly EMI recurring expense will also be removed
                  so it stops appearing in your Expenses ledger.
                </p>
              )}
            </>
          ) : null
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmTone="danger"
        isLoading={deleteInFlight}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </MainLayout>
  );
};

export default DebtsPage;
