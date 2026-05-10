import React from "react";
import {
  Calendar,
  CreditCard,
  FileText,
  Loader2,
  Percent,
  Tag,
  X,
} from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import {
  DebtCategoryOption,
  DebtItem,
} from "@/app/types/debt";

interface DebtModalProps {
  mode: "add" | "edit";
  initialData?: DebtItem;
  isOpen: boolean;
  categories: DebtCategoryOption[];
  categoriesLoading?: boolean;
  onClose: () => void;
  onSubmit: (data: DebtFormData) => void | Promise<void>;
}

export interface DebtFormData {
  id?: number;
  debtName: string;
  category: string;
  lenderName: string;
  principalAmount: string;
  remainingAmount: string;
  interestRate: string;
  monthlyEmi: string;
  emiDayOfMonth: string;
  startDate: string;
  endDate: string;
  notes: string;
  trackEmiAsExpense: boolean;
}

type DebtFormErrors = Partial<Record<keyof DebtFormData, string>>;

const emptyForm: DebtFormData = {
  debtName: "",
  category: "",
  lenderName: "",
  principalAmount: "",
  remainingAmount: "",
  interestRate: "",
  monthlyEmi: "",
  emiDayOfMonth: "5",
  startDate: "",
  endDate: "",
  notes: "",
  trackEmiAsExpense: true,
};

const toFormData = (data?: DebtItem): DebtFormData => {
  if (!data) return emptyForm;
  return {
    id: data.id,
    debtName: data.debtName,
    category: String(data.category),
    lenderName: data.lenderName ?? "",
    principalAmount: data.principalAmount.toString(),
    remainingAmount: data.remainingAmount.toString(),
    interestRate: data.interestRate.toString(),
    monthlyEmi: data.monthlyEmi.toString(),
    emiDayOfMonth: String(data.emiDayOfMonth),
    startDate: data.startDate,
    endDate: data.endDate ?? "",
    notes: data.notes ?? "",
    trackEmiAsExpense: data.isEmiTrackedAsExpense,
  };
};

