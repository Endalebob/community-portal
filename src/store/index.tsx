import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./auth/user-slice";
import { authApiSlice } from "./auth/auth-api";
import authSlice from "./auth/auth-slice";
import { contestApiSlice } from "./journey/contest-api";
import { stepApiSlice } from "./journey/journey-api";
import contestSlice from "./journey/contest-slice";
import { contestsApi } from "./contest/contest-api";
import { announcementApiSlice } from "./announcement/announcement-api";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    selectedContest: contestSlice,
    [contestApiSlice.reducerPath]: contestApiSlice.reducer,
    [stepApiSlice.reducerPath]: stepApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [contestsApi.reducerPath]: contestsApi.reducer,
    [announcementApiSlice.reducerPath]: announcementApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApiSlice.middleware,
      contestApiSlice.middleware,
      stepApiSlice.middleware,
      contestsApi.middleware,
      announcementApiSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
