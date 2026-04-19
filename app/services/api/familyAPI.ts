import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseAPI";
import {
  FamilyReponse,
  CreateFamilyRequest,
  FamilyInvitationResponse,
  FamilyMember,
  RemoveMemberArgs,
  UpdateMemberRoleArgs,
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
    removeFamilyMember: builder.mutation<void, RemoveMemberArgs>({
      query: ({ familyId, memberUserId }) => ({
        url: `/families/${familyId}/members/${memberUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, { familyId }) => [
        { type: "FamilyMembers", id: familyId },
      ],
    }),
    updateFamilyMemberRole: builder.mutation<FamilyMember, UpdateMemberRoleArgs>({
      query: ({ familyId, memberUserId, role }) => ({
        url: `/families/${familyId}/members/${memberUserId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (_result, _err, { familyId }) => [
        { type: "FamilyMembers", id: familyId },
      ],
    }),
  }),
});

export const {
  useGetFamilyMembersQuery,
  useCreateFamilyMutation,
  useCreateFamilyInvitationMutation,
  useRemoveFamilyMemberMutation,
  useUpdateFamilyMemberRoleMutation,
} = familyApi;
export default familyApi;
