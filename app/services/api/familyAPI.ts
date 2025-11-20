import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import { FamilyReponse, FamilyRequest } from "@/app/types/family";

const familyApi = createApi({
  reducerPath: "familyApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createFamily: builder.mutation<FamilyReponse, FamilyRequest>({
      query: (familyDetails) => ({
        url: "/family",
        method: "POST",
        body: familyDetails,
      }),
    }),
  }),
});

export const { useCreateFamilyMutation } = familyApi;
export default familyApi;
