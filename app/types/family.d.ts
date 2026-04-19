export interface FamilyReponse {
  familyId: number;
  familyCode: string;
  invitationCode?: string | null;
  invitationLink?: string | null;
}

export interface FamilyInvitationResponse {
  invitationCode: string;
  expiresAtUtc: string;
}

export interface FamilyMember {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdOn: string;
}

/** Body for POST /families — user id comes from JWT only. */
export interface CreateFamilyRequest {
  familyName: string;
}

export type MemberRole = "Admin" | "Member";

export interface RemoveMemberArgs {
  familyId: number;
  memberUserId: number;
}

export interface UpdateMemberRoleArgs {
  familyId: number;
  memberUserId: number;
  role: MemberRole;
}
