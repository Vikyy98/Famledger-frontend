import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  AddExpenseRequest,
  DeleteExpenseArgs,
  ExpenseCategoryOption,
  ExpenseDetails,
  ExpenseResponse,
  UpdateExpenseRequest,
} from "../../types/expense";

const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: baseQuery,
  tagTypes: ["Expense", "ExpenseCategories"],
  endpoints: (builder) => ({
    getExpenseDetails: builder.query<ExpenseResponse, number>({
      query: (familyId) => `/families/${familyId}/expenses`,
      providesTags: (result) => {
        const expenses = result?.expenses ?? [];
        return [
          { type: "Expense", id: "LIST" },
          ...expenses.map((e: ExpenseDetails) => ({
            type: "Expense" as const,
            id: e.id,
          })),
        ];
      },
    }),

    getExpenseCategories: builder.query<ExpenseCategoryOption[], void>({
      query: () => "/expenses/categories",
      providesTags: [{ type: "ExpenseCategories", id: "LIST" }],
    }),

    addExpense: builder.mutation<ExpenseDetails, AddExpenseRequest>({
      query: (expenseRequest) => ({
        url: "/expenses",
        method: "POST",
        body: expenseRequest,
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),

    updateExpense: builder.mutation<ExpenseDetails, UpdateExpenseRequest>({
      query: ({ id, familyId, routeType, ...payload }) => ({
        url: `/families/${familyId}/expenses/${id}/${routeType}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),

    deleteExpense: builder.mutation<void, DeleteExpenseArgs>({
      query: ({ id, familyId, routeType }) => ({
        url: `/families/${familyId}/expenses/${id}/${routeType}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),
  }),
});

export const {
  useGetExpenseDetailsQuery,
  useGetExpenseCategoriesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
export default expenseApi;
