import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  FamilyReponse,
  CreateFamilyRequest,
  FamilyInvitationResponse,
  FamilyMember,
} from "@/app/types/family";

const familyApi = createApi({
  reducerPath: "familyApi",
  baseQuery: baseQuery,
  tagTypes: ["FamilyMembers"],
  endpoints: (builder) => ({
    getFamilyMembers: builder.query<FamilyMember[], number>({
      query: (familyId) => `/families/${familyId}/members`,
      providesTags: (_result, _err, familyId) => [
        { type: "FamilyMembers" as const, id: familyId },
      ],
    }),
    createFamily: builder.mutation<FamilyReponse, CreateFamilyRequest>({
      query: (body) => ({
        url: "/families",
        method: "POST",
        body,
      }),
    }),
    createFamilyInvitation: builder.mutation<FamilyInvitationResponse, number>({
      query: (familyId) => ({
        url: `/families/${familyId}/invitation`,
        method: "POST",
      }),
      invalidatesTags: (_result, _err, familyId) => [
        { type: "FamilyMembers", id: familyId },
      ],
    }),
  }),
});

export const {
  useGetFamilyMembersQuery,
  useCreateFamilyMutation,
  useCreateFamilyInvitationMutation,
} = familyApi;
export default familyApi;
