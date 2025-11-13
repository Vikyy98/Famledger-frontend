import React from "react";

interface TableContainerProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const TableContainer: React.FC<TableContainerProps> = ({
  title,
  children,
  action,
}) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {action}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default TableContainer;
