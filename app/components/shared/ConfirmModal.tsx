import React from "react";
import { X, AlertTriangle, Info } from "lucide-react";
import Button from "../ui/Button";

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  /** Main explanation (string or rich content). */
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  /** Primary action style: destructive (red) vs default app primary (blue). */
  confirmTone?: "danger" | "primary";
  isLoading?: boolean;
}

/**
 * Shared confirmation dialog. Matches IncomeModal backdrop and card styling
 * so it fits the rest of the app (gray-900/75 blur, white rounded panel).
 */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
  confirmTone = "danger",
  isLoading = false,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoading) return;
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  if (!isOpen) return null;

  const isDangerTone = confirmTone === "danger";

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-900/75 px-4 py-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="mx-auto my-6 w-full max-w-md rounded-lg bg-white shadow-xl transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-desc"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-6">
          <div className="flex gap-3">
            <span
              className={
                isDangerTone
                  ? "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100"
                  : "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100"
              }
              aria-hidden
            >
              {isDangerTone ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <Info className="h-5 w-5" />
              )}
            </span>
            <div>
              <h2 id="confirm-modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
              <div id="confirm-modal-desc" className="mt-2 text-sm leading-relaxed text-gray-600">
                {message}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => !isLoading && onClose()}
            className="shrink-0 text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
            aria-label="Close"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/80 px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => !isLoading && onClose()}
            disabled={isLoading}
            className="px-5"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmTone === "danger" ? "danger" : "primary"}
            onClick={handleConfirm}
            isLoading={isLoading}
            className="px-5 min-w-[7rem]"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
