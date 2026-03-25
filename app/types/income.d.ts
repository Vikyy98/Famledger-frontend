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
  createdOn: Date;
  updateOn: Date;
}

export interface IncomeResponse {
  userId: number;
  familyId: number;
  totalIncome: number;
  totalRecurringIncome: number;
  incomes: IncomeDetails[];
  recurringIncomeCount: number;
  percentageDifference: number;
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
