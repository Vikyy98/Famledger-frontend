import React from "react";

type AuthLayoutProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f9fafb]">
      {/* Left Panel */}
      <div className="flex items-center justify-end px-16 bg-gradient-to-b from-blue-50 to-white">
        {leftContent}
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-start  py-10 px-6 lg:px-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-full max-w-md">{rightContent}</div>
      </div>
    </div>
  );
};
