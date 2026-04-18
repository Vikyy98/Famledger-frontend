import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/api/authAPI";
import authSlice from "../services/slices/authSlice";
import incomeApi from "../services/api/incomeAPI";
import familyApi from "../services/api/familyAPI";
import expenseApi from "../services/api/expenseAPI";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
    [familyApi.reducerPath]: familyApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(incomeApi.middleware)
      .concat(familyApi.middleware)
      .concat(expenseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
