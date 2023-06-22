import { Response } from "<@>/types/response";
import { getCookie } from "<@>/utils/cookie";
import { buildSelectors } from "@reduxjs/toolkit/dist/query/core/buildSelectors";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const contestApiSlice = createApi({
  reducerPath: "contest",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
<<<<<<< HEAD
    prepareHeaders: (headers) => {
      const token = getCookie('token');
=======
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
>>>>>>> 50153d4 (use the new contest endpoint)
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getContest: builder.query({
        query: (id) => `/contests/${id}`,
      }),
      getContests: builder.query<Response, any>({
        query: () => "/contests",
      }),
      getUpcomingContests: builder.query({
        query: () => "/Contests/upcoming",
      }),
      getRecentContests: builder.query({
        query: () => "/Contests/recent",
      }),
    };
  },
});

export const {
  useGetRecentContestsQuery,
  useGetUpcomingContestsQuery,
  useGetContestsQuery,
  useGetContestQuery,
} = contestApiSlice;
