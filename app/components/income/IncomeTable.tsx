import React, { useState } from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";
import ConfirmModal from "../shared/ConfirmModal";
import IncomeModal, { IncomeFormData } from "./IncomeModal";
import { Edit, Repeat, Trash } from "lucide-react";
import { AddIncomeRequest, IncomeDetails, UpdateIncomeRequest } from "@/app/types/income";
import {
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useUpdateIncomeMutation,
} from "@/app/services/api/incomeAPI";
import incomeApi from "@/app/services/api/incomeAPI";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useAuth";
import {
  INCOME_DELETE_CONFIRM_MESSAGE,
  INCOME_DELETE_CONFIRM_TITLE,
} from "./deleteIncomeMessages";

interface IncomeTableState {
  incomeTableDetails: IncomeDetails[];
  /** Resolved from GET /families/{id}/members so rows show real names, not "Member 3". */
  memberNamesByUserId?: Record<number, string>;
}

const IncomeTable: React.FC<IncomeTableState> = ({
  incomeTableDetails,
  memberNamesByUserId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedIncome, setSelectedIncome] = useState<IncomeDetails | undefined>(undefined);
  const [pendingDeleteIncome, setPendingDeleteIncome] = useState<IncomeDetails | null>(null);
  const [isDeletingIncome, setIsDeletingIncome] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [addIncomeMutation] = useAddIncomeMutation();
  const [updateIncomeMutation] = useUpdateIncomeMutation();
  const [deleteIncomeMutation] = useDeleteIncomeMutation();
  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedIncome(undefined);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (income: IncomeDetails) => {
    setModalMode("edit");
    setSelectedIncome(income);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIncome(undefined);
  };

  const formatIndianDate = (value?: string) => {
    if (!value) return "-";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString("en-IN");
  };

  const getIncomeTypeLabel = (type: number) => {
    if (type === 1) return "Recurring";
    if (type === 2) return "One Time";
    return "Unknown";
  };

  const getFrequencyLabel = (frequency?: string) => {
    if (!frequency) return "";
    const normalized = frequency.trim().toUpperCase();
    if (normalized === "ONETIME") return "";
    return normalized.charAt(0) + normalized.slice(1).toLowerCase();
  };

  const renderRecurringBadge = (income: IncomeDetails) => {
    if (income.type !== 1) return null;
    const label = getFrequencyLabel(income.frequency) || "Monthly";
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-white ring-1 ring-emerald-200 px-2 py-0.5 text-[11px] font-medium text-emerald-700 w-fit">
        <Repeat className="h-3 w-3" />
        {label}
      </span>
    );
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const getMemberDisplayName = (incomeUserId: number) => {
    if (user?.id === incomeUserId) {
      return user.name || memberNamesByUserId?.[incomeUserId] || "You";
    }
    const resolved = memberNamesByUserId?.[incomeUserId];
    if (resolved) return resolved;
    return `Member ${incomeUserId}`;
  };

  const canDeleteIncome = (income: IncomeDetails) => {
    if (!user) return false;
    if (user.role?.toLowerCase() === "admin") return true;
    return income.userId === user.id;
  };

  const openDeleteConfirm = (income: IncomeDetails) => {
    if (!canDeleteIncome(income)) return;
    setPendingDeleteIncome(income);
  };

  const handleConfirmDeleteIncome = async () => {
    const income = pendingDeleteIncome;
    if (!income) return;
    setIsDeletingIncome(true);
    try {
      await deleteIncomeMutation({
        id: income.id,
        familyId: income.familyId,
        routeType: income.type,
      }).unwrap();
      dispatch(
        incomeApi.util.updateQueryData("getIncomeDetails", income.familyId, (draft) => {
          if (!draft.incomes) return;
          draft.incomes = draft.incomes.filter(
            (x) => !(x.id === income.id && x.type === income.type)
          );
        })
      );
      setPendingDeleteIncome(null);
    } catch (err) {
      console.error("Failed to delete income:", err);
    } finally {
      setIsDeletingIncome(false);
    }
  };

  const handleSubmitIncome = async (formData: IncomeFormData) => {
    console.log("Submitting income with form data:", formData);
    try {
      if (modalMode === "edit" && selectedIncome) {
        const incomeRequest: AddIncomeRequest = {
          source: formData.source,
          amount: parseFloat(formData.amount),
          userId: user?.id,
          familyId: user?.familyId,
          type: selectedIncome.type,
          frequency:
            selectedIncome.type === 1
              ? (selectedIncome.frequency?.trim().toUpperCase() || "MONTHLY")
              : "ONETIME",
          dateReceived: formData.date,
        };
        const updateRequest: UpdateIncomeRequest = {
          ...incomeRequest,
          id: selectedIncome.id,
          routeType: selectedIncome.type,
          familyId: selectedIncome.familyId,
        };
        const updated: IncomeDetails = await updateIncomeMutation(updateRequest).unwrap();
        dispatch(
          incomeApi.util.updateQueryData(
            "getIncomeDetails",
            selectedIncome.familyId,
            (draft) => {
              if (!draft.incomes) return;
              const idx = draft.incomes.findIndex(
                (x) => x.id === selectedIncome.id && x.type === selectedIncome.type
              );
              if (idx >= 0) {
                draft.incomes[idx] = updated;
              }
            }
          )
        );
        return;
      }

      const incomeRequest: AddIncomeRequest = {
        source: formData.source,
        amount: parseFloat(formData.amount),
        userId: user?.id,
        familyId: user?.familyId,
        type: formData.incomeType === "RECURRING" ? 1 : 2,
        frequency: formData.incomeType === "RECURRING" ? formData.recurringFrequency : "ONETIME",
        dateReceived: formData.date,
      };
      const created: IncomeDetails = await addIncomeMutation(incomeRequest).unwrap();
      if (created && created.familyId) {
        dispatch(
          incomeApi.util.updateQueryData("getIncomeDetails", created.familyId, (draft) => {
            if (!draft.incomes) draft.incomes = [];
            draft.incomes.unshift(created);
          })
        );
      }
    } catch (err) {
      console.error("Failed to add income:", err);
      throw err;
    }
  };

  if (!incomeTableDetails || incomeTableDetails.length === 0) {
    return (
      <>
        <TableContainer
          title="Income Sources"
          action={<AddButton label="Add Income" onClick={handleOpenAddModal} />}
        >
          <div className="py-12 text-center text-gray-500">
            <p className="text-lg">No items found</p>
            <p className="text-sm mt-2">Add your first income source to get started</p>
          </div>
        </TableContainer>
        <IncomeModal mode={modalMode} initialData={selectedIncome} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitIncome} />
        <ConfirmModal
          isOpen={pendingDeleteIncome !== null}
          title={INCOME_DELETE_CONFIRM_TITLE}
          message={INCOME_DELETE_CONFIRM_MESSAGE}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmTone="danger"
          isLoading={isDeletingIncome}
          onClose={() => setPendingDeleteIncome(null)}
          onConfirm={handleConfirmDeleteIncome}
        />
      </>
    );
  }

  return (
    <>
      <TableContainer title="Income Sources" action={<AddButton label="Add Income" onClick={handleOpenAddModal} />}>
        {/* Desktop: traditional table */}
        <table className="hidden min-w-full table-auto text-sm md:table">
          <thead className="border-b border-gray-200 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500">
            <tr>
              <th className="py-3 px-4">Member</th>
              <th className="py-3 px-4">Source</th>
              <th className="py-3 px-4">Income Type</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date Received</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {incomeTableDetails.map((income) => (
              <tr key={`${income.id}-${income.type}`} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3 px-4">{getMemberDisplayName(income.userId)}</td>
                <td className="py-3 px-4">{income.source}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center rounded-md bg-white ring-1 ring-emerald-200 px-2 py-0.5 text-[11px] font-medium text-emerald-700 w-fit">
                      {getIncomeTypeLabel(income.type)}
                    </span>
                    {renderRecurringBadge(income)}
                  </div>
                </td>
                <td className="py-3 px-4 tabular-nums font-medium text-gray-900">
                  {formatCurrency(income.amount)}
                </td>
                <td className="py-3 px-4 tabular-nums text-gray-600">
                  {formatIndianDate(income.dateReceived)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-3">
                    <Edit
                      onClick={() => handleOpenEditModal(income)}
                      width={16}
                      height={16}
                      className="cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                    />
                    <Trash
                      width={16}
                      height={16}
                      onClick={() => openDeleteConfirm(income)}
                      className={
                        canDeleteIncome(income)
                          ? "cursor-pointer text-rose-500 hover:text-rose-700 transition-colors"
                          : "cursor-not-allowed text-gray-300"
                      }
                      aria-disabled={!canDeleteIncome(income)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: card list */}
        <ul className="flex flex-col gap-3 md:hidden">
          {incomeTableDetails.map((income) => (
            <li
              key={`${income.id}-${income.type}-card`}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {income.source}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {getMemberDisplayName(income.userId)}
                  </p>
                </div>
                <p className="shrink-0 text-right text-base font-semibold tabular-nums text-emerald-600">
                  {formatCurrency(income.amount)}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-white ring-1 ring-emerald-200 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  {getIncomeTypeLabel(income.type)}
                </span>
                {renderRecurringBadge(income)}
                <span className="ml-auto text-xs tabular-nums text-gray-500">
                  {formatIndianDate(income.dateReceived)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(income)}
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => openDeleteConfirm(income)}
                  disabled={!canDeleteIncome(income)}
                  className={
                    canDeleteIncome(income)
                      ? "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      : "inline-flex cursor-not-allowed items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-300"
                  }
                >
                  <Trash className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </TableContainer>

      <IncomeModal mode={modalMode} initialData={selectedIncome} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitIncome} />

      <ConfirmModal
        isOpen={pendingDeleteIncome !== null}
        title={INCOME_DELETE_CONFIRM_TITLE}
        message={INCOME_DELETE_CONFIRM_MESSAGE}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmTone="danger"
        isLoading={isDeletingIncome}
        onClose={() => setPendingDeleteIncome(null)}
        onConfirm={handleConfirmDeleteIncome}
      />
    </>
  );
};

export default IncomeTable;
