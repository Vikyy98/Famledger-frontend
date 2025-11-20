import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/auth";
import { RootState } from "../store/store";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token ?? typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    // Define your authentication endpoints here
    registerUser: builder.mutation({
      query: (userData: RegisterRequest) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginDetails) => ({
        url: "/auth/login",
        method: "POST",
        body: loginDetails,
      }),
    }),
    createFamily: builder.mutation({
      query: (familyDetails) => ({
        url: "/family",
        method: "POST",
        body: familyDetails,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCreateFamilyMutation,
} = authApi;
export default authApi;
