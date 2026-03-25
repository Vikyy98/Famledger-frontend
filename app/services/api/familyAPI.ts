import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import { FamilyReponse, CreateFamilyRequest } from "@/app/types/family";

const familyApi = createApi({
  reducerPath: "familyApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createFamily: builder.mutation<FamilyReponse, CreateFamilyRequest>({
      query: (body) => ({
        url: "/families",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateFamilyMutation } = familyApi;
export default familyApi;
