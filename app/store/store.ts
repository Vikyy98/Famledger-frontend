import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/authAPI";
import authSlice from "../services/authSlice";
import incomeSlice from "../services/incomeSlice";
import incomeApi from "../services/incomeAPI";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    income: incomeSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(incomeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
