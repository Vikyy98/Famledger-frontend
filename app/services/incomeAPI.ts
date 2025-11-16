import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authAPI";
import { IncomeResponse } from "../types/income";

const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getIncomeDetails: builder.query<IncomeResponse, number>({
      query: (familyId) => `/income/details/${familyId}`,
    }),
  }),
});

export const { useGetIncomeDetailsQuery } = incomeApi;
export default incomeApi;
