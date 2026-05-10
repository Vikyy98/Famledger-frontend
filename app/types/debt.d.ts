export interface DebtItem {
  id: number;
  userId: number;
  familyId: number;
  debtName: string;
  category: number;
  categoryName: string;
  lenderName?: string | null;
  principalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyEmi: number;
  emiDayOfMonth: number;
  startDate: string; // yyyy-MM-dd
  endDate?: string | null;
  nextEmiDate?: string | null;
  status: number; // 1 Active | 2 PaidOff | 3 Archived
  statusName: string;
  notes?: string | null;
  isEmiTrackedAsExpense: boolean;
  progressPercent: number;
  createdOn: string;
  updatedOn: string;
}

export interface DebtCategoryBreakdown {
  category: number;
  categoryName: string;
  amount: number;
  percentage: number;
}

export interface UpcomingEmi {
  debtId: number;
  debtName: string;
  amount: number;
  dueDate: string; // yyyy-MM-dd
  daysUntilDue: number;
}

export interface DebtResponse {
  familyId: number;
  totalDebts: number;
  totalMonthlyEmi: number;
  totalDebtsFormatted?: string;
  totalMonthlyEmiFormatted?: string;
  activeDebtCount: number;
  debts: DebtItem[];
  categoryBreakdown: DebtCategoryBreakdown[];
  upcomingEmis: UpcomingEmi[];
}

export interface AddDebtRequest {
  debtName: string;
  category: number;
  lenderName?: string;
  principalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyEmi: number;
  emiDayOfMonth: number;
  startDate: string;
  endDate?: string | null;
  notes?: string;
  trackEmiAsExpense: boolean;
}

export interface UpdateDebtRequest extends AddDebtRequest {
  id: number;
  familyId: number;
}

export interface DeleteDebtArgs {
  id: number;
  familyId: number;
}

export interface DebtCategoryOption {
  value: number;
  name: string;
}
