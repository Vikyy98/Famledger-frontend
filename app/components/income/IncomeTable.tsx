import React, { useState } from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";
import IncomeModal, { IncomeFormData } from "./IncomeModal";
import { Edit, Trash } from "lucide-react";
import { AddIncomeRequest, IncomeDetails, UpdateIncomeRequest } from "@/app/types/income";
import { useAddIncomeMutation, useUpdateIncomeMutation } from "@/app/services/api/incomeAPI";
import incomeApi from "@/app/services/api/incomeAPI";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useAuth";

interface IncomeTableState {
  incomeTableDetails: IncomeDetails[];
}

const IncomeTable: React.FC<IncomeTableState> = ({ incomeTableDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedIncome, setSelectedIncome] = useState<IncomeDetails | undefined>(undefined);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [addIncomeMutation] = useAddIncomeMutation();
  const [updateIncomeMutation] = useUpdateIncomeMutation();
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

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const getMemberDisplayName = (incomeUserId: number) => {
    if (user?.id === incomeUserId) {
      return user.name || "You";
    }
    return `Member ${incomeUserId}`;
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
      </>
    );
  }

  return (
    <>
      <TableContainer title="Income Sources" action={<AddButton label="Add Income" onClick={handleOpenAddModal} />}>
        <table className="min-w-full text-sm table-auto">
          <thead className="border-b bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="py-3 px-4 font-medium">Member</th>
              <th className="py-3 px-4 font-medium">Source</th>
              <th className="py-3 px-4 font-medium">Income Type</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Date Received</th>
              <th className="py-3 px-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {incomeTableDetails.map((income) => (
              <tr key={income.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{getMemberDisplayName(income.userId)}</td>
                <td className="py-2 px-4">{income.source}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="inline-block rounded-md border bg-blue-100 px-2 py-1 text-[11px] text-blue-800 w-fit">
                      {getIncomeTypeLabel(income.type)}
                    </span>
                    {getFrequencyLabel(income.frequency) && (
                      <span className="text-[11px] text-gray-500 px-2">{getFrequencyLabel(income.frequency)}</span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4">{formatCurrency(income.amount)}</td>
                <td className="py-2 px-4">{formatIndianDate(income.dateReceived)}</td>
                <td className="py-2 px-4 flex items-center justify-center space-x-3">
                  <Edit onClick={() => handleOpenEditModal(income)} width={18} height={18} className="cursor-pointer text-blue-600 hover:text-blue-800" />
                  <Trash width={18} height={18} className="cursor-pointer text-red-600 hover:text-red-800" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <IncomeModal mode={modalMode} initialData={selectedIncome} isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitIncome} />
    </>
  );
};

export default IncomeTable;
