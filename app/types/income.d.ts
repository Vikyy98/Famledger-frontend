export interface IncomeDetails {
  incomeId: number;
  userId: number;
  familyId: number;
  source: string;
  categoryId: number;
  categoryName: string;
  typeId: number;
  typeName: string;
  amount: number;
  status: boolean;
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

export interface IncomeCategory {
  categoryId: number;
  categoryName: string;
}

export interface IncomeCategoriesResponse {
  categories: IncomeCategory[];
}
