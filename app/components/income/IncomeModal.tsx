import React, { useState } from "react";
import { X, Calendar, Briefcase, Tag, Loader2 } from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { IncomeDetails } from "@/app/types/income";

interface IncomeModalProps {
  mode: "add" | "edit";
  initialData?: IncomeDetails;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IncomeFormData) => void | Promise<void>;
}

export interface IncomeFormData {
  id?: number;
  source: string;
  amount: string;
  date: string;
  incomeType: "ONETIME" | "RECURRING";
  recurringFrequency: "MONTHLY" | "QUARTERLY" | "YEARLY" | "";
}

type IncomeFormErrors = Partial<Record<keyof IncomeFormData, string>>;

const IncomeModal: React.FC<IncomeModalProps> = ({
  mode,
  initialData,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const toFormData = (data?: IncomeDetails): IncomeFormData => ({
    id: data?.id,
    source: data?.source || "",
    amount: data?.amount?.toString() || "",
    date: data?.dateReceived || "",
    incomeType: data?.type === 1 ? "RECURRING" : "ONETIME",
    recurringFrequency: data?.frequency === "MONTHLY" || data?.frequency === "QUARTERLY" || data?.frequency === "YEARLY"
      ? data.frequency
      : "",
  });

  const [formData, setFormData] = useState<IncomeFormData>({
    ...toFormData(initialData),
  });

  const [errors, setErrors] = useState<IncomeFormErrors>({});

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
    const newErrors: IncomeFormErrors = {};

    if (!formData.source.trim()) {
      newErrors.source = "Source is required";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        newErrors.date = "Date cannot be later than today";
      }
    }

    if (mode === "add" && formData.incomeType === "RECURRING" && !formData.recurringFrequency) {
      newErrors.recurringFrequency = "Frequency is required for recurring income";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  React.useEffect(() => {
    if (!isOpen) return;
    setFormData(toFormData(initialData));
    setErrors({});
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await onSubmit(formData);
        setFormData({
          source: "",
          amount: "",
          date: "",
          incomeType: "ONETIME",
          recurringFrequency: "",
        });
        setErrors({});
        onClose();
      } catch {
        // keep modal open on submit failure
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      source: "",
      amount: "",
      date: "",
      incomeType: "ONETIME",
      recurringFrequency: "",
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
      className="fixed top-0 right-0 bottom-0 left-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-900/75 px-4 py-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="mx-auto my-6 w-full max-w-md rounded-lg bg-white shadow-xl transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === "add" ? "Add New Income" : "Edit Income"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === "add" ? "Record a new income entry for your family." : "Edit the income entry for your family."}
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

          {mode === "add" ? (
            <>
              <Input
                label="Income Type"
                name="incomeType"
                value={formData.incomeType}
                onChange={handleChange}
                icon={<Tag className="w-4 h-4" />}
                error={errors.incomeType}
                select
                options={[
                  { value: "ONETIME", label: "One Time" },
                  { value: "RECURRING", label: "Recurring" },
                ]}
              />

              {formData.incomeType === "RECURRING" && (
                <Input
                  label="Recurring Frequency"
                  name="recurringFrequency"
                  value={formData.recurringFrequency}
                  onChange={handleChange}
                  icon={<Loader2 className="w-4 h-4" />}
                  error={errors.recurringFrequency}
                  select
                  options={[
                    { value: "MONTHLY", label: "Monthly" },
                    { value: "QUARTERLY", label: "Quarterly" },
                    { value: "YEARLY", label: "Yearly" },
                  ]}
                />
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Income Type</span>
                <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                  {formData.incomeType === "RECURRING" ? "Recurring" : "One Time"}
                </span>
                <span className="text-xs text-gray-500">Type cannot be changed when editing.</span>
              </div>
              {formData.incomeType === "RECURRING" && (
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

          {/* Date Input */}
          <Input
            label="Date received"
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
              {mode === "add" ? "Add Income" : "Save Income"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeModal;

