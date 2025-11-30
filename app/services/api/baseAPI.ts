import { RootState } from "@/app/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5267/api",
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
