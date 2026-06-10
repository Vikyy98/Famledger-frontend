import { RootState } from "@/app/store/store";
import { logoutUser } from "@/app/services/slices/authSlice";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

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

const rawBaseQuery = fetchBaseQuery({
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

// A 401 on an authenticated request means the session expired or was revoked:
// clear it and send the user back to login. We ignore 401s when no token was
// present (e.g. a failed login attempt) so the login screen can show its error.
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const hadToken = Boolean((api.getState() as RootState).auth.token);
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && hadToken) {
    api.dispatch(logoutUser());
    if (typeof window !== "undefined" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  return result;
};
