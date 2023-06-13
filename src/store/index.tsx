import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./auth/user-slice";
import { authApiSlice } from "./auth/auth-api";
import authSlice from "./auth/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;