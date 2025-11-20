import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse } from "../../types/auth";

const getInitialAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.user.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.user.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
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
export const { setUserDetails, logoutUser } = authSlice.actions;
