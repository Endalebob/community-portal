import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./auth/user-slice";
import { authApiSlice } from "./auth/auth-api";
import authSlice from "./auth/auth-slice";
import { stepApiSlice } from "./journey/journey-api";
import contestSlice from "./contest/contest-slice";
import { announcementApiSlice } from "./announcement/announcement-api";
import { contestApiSlice } from "./contest/contest-api";
import { waitListApi } from "./admin/waitlist-api";
import { userDetailApi } from "./profile/user-detail-api";
import { notificationApiSlice } from "./notifications/notifications-api";
import { resourceApiSlice } from "./resource/resource-api";
import { GroupDataApi } from "./groups/groups-api";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    selectedContest: contestSlice,
    [GroupDataApi.reducerPath]: GroupDataApi.reducer,
    [contestApiSlice.reducerPath]: contestApiSlice.reducer,
    [stepApiSlice.reducerPath]: stepApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [announcementApiSlice.reducerPath]: announcementApiSlice.reducer,
    [waitListApi.reducerPath]: waitListApi.reducer,
    [userDetailApi.reducerPath]: userDetailApi.reducer,
    [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
    [resourceApiSlice.reducerPath]: resourceApiSlice.reducer,
    [resourceApiSlice.reducerPath]: resourceApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApiSlice.middleware,
      contestApiSlice.middleware,
      stepApiSlice.middleware,
      waitListApi.middleware,
      userDetailApi.middleware,
      announcementApiSlice.middleware,
      notificationApiSlice.middleware,
      resourceApiSlice.middleware,
      GroupDataApi.middleware,
      notificationApiSlice.middleware,
      resourceApiSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
