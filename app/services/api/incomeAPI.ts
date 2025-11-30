import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import { IncomeResponse, IncomeCategory, IncomeCategoriesResponse } from "../../types/income";

const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getIncomeDetails: builder.query<IncomeResponse, number>({
      query: (familyId) => `/income/details/${familyId}`,
    }),
    getIncomeCategories: builder.query<IncomeCategoriesResponse, void>({
      query: () => `/income/categories`,
    }),
  }),
});

export const { useGetIncomeDetailsQuery, useGetIncomeCategoriesQuery } = incomeApi;
export default incomeApi;
