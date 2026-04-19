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
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {title}
        </p>
        {action}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default TableContainer;
