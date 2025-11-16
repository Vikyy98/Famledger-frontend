import { createSlice } from "@reduxjs/toolkit";
import { LoginResponse } from "../types/auth";

function getInitialAuthState() {
  if (typeof window === "undefined") return { user: null, token: null };

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
}
const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      if (action.payload) {
        const payload: LoginResponse = action.payload;

        state.token = payload.user.token;
        state.user = payload.user;
        localStorage.setItem("token", payload.user.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
      } else {
        console.log("Payload is empty to set user details");
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
export const { setUserDetails, logoutUser } = authSlice.actions;
