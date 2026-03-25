import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "../../types/auth";

/** Same on server and client — session is restored after mount via `rehydrateFromStorage`. */
const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    rehydrateFromStorage: (state) => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      state.token = token || null;
      state.user = user ? JSON.parse(user) : null;
    },
    setUserDetails: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.user.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.user.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setUserFamilyId: (state, action: PayloadAction<number>) => {
      if (!state.user) return;

      state.user.familyId = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;

      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
    },
  },
});

export default authSlice;
export const { setUserDetails, setUserFamilyId, logoutUser, rehydrateFromStorage } =
  authSlice.actions;
