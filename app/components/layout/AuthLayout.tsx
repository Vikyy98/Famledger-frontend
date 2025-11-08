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
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-b from-blue-50 to-white">
        {leftContent}
      </div>

      {/* Right Panel */}
      <div className="flex justify-center items-center py-10 px-6 lg:px-16 bg-white shadow-sm">
        <div className="w-full max-w-md">{rightContent}</div>
      </div>
    </div>
  );
};