const DebtModal: React.FC<DebtModalProps> = ({
  mode,
  initialData,
  isOpen,
  categories,
  categoriesLoading = false,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<DebtFormData>(
    toFormData(initialData)
  );
  const [errors, setErrors] = React.useState<DebtFormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    setFormData(toFormData(initialData));
    setErrors({});
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof DebtFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: DebtFormErrors = {};

    if (!formData.debtName.trim()) next.debtName = "Debt name is required";
    else if (formData.debtName.length > 120)
      next.debtName = "Debt name must be 120 characters or fewer";

    if (!formData.category) next.category = "Category is required";

    if (formData.lenderName.length > 200)
      next.lenderName = "Lender name must be 200 characters or fewer";

    if (formData.notes.length > 1000)
      next.notes = "Notes must be 1000 characters or fewer";

    const principal = parseFloat(formData.principalAmount);
    if (!formData.principalAmount.trim() || isNaN(principal) || principal <= 0)
      next.principalAmount = "Enter a valid principal amount";

    const remaining = parseFloat(formData.remainingAmount);
    if (
      !formData.remainingAmount.trim() ||
      isNaN(remaining) ||
      remaining < 0
    ) {
      next.remainingAmount = "Enter a valid remaining amount";
    } else if (!isNaN(principal) && remaining > principal) {
      next.remainingAmount = "Remaining cannot exceed the principal";
    }

    const rate = parseFloat(formData.interestRate);
    if (
      !formData.interestRate.trim() ||
      isNaN(rate) ||
      rate < 0 ||
      rate > 100
    )
      next.interestRate = "Enter a rate between 0 and 100";

    const emi = parseFloat(formData.monthlyEmi);
    if (!formData.monthlyEmi.trim() || isNaN(emi) || emi < 0)
      next.monthlyEmi = "Enter a valid monthly EMI";
    else if (formData.trackEmiAsExpense && emi <= 0)
      next.monthlyEmi =
        "Monthly EMI must be greater than 0 to track it as an expense";

    const day = parseInt(formData.emiDayOfMonth, 10);
    if (isNaN(day) || day < 1 || day > 28)
      next.emiDayOfMonth = "Pick a day between 1 and 28";

    if (!formData.startDate.trim()) next.startDate = "Start date is required";

    if (formData.endDate && formData.endDate < formData.startDate) {
      next.endDate = "End date cannot be before start date";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch {
      // keep modal open on submit failure
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
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
      <div className="mx-auto my-6 w-full max-w-2xl rounded-lg bg-white shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === "add" ? "Add New Debt" : "Edit Debt"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === "add"
                ? "Track a loan, mortgage, credit card, or any other family debt."
                : "Update the details of this debt."}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Debt Name"
              name="debtName"
              type="text"
              placeholder="e.g., Home Mortgage"
              value={formData.debtName}
              onChange={handleChange}
              icon={<FileText className="w-4 h-4" />}
              error={errors.debtName}
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
              loadingIcon={
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              }
              options={categories.map((c) => ({
                value: String(c.value),
                label: c.name,
              }))}
              selectPlaceholder="Select a category"
            />
          </div>

          <Input
            label="Lender (optional)"
            name="lenderName"
            type="text"
            placeholder="e.g., HDFC Bank"
            value={formData.lenderName}
            onChange={handleChange}
            icon={<CreditCard className="w-4 h-4" />}
            error={errors.lenderName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Principal Amount"
              name="principalAmount"
              type="number"
              placeholder="0.00"
              value={formData.principalAmount}
              onChange={handleChange}
              icon={<span className="text-lg font-medium">₹</span>}
              error={errors.principalAmount}
              helperText="Original debt amount"
            />
            <Input
              label="Remaining Amount"
              name="remainingAmount"
              type="number"
              placeholder="0.00"
              value={formData.remainingAmount}
              onChange={handleChange}
              icon={<span className="text-lg font-medium">₹</span>}
              error={errors.remainingAmount}
              helperText="What's still owed today"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Interest Rate"
              name="interestRate"
              type="number"
              placeholder="0.0"
              value={formData.interestRate}
              onChange={handleChange}
              icon={<Percent className="w-4 h-4" />}
              error={errors.interestRate}
            />
            <Input
              label="Monthly EMI"
              name="monthlyEmi"
              type="number"
              placeholder="0.00"
              value={formData.monthlyEmi}
              onChange={handleChange}
              icon={<span className="text-lg font-medium">₹</span>}
              error={errors.monthlyEmi}
            />
            <Input
              label="EMI Day"
              name="emiDayOfMonth"
              type="number"
              min="1"
              max="28"
              placeholder="5"
              value={formData.emiDayOfMonth}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
              error={errors.emiDayOfMonth}
              helperText="Day of month (1–28)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
              error={errors.startDate}
            />
            <Input
              label="End Date (optional)"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
              error={errors.endDate}
              helperText="Expected payoff date"
            />
          </div>

          <Input
            label="Notes (optional)"
            name="notes"
            type="text"
            placeholder="Anything worth remembering"
            value={formData.notes}
            onChange={handleChange}
            icon={<FileText className="w-4 h-4" />}
            error={errors.notes}
          />

          {mode === "add" && (
            <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700">
              <input
                type="checkbox"
                name="trackEmiAsExpense"
                checked={formData.trackEmiAsExpense}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                <span className="font-medium text-gray-900">
                  Track EMI as monthly recurring expense
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  We&apos;ll automatically create a recurring expense so the EMI
                  shows up in your monthly Expenses ledger. Recommended.
                </span>
              </span>
            </label>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="px-6"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-6"
              isLoading={submitting}
            >
              {mode === "add" ? "Add Debt" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebtModal;
