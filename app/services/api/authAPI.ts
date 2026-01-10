import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse, RegisterRequest } from "../../types/auth";
import { baseQuery } from "./baseAPI";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // Define your authentication endpoints here
    registerUser: builder.mutation({
      query: (userData: RegisterRequest) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginDetails) => ({
        url: "/auth/token",
        method: "POST",
        body: loginDetails,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
