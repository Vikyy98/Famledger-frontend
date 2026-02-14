import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  AddIncomeRequest,
  IncomeDetails,
  IncomeResponse,
} from "../../types/income";

const incomeApi = createApi({
  reducerPath: "incomeApi",
  baseQuery: baseQuery,
  tagTypes: ["Income"],
  endpoints: (builder) => ({
  getIncomeDetails: builder.query<IncomeResponse, number>({
  query: (familyId) => `/families/${familyId}/incomes`,
  providesTags: (result) => {
    const incomes = result?.incomes ?? [];
        return [
          { type: "Income", id: "LIST" },
          ...incomes.map((inc: IncomeDetails) => ({
            type: "Income" as const,
            id: inc.Id,
          })),
        ];
      },
    }),

    addIncome: builder.mutation<IncomeDetails, AddIncomeRequest>({
      query: (incomeRequest) => ({
        url: "/income",
        method: "POST",
        body: incomeRequest,
      }),
      invalidatesTags: [{ type: "Income", id: "LIST" }],
    }),
  }),
});

export const { useGetIncomeDetailsQuery, useAddIncomeMutation } = incomeApi;
export default incomeApi;
