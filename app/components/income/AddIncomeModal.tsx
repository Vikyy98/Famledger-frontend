import React, { useState } from "react";
import { X, Calendar, Briefcase, Tag, Loader2 } from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { useGetIncomeCategoriesQuery } from "../../services/api/incomeAPI";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IncomeFormData) => void;
}

export interface IncomeFormData {
  source: string;
  category: string; // This will store categoryId as string
  amount: string;
  date: string;
}

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<IncomeFormData>({
    source: "",
    category: "",
    amount: "",
    date: "",
  });

  const [errors, setErrors] = useState<Partial<IncomeFormData>>({});

  // Fetch income categories from API
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useGetIncomeCategoriesQuery();

  // Extract categories from API response
  const categories = categoriesData?.categories || [];

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof IncomeFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<IncomeFormData> = {};

    if (!formData.source.trim()) {
      newErrors.source = "Source is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        source: "",
        category: "",
        amount: "",
        date: "",
      });
      setErrors({});
      onClose();
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      source: "",
      category: "",
      amount: "",
      date: "",
    });
    setErrors({});
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Income
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Record a new income entry for your family.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Source Input */}
          <Input
            label="Source"
            name="source"
            type="text"
            placeholder="e.g., Salary, Freelance"
            value={formData.source}
            onChange={handleChange}
            icon={<Briefcase className="w-4 h-4" />}
            error={errors.source}
          />

          {/* Category Dropdown */}
          <div>
            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              error={errors.category}
              select
              options={categories.map((cat) => ({
                value: cat.categoryId.toString(),
                label: cat.categoryName,
              }))}
              selectPlaceholder={
                isLoadingCategories
                  ? "Loading categories..."
                  : isCategoriesError
                  ? "Failed to load categories"
                  : "Select category"
              }
              disabled={isLoadingCategories || isCategoriesError}
              isLoading={isLoadingCategories}
              loadingIcon={<Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
            />
            {isCategoriesError && !errors.category && (
              <span className="text-xs text-yellow-600 mt-1 block">
                Unable to load categories. Please try again later.
              </span>
            )}
          </div>

          {/* Amount Input */}
          <Input
            label="Amount"
            name="amount"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            icon={<span className="text-lg font-medium">₹</span>}
            error={errors.amount}
          />

          {/* Date Input */}
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            icon={<Calendar className="w-4 h-4" />}
            error={errors.date}
            helperText={!formData.date ? "Select a date (DD/MM/YYYY format)" : undefined}
            max={new Date().toISOString().split("T")[0]}
          />

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="px-6">
              Save Income
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;

