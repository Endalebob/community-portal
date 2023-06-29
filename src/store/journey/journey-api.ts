import { getCookie } from "<@>/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api";
export const stepApiSlice = createApi({
  reducerPath: "step",
  tagTypes: ["Steps"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getSteps: builder.query({
        query: () => "/progress/me",
      }),
      apply: builder.mutation({
        query: () => ({
          url: "/profile/apply",
          method: "POST",
        }),
        invalidatesTags: ["Steps"],
      }),
    };
  },
});

export const { useGetStepsQuery, useApplyMutation } = stepApiSlice;
