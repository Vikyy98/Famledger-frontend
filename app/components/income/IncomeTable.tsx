import React, { useState } from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";
import AddIncomeModal, { IncomeFormData } from "./AddIncomeModal";
import { Edit, Trash } from "lucide-react";
import { AddIncomeRequest, IncomeDetails } from "@/app/types/income";
import { useAddIncomeMutation } from "@/app/services/api/incomeAPI";
import incomeApi from "@/app/services/api/incomeAPI";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useAuth";

interface IncomeTableState {
  incomeTableDetails: IncomeDetails[];
}

const IncomeTable: React.FC<IncomeTableState> = ({ incomeTableDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [addIncomeMutation, { isLoading: isAddingIncome }] = useAddIncomeMutation();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitIncome = async (formData: IncomeFormData) => {
    console.log("Submitting income with form data:", formData);
    const incomeRequest: AddIncomeRequest = {
      source: formData.source,
      amount: parseFloat(formData.amount),
      userId: user?.id,
      familyId: user?.familyId,
      type: 1,
      frequency: "",
      dateReceived: formData.date,
    };
    console.log("Income request:", incomeRequest);

    try {
      // Post to API
      const created: IncomeDetails = await addIncomeMutation(incomeRequest).unwrap();

      // Update RTK Query cache for `getIncomeDetails` so the table shows the new income immediately
      if (created && created.familyId) {
        dispatch(
          incomeApi.util.updateQueryData(
            "getIncomeDetails",
            created.familyId,
            (draft) => {
              if (!draft.incomes) draft.incomes = [];
              draft.incomes.push(created);
              draft.totalIncome = (draft.totalIncome || 0) + created.amount;
            }
          )
        );
      }
    } catch (err) {
      console.error("Failed to add income:", err);
    }
  };

  if (!incomeTableDetails || incomeTableDetails.length === 0) {
    return (
      <>
        <TableContainer
          title="Income Sources"
          action={<AddButton label="Add Income" onClick={handleOpenModal} />}
        >
          <div className="py-12 text-center text-gray-500">
            <p className="text-lg">No items found</p>
            <p className="text-sm mt-2">Add your first income source to get started</p>
          </div>
        </TableContainer>
        <AddIncomeModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitIncome} />
      </>
    );
  }

  return (
    <>
      <TableContainer title="Income Sources" action={<AddButton label="Add Income" onClick={handleOpenModal} />}>
        <table className="min-w-full text-sm table-auto">
          <thead className="border-b bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="py-3 px-4 font-medium w-1/5">Member</th>
              <th className="py-3 px-4 font-medium w-1/5">Source</th>
              <th className="py-3 px-4 font-medium w-1/5">Income Type</th>
              <th className="py-3 px-4 font-medium w-1/6 text-right">Amount</th>
              <th className="py-3 px-4 font-medium w-[80px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {incomeTableDetails.map((income) => (
              <tr key={`${income.type}-${income.Id}`} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">{income.source}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col justify-center gap-1 text-[11px] ">
                    <span className="border bg-blue-200 text-blue-800 rounded-md text-center w-1/3">{income.type}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">{income.amount}</td>
                <td className="py-3 px-4 flex items-center justify-center space-x-3">
                  <Edit width={18} height={18} className="cursor-pointer text-blue-600 hover:text-blue-800" />
                  <Trash width={18} height={18} className="cursor-pointer text-red-600 hover:text-red-800" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <AddIncomeModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitIncome} />
    </>
  );
};

export default IncomeTable;
