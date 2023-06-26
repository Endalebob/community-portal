import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const waitListApi = createApi({
  reducerPath: "waitListApi",
  tagTypes: ["Waitlist","Group"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});

