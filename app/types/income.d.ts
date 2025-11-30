export interface IncomeDetails {
  incomeId: number;
  userId: number;
  memberName: string; // Corrected typo from MemeberName
  familyId: number;
  source: number;
  sourceName: string;
  category: number;
  categoryName: string;
  type: number;
  typeName: string;
  amount: string;
  status: boolean;
  createdOn: Date;
  updateOn: Date;
}

export interface IncomeResponse {
  userId: number;
  familyId: number;
  totalIncome: string;
  totalRecurringIncome: string;
  incomes: IncomeDetails[];
  recurringIncomeCount: number;
  percentageDifference: string;
}

export interface IncomeCategory {
  categoryId: number;
  categoryName: string;
}

export interface IncomeCategoriesResponse {
  categories: IncomeCategory[];
}
