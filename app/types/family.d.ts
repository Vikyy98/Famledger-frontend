export interface FamilyReponse {
  familyId: number;
  familyCode: string;
  invitationCode: string;
  invitationLink: string;
}

export interface FamilyRequest {
  userId: number | undefined;
  familyName: string;
  invitationLink: string;
  familyDetailType: number;
}
