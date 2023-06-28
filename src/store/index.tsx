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
<<<<<<< HEAD
import { notificationApiSlice } from "./notifications/notifications-api";
=======
import { resourceApiSlice } from "./resource/resource-api";
>>>>>>> fe8ee5c (add create resource)

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    selectedContest: contestSlice,
    [contestApiSlice.reducerPath]: contestApiSlice.reducer,
    [stepApiSlice.reducerPath]: stepApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [announcementApiSlice.reducerPath]: announcementApiSlice.reducer,
    [waitListApi.reducerPath]: waitListApi.reducer,
    [userDetailApi.reducerPath]: userDetailApi.reducer,
<<<<<<< HEAD
    [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
=======
    [resourceApiSlice.reducerPath]: resourceApiSlice.reducer,
>>>>>>> fe8ee5c (add create resource)
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApiSlice.middleware,
      contestApiSlice.middleware,
      stepApiSlice.middleware,
      waitListApi.middleware,
      userDetailApi.middleware,
      announcementApiSlice.middleware,
<<<<<<< HEAD
      notificationApiSlice.middleware
=======
      resourceApiSlice.middleware
>>>>>>> fe8ee5c (add create resource)
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
