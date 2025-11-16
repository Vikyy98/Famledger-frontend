import React from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";
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
  return (
    <TableContainer
      title="Income Sources"
      action={<AddButton label="Add Income" />}
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
  );
};

export default IncomeTable;
