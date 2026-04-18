export interface ExpenseDetails {
  id: number;
  userId: number;
  familyId: number;
  description: string;
  category: number;
  amount: number;
  expenseDate: string; // ISO date string (yyyy-MM-dd)
  status: boolean;
  createdOn: string;
  updatedOn?: string;
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
}

export interface UpdateExpenseRequest extends AddExpenseRequest {
  id: number;
}

export interface DeleteExpenseArgs {
  id: number;
  familyId: number;
}

export interface ExpenseCategoryOption {
  value: number;
  name: string;
}
