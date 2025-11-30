import React from "react";

type SelectOption = {
  value: string;
  label: string;
};

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: React.ReactNode;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  helperText?: React.ReactNode;
  disabled?: boolean;
  // Additional input props
  max?: string;
  min?: string;
  // Select specific props
  select?: boolean;
  options?: SelectOption[];
  selectPlaceholder?: string;
  isLoading?: boolean;
  showDropdownArrow?: boolean;
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
  loadingIcon,
  helperText,
  disabled = false,
  max,
  min,
  select = false,
  options = [],
  selectPlaceholder = "Select an option",
  isLoading = false,
  showDropdownArrow = true,
}) => {
  // Determine if the right side needs padding for an icon
  const needsRightPadding = actionIcon || (select && showDropdownArrow);
  const paddingRightClass = needsRightPadding ? "pr-10" : "pr-3";

  const baseInputClasses = `
    w-full rounded-lg border py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
    ${icon ? "pl-10" : "pl-3"} 
    ${paddingRightClass} 
    ${error ? "border-red-500" : "border-gray-300"}
    ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
  `;

  const iconWrapperClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none";
  const iconZIndex = select ? "z-10" : "";

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className={`${iconWrapperClasses} ${iconZIndex}`}>
            {icon}
          </span>
        )}
        {select ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled || isLoading}
            className={`
              ${baseInputClasses}
              appearance-none bg-white
              ${disabled || isLoading ? "cursor-not-allowed" : "cursor-pointer"}
            `}
            style={{
              backgroundImage: isLoading || !showDropdownArrow ? "none" : `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
              paddingRight: isLoading && loadingIcon ? "2.5rem" : showDropdownArrow ? "2.5rem" : "0.75rem",
            }}
          >
            <option value="">{selectPlaceholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            max={max}
            min={min}
            className={baseInputClasses}
            style={type === "date" ? { colorScheme: "light" } : undefined}
          />
        )}
        {actionIcon && !isLoading && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {actionIcon}
          </span>
        )}
        {isLoading && loadingIcon && select && (
          <span className="absolute right-10 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {loadingIcon}
          </span>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
      {helperText && !error && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
    </div>
  );
};
