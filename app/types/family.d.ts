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
