import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/api/authAPI";
import authSlice from "../services/slices/authSlice";
import incomeApi from "../services/api/incomeAPI";
import familyApi from "../services/api/familyAPI";
import expenseApi from "../services/api/expenseAPI";
import debtsApi from "../services/api/debtsAPI";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
    [familyApi.reducerPath]: familyApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
    [debtsApi.reducerPath]: debtsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(familyApi.middleware)
      .concat(incomeApi.middleware)
      .concat(expenseApi.middleware)
      .concat(debtsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
