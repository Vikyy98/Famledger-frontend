import React from "react";

type AuthLayoutProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};

function AuthLayout({ leftContent, rightContent }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f8fbfd]">
      {/* Left Panel */}
      <div className="flex items-center justify-center py-10 p-6 lg:px-16">
        {leftContent}
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center  py-10 px-6 lg:px-16 ">
        <div className="w-full max-w-md">{rightContent}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
