import { FamilyReponse } from "../../types/family";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const familyInitialState: FamilyReponse = {
  familyId: 0,
  familyCode: "",
  invitationCode: "",
  invitationLink: "",
};

const familySlice = createSlice({
  name: "family",
  initialState: familyInitialState,
  reducers: {
    setFamilyDetails: (state, action: PayloadAction<FamilyReponse>) => {
      state.familyId = action.payload.familyId;
      state.familyCode = action.payload.familyCode;
      state.invitationCode = action.payload.invitationCode;
      state.invitationLink = action.payload.invitationLink;
    },
  },
});

export const { setFamilyDetails } = familySlice.actions;
export default familySlice;
