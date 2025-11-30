import React, { useState } from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";
import AddIncomeModal, { IncomeFormData } from "./AddIncomeModal";
import { Edit, Trash } from "lucide-react";

type IncomeTableProps = {
  incomeId: number;
  userId: number;
  memberName: string;
  familyId: number;
  source: number;
  category: number;
  type: number;
  sourceName: string;
  categoryName: string;
  typeName: string;
  amount: string;
};

interface IncomeTableState {
  incomeTableDetails: IncomeTableProps[];
}

const IncomeTable: React.FC<IncomeTableState> = ({ incomeTableDetails }) => {
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission from modal
  const handleSubmitIncome = (formData: IncomeFormData) => {
    // TODO: Integrate with your API to save the income
    // Example: You can use a mutation hook from your API service
    console.log("Income form data:", formData);
    
    // After successful submission, you might want to:
    // 1. Refetch the income data
    // 2. Update the local state
    // 3. Show a success message
    
    // Example API call (uncomment and adjust based on your API):
    // await addIncomeMutation(formData);
  };

  // Check if incomeTableDetails is empty or has no items
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
        <AddIncomeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitIncome}
        />
      </>
    );
  }

  return (
    <>
      <TableContainer
        title="Income Sources"
        action={<AddButton label="Add Income" onClick={handleOpenModal} />}
      >
      <table className="min-w-full text-sm table-auto">
        <thead className="border-b bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="py-3 px-4 font-medium w-1/5">Member</th>
            <th className="py-3 px-4 font-medium w-1/5">Source</th>
            <th className="py-3 px-4 font-medium w-1/5">Category</th>
            <th className="py-3 px-4 font-medium w-1/6 text-right">Amount</th>
            <th className="py-3 px-4 font-medium w-[80px] text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {incomeTableDetails.map((income) => {
            return (
              <tr key={income.incomeId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{income.memberName}</td>
                <td className="py-3 px-4">{income.sourceName}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col justify-center gap-1 text-[11px] ">
                    <span className="text-blue-600 border rounded-md text-center border-blue-600 w-2/5 ">
                      {income.categoryName}
                    </span>
                    <span className="border bg-blue-200 text-blue-800 rounded-md text-center w-1/3">
                      {income.typeName}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">{income.amount}</td>
                <td className="py-3 px-4 flex items-center justify-center space-x-3">
                  <Edit
                    width={18}
                    height={18}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  />
                  <Trash
                    width={18}
                    height={18}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </TableContainer>
      <AddIncomeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitIncome}
      />
    </>
  );
};

export default IncomeTable;
