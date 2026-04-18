import React from "react";
import { X, Calendar, FileText, Tag, Loader2 } from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { ExpenseDetails, ExpenseCategoryOption } from "@/app/types/expense";

interface ExpenseModalProps {
  mode: "add" | "edit";
  initialData?: ExpenseDetails;
  isOpen: boolean;
  categories: ExpenseCategoryOption[];
  categoriesLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseFormData) => void | Promise<void>;
}

export interface ExpenseFormData {
  id?: number;
  description: string;
  category: string; // string while in form, parsed to int on submit
  amount: string;
  expenseDate: string;
}

type ExpenseFormErrors = Partial<Record<keyof ExpenseFormData, string>>;

const emptyForm: ExpenseFormData = {
  description: "",
  category: "",
  amount: "",
  expenseDate: "",
};

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  mode,
  initialData,
  isOpen,
  categories,
  categoriesLoading = false,
  onClose,
  onSubmit,
}) => {
  const toFormData = (data?: ExpenseDetails): ExpenseFormData => ({
    id: data?.id,
    description: data?.description ?? "",
    category: data?.category ? String(data.category) : "",
    amount: data?.amount?.toString() ?? "",
    expenseDate: data?.expenseDate ?? "",
  });

  const [formData, setFormData] = React.useState<ExpenseFormData>(toFormData(initialData));
  const [errors, setErrors] = React.useState<ExpenseFormErrors>({});

  React.useEffect(() => {
    if (!isOpen) return;
    setFormData(toFormData(initialData));
    setErrors({});
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ExpenseFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ExpenseFormErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 200) {
      newErrors.description = "Description must be 200 characters or fewer";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (
      isNaN(parseFloat(formData.amount)) ||
      parseFloat(formData.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.expenseDate.trim()) {
      newErrors.expenseDate = "Date is required";
    } else {
      const selected = new Date(formData.expenseDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected > today) {
        newErrors.expenseDate = "Date cannot be later than today";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await onSubmit(formData);
      setFormData(emptyForm);
      setErrors({});
      onClose();
    } catch {
      // keep modal open on submit failure
    }
  };

  const handleClose = () => {
    setFormData(emptyForm);
    setErrors({});
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-900/75 px-4 py-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="mx-auto my-6 w-full max-w-md rounded-lg bg-white shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === "add" ? "Add New Expense" : "Edit Expense"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === "add"
                ? "Record a new expense for your family."
                : "Edit this expense entry for your family."}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Description"
            name="description"
            type="text"
            placeholder="e.g., Grocery run, Electricity bill"
            value={formData.description}
            onChange={handleChange}
            icon={<FileText className="w-4 h-4" />}
            error={errors.description}
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            icon={<Tag className="w-4 h-4" />}
            error={errors.category}
            select
            isLoading={categoriesLoading}
            loadingIcon={<Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
            options={categories.map((c) => ({
              value: String(c.value),
              label: c.name,
            }))}
            selectPlaceholder="Select a category"
          />

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

          <Input
            label="Expense Date"
            name="expenseDate"
            type="date"
            value={formData.expenseDate}
            onChange={handleChange}
            icon={<Calendar className="w-4 h-4" />}
            error={errors.expenseDate}
            helperText={
              !formData.expenseDate ? "Select a date (DD/MM/YYYY format)" : undefined
            }
            max={new Date().toISOString().split("T")[0]}
          />

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
              {mode === "add" ? "Add Expense" : "Save Expense"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
