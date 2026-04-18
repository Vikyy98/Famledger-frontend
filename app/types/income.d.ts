export interface IncomeDetails {
  id: number;
  userId: number;
  familyId: number;
  source: string;
  type: number;
  amount: number;
  status: boolean;
  frequency?: string; // For recurring income, specify frequency in days
  dateReceived: string; // ISO date string
  createdOn: string;
  updatedOn?: string;
}

export interface IncomeMonthlyTrend {
  month: string;
  year: number;
  total: number;
}

export interface IncomeResponse {
  familyId: number;
  totalIncome: string;
  totalRecurringIncome: string;
  incomes: IncomeDetails[];
  recurringIncomeCount: number;
  percentageDifference: string;
  monthlyTrend: IncomeMonthlyTrend[];
}

export interface AddIncomeRequest {
  familyId?: number;
  userId?: number;
  source: string;
  type: number;
  amount: number;
  frequency?: string; // For recurring income, specify frequency in days
  dateReceived: string; // ISO date string
}

/** routeType = original row type (URL segment); type = desired type from form (body). */
export interface UpdateIncomeRequest extends AddIncomeRequest {
  id: number;
  routeType: number;
}

/** routeType = income row kind (1 recurring, 2 one-time) for URL segment */
export interface DeleteIncomeArgs {
  id: number;
  familyId: number;
  routeType: number;
}
