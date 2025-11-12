import React from "react";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: React.ReactNode;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
};

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  error,
  icon,
  actionIcon,
}) => {
  // Determine if the right side needs padding for an icon
  const paddingRightClass = actionIcon ? "pr-10" : "pr-3";

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full rounded-lg border py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${icon ? "pl-10" : "pl-3"} 
            ${paddingRightClass} 
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
        {actionIcon && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {actionIcon}
          </span>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
