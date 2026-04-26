export interface ExpenseDetails {
  id: number;
  userId: number;
  familyId: number;
  description: string;
  category: number;
  amount: number;
  expenseDate: string; // ISO date string (yyyy-MM-dd). For recurring rows the backend
  // surfaces StartDate here so the same shape works for the table.
  status: boolean;
  createdOn: string;
  updatedOn?: string;
  // Backend echoes these on every row so the UI can route updates/deletes to
  // the correct table (1 = recurring, 2 = one-time).
  type: number;
  frequency?: string;
}

export interface CategoryBreakdown {
  category: number;
  categoryName: string;
  amount: number;
  percentage: number;
}

export interface ExpenseMonthlyTrend {
  month: string;
  year: number;
  total: number;
}

export interface ExpenseResponse {
  familyId: number;
  totalExpense: string;
  totalRecurringExpense: string;
  recurringExpenseCount: number;
  percentageDifference: string;
  expenses: ExpenseDetails[];
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrend: ExpenseMonthlyTrend[];
}

export interface AddExpenseRequest {
  userId?: number;
  familyId?: number;
  description: string;
  category: number;
  amount: number;
  expenseDate: string; // yyyy-MM-dd
  type: number; // 1 = recurring, 2 = one-time
  frequency?: string; // ONETIME | MONTHLY (extendable later)
}

/** routeType = original row kind (URL segment); type = desired type from form (body). */
export interface UpdateExpenseRequest extends AddExpenseRequest {
  id: number;
  routeType: number;
}

/** routeType = expense row kind (1 recurring, 2 one-time) for URL segment */
export interface DeleteExpenseArgs {
  id: number;
  familyId: number;
  routeType: number;
}

export interface ExpenseCategoryOption {
  value: number;
  name: string;
}
