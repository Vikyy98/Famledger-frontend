import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  AddIncomeRequest,
  DeleteIncomeArgs,
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
    deleteIncome: builder.mutation<void, DeleteIncomeArgs>({
      query: ({ id, familyId, routeType }) => ({
        url: `/families/${familyId}/incomes/${id}/${routeType}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Income", id: "LIST" }],
    }),
  }),
});

export const {
  useGetIncomeDetailsQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
export default incomeApi;
