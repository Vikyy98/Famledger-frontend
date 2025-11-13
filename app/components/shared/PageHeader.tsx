import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="flex items-center text-2xl font-semibold text-gray-800">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
