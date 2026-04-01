import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  AddIncomeRequest,
  IncomeDetails,
  IncomeResponse,
  UpdateIncomeRequest,
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
            id: inc.id,
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
    updateIncome: builder.mutation<IncomeDetails, UpdateIncomeRequest>({
      query: ({ id, familyId, routeType, ...payload }) => ({
        url: `/families/${familyId}/incomes/${id}/${routeType}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [{ type: "Income", id: "LIST" }],
    }),
  }),
});

export const { useGetIncomeDetailsQuery, useAddIncomeMutation, useUpdateIncomeMutation } = incomeApi;
export default incomeApi;
