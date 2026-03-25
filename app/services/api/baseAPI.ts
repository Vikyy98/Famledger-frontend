import { RootState } from "@/app/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://famledgerapi.azurewebsites.net/api",
  prepareHeaders: (headers, { getState }) => {
    const reduxToken = (getState() as RootState).auth.token;
    const token =
      reduxToken ?? (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});