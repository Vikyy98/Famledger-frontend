import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/api/authAPI";
import authSlice from "../services/slices/authSlice";
import incomeSlice from "../services/slices/incomeSlice";
import incomeApi from "../services/api/incomeAPI";
import familySlice from "../services/slices/familySlice";
import familyApi from "../services/api/familyAPI";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    income: incomeSlice.reducer,
    family: familySlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
    [familyApi.reducerPath]: familyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(incomeApi.middleware)
      .concat(familyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
