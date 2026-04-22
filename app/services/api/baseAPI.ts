import { RootState } from "@/app/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// Dev convenience only: falls back to localhost when running `next dev` without
// a .env.local. Production builds (Vercel) MUST provide NEXT_PUBLIC_API_BASE_URL,
// otherwise we fail loud at build/boot instead of silently hitting the wrong API.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "production"
    ? (() => {
        throw new Error(
          "NEXT_PUBLIC_API_BASE_URL is required in production. " +
            "Set it in your Vercel project's environment variables."
        );
      })()
    : "http://localhost:5000/api");

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
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