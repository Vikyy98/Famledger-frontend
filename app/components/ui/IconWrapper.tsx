import React from "react";

type IconWrapperProps = {
  children: React.ReactNode;
  bgColor?: string;
  size?: "sm" | "md" | "lg";
};

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  bgColor = "bg-blue-100",
  size = "md",
}) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${bgColor} ${sizes[size]} flex items-center justify-center rounded-lg text-blue-600`}
    >
      {children}
    </div>
  );
};
