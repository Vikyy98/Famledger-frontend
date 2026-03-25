export interface FamilyReponse {
  familyId: number;
  familyCode: string;
  invitationCode: string;
  invitationLink: string;
}

/** Body for POST /families — user id comes from JWT only. */
export interface CreateFamilyRequest {
  familyName: string;
}
