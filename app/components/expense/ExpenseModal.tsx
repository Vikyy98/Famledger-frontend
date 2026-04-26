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
  category: string;
  amount: string;
  expenseDate: string;
  expenseType: "ONETIME" | "RECURRING";
  recurringFrequency: "MONTHLY" | "";
}

type ExpenseFormErrors = Partial<Record<keyof ExpenseFormData, string>>;

const emptyForm: ExpenseFormData = {
  description: "",
  category: "",
  amount: "",
  expenseDate: "",
  expenseType: "ONETIME",
  recurringFrequency: "",
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
    expenseType: data?.type === 1 ? "RECURRING" : "ONETIME",
    recurringFrequency:
      (data?.frequency ?? "").trim().toUpperCase() === "MONTHLY" ? "MONTHLY" : "",
  });

  // Local YYYY-MM-DD; toISOString() would shift to UTC and reject today east of UTC.
  const todayStr = React.useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

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
    } else if (formData.expenseDate > todayStr) {
      newErrors.expenseDate = "Date cannot be later than today";
    }

    if (mode === "add" && formData.expenseType === "RECURRING" && !formData.recurringFrequency) {
      newErrors.recurringFrequency = "Frequency is required for recurring expense";
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

  const dateLabel = formData.expenseType === "RECURRING" ? "Start date" : "Expense Date";

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
                ? "Record a one-time or recurring expense for your family."
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
            placeholder="e.g., Grocery run, Home loan EMI"
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

          {mode === "add" ? (
            <>
              <Input
                label="Expense Type"
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                icon={<Tag className="w-4 h-4" />}
                error={errors.expenseType}
                select
                options={[
                  { value: "ONETIME", label: "One Time" },
                  { value: "RECURRING", label: "Recurring (e.g. EMI, SIP, rent)" },
                ]}
              />

              {formData.expenseType === "RECURRING" && (
                <Input
                  label="Recurring Frequency"
                  name="recurringFrequency"
                  value={formData.recurringFrequency}
                  onChange={handleChange}
                  icon={<Loader2 className="w-4 h-4" />}
                  error={errors.recurringFrequency}
                  select
                  options={[{ value: "MONTHLY", label: "Monthly" }]}
                  selectPlaceholder="Select a frequency"
                />
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Expense Type</span>
                <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                  {formData.expenseType === "RECURRING" ? "Recurring" : "One Time"}
                </span>
                <span className="text-xs text-gray-500">Type cannot be changed when editing.</span>
              </div>
              {formData.expenseType === "RECURRING" && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-gray-700">Frequency</span>
                  <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                    {formData.recurringFrequency
                      ? formData.recurringFrequency.charAt(0) +
                        formData.recurringFrequency.slice(1).toLowerCase()
                      : (initialData?.frequency ?? "—")}
                  </span>
                  <span className="text-xs text-gray-500">Frequency cannot be changed when editing.</span>
                </div>
              )}
            </div>
          )}

          <Input
            label={dateLabel}
            name="expenseDate"
            type="date"
            value={formData.expenseDate}
            onChange={handleChange}
            icon={<Calendar className="w-4 h-4" />}
            error={errors.expenseDate}
            helperText={
              !formData.expenseDate
                ? "Select a date (DD/MM/YYYY format)"
                : formData.expenseType === "RECURRING"
                ? "The first month this expense applies from"
                : undefined
            }
            max={todayStr}
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
