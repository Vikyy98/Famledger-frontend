import React from "react";
import { Plus } from "lucide-react";

interface AddButtonProps {
  label?: string;
  onClick?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ 
  label = "Add",
  onClick 
}) => {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
};

export default AddButton;
