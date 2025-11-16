import { createSlice } from "@reduxjs/toolkit";
import { IncomeResponse } from "../types/income";

const initialState: IncomeResponse = {
  userId: 0,
  familyId: 0,
  totalIncome: "",
  totalRecurringIncome: "",
  incomes: [],
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncomeDetails: (state, action) => {
      state.totalIncome = action.payload.totalIncome;
      state.totalRecurringIncome = action.payload.totalRecurringIncome;
      state.incomes = action.payload.incomes;
    },
  },
});

export const { setIncomeDetails } = incomeSlice.actions;
export default incomeSlice;
