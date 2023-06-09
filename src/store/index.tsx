import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./auth/user-slice";
import { authApiSlice } from "./auth/auth-api";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;