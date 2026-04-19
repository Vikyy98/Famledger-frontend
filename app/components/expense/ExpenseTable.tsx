import React, { useMemo, useState } from "react";
import TableContainer from "../shared/TableContainer";
import AddButton from "../shared/AddButton";
import ConfirmModal from "../shared/ConfirmModal";
import ExpenseModal, { ExpenseFormData } from "./ExpenseModal";
import { Edit, Trash } from "lucide-react";
import {
  AddExpenseRequest,
  ExpenseCategoryOption,
  ExpenseDetails,
  UpdateExpenseRequest,
} from "@/app/types/expense";
import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
} from "@/app/services/api/expenseAPI";
import expenseApi from "@/app/services/api/expenseAPI";
import { useAppSelector, useAppDispatch } from "@/app/hooks/useAuth";
import {
  EXPENSE_DELETE_CONFIRM_MESSAGE,
  EXPENSE_DELETE_CONFIRM_TITLE,
} from "./deleteExpenseMessages";

interface ExpenseTableProps {
  expenses: ExpenseDetails[];
  memberNamesByUserId?: Record<number, string>;
  categories: ExpenseCategoryOption[];
  categoriesLoading?: boolean;
}

// Ring-style category badges: white fill, tinted ring + text. Quieter than filled pills,
// and keeps color as a secondary identifier rather than competing with row content.
const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Food: "ring-orange-200 text-orange-700",
  Housing: "ring-indigo-200 text-indigo-700",
  Transport: "ring-sky-200 text-sky-700",
  Utilities: "ring-amber-200 text-amber-700",
  Entertainment: "ring-pink-200 text-pink-700",
  Medical: "ring-rose-200 text-rose-700",
  Education: "ring-emerald-200 text-emerald-700",
  Other: "ring-gray-200 text-gray-700",
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  memberNamesByUserId,
  categories,
  categoriesLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDetails | undefined>();
  const [pendingDelete, setPendingDelete] = useState<ExpenseDetails | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [addExpenseMutation] = useAddExpenseMutation();
  const [updateExpenseMutation] = useUpdateExpenseMutation();
  const [deleteExpenseMutation] = useDeleteExpenseMutation();

  const categoryNameByValue = useMemo(() => {
    const map: Record<number, string> = {};
    for (const c of categories) map[c.value] = c.name;
    return map;
  }, [categories]);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedExpense(undefined);
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (expense: ExpenseDetails) => {
    setModalMode("edit");
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(undefined);
  };

  const formatIndianDate = (value?: string) => {
    if (!value) return "-";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString("en-IN");
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const getMemberDisplayName = (expenseUserId: number) => {
    if (user?.id === expenseUserId) {
      return user.name || memberNamesByUserId?.[expenseUserId] || "You";
    }
    const resolved = memberNamesByUserId?.[expenseUserId];
    if (resolved) return resolved;
    return `Member ${expenseUserId}`;
  };

  const canModifyExpense = (expense: ExpenseDetails) => {
    if (!user) return false;
    if (user.role?.toLowerCase() === "admin") return true;
    return expense.userId === user.id;
  };

  const openDeleteConfirm = (expense: ExpenseDetails) => {
    if (!canModifyExpense(expense)) return;
    setPendingDelete(expense);
  };

  const handleConfirmDelete = async () => {
    const expense = pendingDelete;
    if (!expense) return;
    setIsDeleting(true);
    try {
      await deleteExpenseMutation({
        id: expense.id,
        familyId: expense.familyId,
      }).unwrap();
      dispatch(
        expenseApi.util.updateQueryData("getExpenseDetails", expense.familyId, (draft) => {
          if (!draft.expenses) return;
          draft.expenses = draft.expenses.filter((x) => x.id !== expense.id);
        })
      );
      setPendingDelete(null);
    } catch (err) {
      console.error("Failed to delete expense:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmitExpense = async (formData: ExpenseFormData) => {
    try {
      if (modalMode === "edit" && selectedExpense) {
        const payload: AddExpenseRequest = {
          userId: user?.id,
          familyId: user?.familyId,
          description: formData.description,
          category: parseInt(formData.category, 10),
          amount: parseFloat(formData.amount),
          expenseDate: formData.expenseDate,
        };
        const updateRequest: UpdateExpenseRequest & { familyId: number } = {
          ...payload,
          id: selectedExpense.id,
          familyId: selectedExpense.familyId,
        };
        const updated: ExpenseDetails = await updateExpenseMutation(updateRequest).unwrap();
        dispatch(
          expenseApi.util.updateQueryData("getExpenseDetails", selectedExpense.familyId, (draft) => {
            if (!draft.expenses) return;
            const idx = draft.expenses.findIndex((x) => x.id === selectedExpense.id);
            if (idx >= 0) draft.expenses[idx] = updated;
          })
        );
        return;
      }

      const payload: AddExpenseRequest = {
        userId: user?.id,
        familyId: user?.familyId,
        description: formData.description,
        category: parseInt(formData.category, 10),
        amount: parseFloat(formData.amount),
        expenseDate: formData.expenseDate,
      };
      const created: ExpenseDetails = await addExpenseMutation(payload).unwrap();
      if (created && created.familyId) {
        dispatch(
          expenseApi.util.updateQueryData("getExpenseDetails", created.familyId, (draft) => {
            if (!draft.expenses) draft.expenses = [];
            draft.expenses.unshift(created);
          })
        );
      }
    } catch (err) {
      console.error("Failed to save expense:", err);
      throw err;
    }
  };

  const renderCategoryBadge = (categoryValue: number) => {
    const name = categoryNameByValue[categoryValue] ?? "Other";
    const cls = CATEGORY_BADGE_COLORS[name] ?? "ring-gray-200 text-gray-700";
    return (
      <span
        className={`inline-flex items-center rounded-md bg-white ring-1 px-2 py-0.5 text-[11px] font-medium w-fit ${cls}`}
      >
        {name}
      </span>
    );
  };

  if (!expenses || expenses.length === 0) {
    return (
      <>
        <TableContainer
          title="Expenses"
          action={<AddButton label="Add Expense" onClick={handleOpenAddModal} />}
        >
          <div className="py-12 text-center text-gray-500">
            <p className="text-lg">No items found</p>
            <p className="text-sm mt-2">Add your first expense to get started</p>
          </div>
        </TableContainer>
        <ExpenseModal
          mode={modalMode}
          initialData={selectedExpense}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitExpense}
          categories={categories}
          categoriesLoading={categoriesLoading}
        />
        <ConfirmModal
          isOpen={pendingDelete !== null}
          title={EXPENSE_DELETE_CONFIRM_TITLE}
          message={EXPENSE_DELETE_CONFIRM_MESSAGE}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmTone="danger"
          isLoading={isDeleting}
          onClose={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }

  return (
    <>
      <TableContainer
        title="Expenses"
        action={<AddButton label="Add Expense" onClick={handleOpenAddModal} />}
      >
        <table className="min-w-full text-sm table-auto">
          <thead className="border-b border-gray-200 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500">
            <tr>
              <th className="py-3 px-4">Member</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3 px-4">{getMemberDisplayName(expense.userId)}</td>
                <td className="py-3 px-4">{expense.description}</td>
                <td className="py-3 px-4">{renderCategoryBadge(expense.category)}</td>
                <td className="py-3 px-4 tabular-nums font-medium text-gray-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="py-3 px-4 tabular-nums text-gray-600">
                  {formatIndianDate(expense.expenseDate)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-3">
                    <Edit
                      onClick={() =>
                        canModifyExpense(expense) && handleOpenEditModal(expense)
                      }
                      width={16}
                      height={16}
                      className={
                        canModifyExpense(expense)
                          ? "cursor-pointer text-gray-500 hover:text-gray-900 transition-colors"
                          : "cursor-not-allowed text-gray-300"
                      }
                      aria-disabled={!canModifyExpense(expense)}
                    />
                    <Trash
                      width={16}
                      height={16}
                      onClick={() => openDeleteConfirm(expense)}
                      className={
                        canModifyExpense(expense)
                          ? "cursor-pointer text-rose-500 hover:text-rose-700 transition-colors"
                          : "cursor-not-allowed text-gray-300"
                      }
                      aria-disabled={!canModifyExpense(expense)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      <ExpenseModal
        mode={modalMode}
        initialData={selectedExpense}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitExpense}
        categories={categories}
        categoriesLoading={categoriesLoading}
      />

      <ConfirmModal
        isOpen={pendingDelete !== null}
        title={EXPENSE_DELETE_CONFIRM_TITLE}
        message={EXPENSE_DELETE_CONFIRM_MESSAGE}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmTone="danger"
        isLoading={isDeleting}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ExpenseTable;
