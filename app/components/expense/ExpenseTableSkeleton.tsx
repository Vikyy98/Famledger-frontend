import React from "react";
import TableContainer from "../shared/TableContainer";

const NUM_SKELETON_ROWS = 4;
const ExpenseTableSkeleton = () => {
  const skeletonRows = Array.from({ length: NUM_SKELETON_ROWS });

  return (
    <TableContainer title="Expenses">
      <table className="min-w-full text-sm">
        <thead className="border-b bg-gray-50 text-left text-gray-600">
          <tr>
            <th className="py-3 px-4 font-medium">Member</th>
            <th className="py-3 px-4 font-medium">Description</th>
            <th className="py-3 px-4 font-medium">Category</th>
            <th className="py-3 px-4 font-medium">Amount</th>
            <th className="py-3 px-4 font-medium">Date</th>
            <th className="py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 animate-pulse">
          {skeletonRows.map((_, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
              <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
              <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-2/3"></div></td>
              <td className="py-3 px-4"><div className="h-4 bg-gray-300 rounded w-1/4"></div></td>
              <td className="py-3 px-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
              <td className="py-3 px-4"><div className="h-4 bg-blue-200 rounded w-1/6"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

export default ExpenseTableSkeleton;
