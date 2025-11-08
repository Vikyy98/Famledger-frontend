import React from "react";
import { Loader2 } from "lucide-react"; // optional icon for loading

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  variant: "primary" | "secondary" | "outline";
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  isLoading = false,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} px-4 py-2 ${className}`}
    >
      {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
      {children}
    </button>
  );
};

export default Button;
