import React from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";

const IncomeTable: React.FC = () => {
  return (
    <TableContainer
      title="Income Sources"
      action={<AddButton label="Add Income" />}
    >
      <table className="min-w-full text-sm">
        <thead className="border-b bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="py-3 px-4 font-medium">Source</th>
            <th className="py-3 px-4 font-medium">Category</th>
            <th className="py-3 px-4 font-medium">Amount</th>
            <th className="py-3 px-4 font-medium">Growth</th>
            <th className="py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">Salary</td>
            <td className="py-3 px-4">Job</td>
            <td className="py-3 px-4">₹5,000</td>
            <td className="py-3 px-4 text-green-600 font-medium">+5%</td>
            <td className="py-3 px-4 text-blue-600 cursor-pointer">Edit</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">Freelancing</td>
            <td className="py-3 px-4">Side Business</td>
            <td className="py-3 px-4">₹2,500</td>
            <td className="py-3 px-4 text-green-600 font-medium">+10%</td>
            <td className="py-3 px-4 text-blue-600 cursor-pointer">Edit</td>
          </tr>
        </tbody>
      </table>
    </TableContainer>
  );
};

export default IncomeTable;
