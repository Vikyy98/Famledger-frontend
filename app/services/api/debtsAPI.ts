import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  AddDebtRequest,
  DeleteDebtArgs,
  DebtCategoryOption,
  DebtItem,
  DebtResponse,
  UpdateDebtRequest,
} from "../../types/debt";

const debtsApi = createApi({
  reducerPath: "debtsApi",
  baseQuery: baseQuery,
  tagTypes: ["Debt", "DebtCategories"],
  endpoints: (builder) => ({
    getDebtDetails: builder.query<DebtResponse, number>({
      query: (familyId) => `/families/${familyId}/debts`,
      providesTags: (result) => {
        const debts = result?.debts ?? [];
        return [
          { type: "Debt", id: "LIST" },
          ...debts.map((d) => ({ type: "Debt" as const, id: d.id })),
        ];
      },
    }),

    getDebtCategories: builder.query<DebtCategoryOption[], void>({
      query: () => "/debts/categories",
      providesTags: [{ type: "DebtCategories", id: "LIST" }],
    }),

    addDebt: builder.mutation<DebtItem, AddDebtRequest>({
      query: (payload) => ({
        url: "/debts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Debt", id: "LIST" }],
    }),

    updateDebt: builder.mutation<DebtItem, UpdateDebtRequest>({
      query: ({ id, familyId, ...payload }) => ({
        url: `/families/${familyId}/debts/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: "Debt", id: "LIST" },
        { type: "Debt", id: arg.id },
      ],
    }),

    deleteDebt: builder.mutation<void, DeleteDebtArgs>({
      query: ({ id, familyId }) => ({
        url: `/families/${familyId}/debts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: "Debt", id: "LIST" },
        { type: "Debt", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetDebtDetailsQuery,
  useGetDebtCategoriesQuery,
  useAddDebtMutation,
  useUpdateDebtMutation,
  useDeleteDebtMutation,
} = debtsApi;
export default debtsApi;
