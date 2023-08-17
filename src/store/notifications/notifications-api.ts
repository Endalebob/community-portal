import { Response } from "<@>/types/response";
import { getCookie } from "<@>/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const notificationApiSlice = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getNotifications: builder.query<Response, void>({
      query: () => ({
        url: "/Notifications",
      }),
    }),
    readAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: "/Notifications",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useReadAllNotificationsMutation } =
  notificationApiSlice;
