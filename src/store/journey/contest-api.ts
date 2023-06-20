import { Response } from "<@>/types/response";
import { buildSelectors } from "@reduxjs/toolkit/dist/query/core/buildSelectors";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const contestApiSlice = createApi({
  reducerPath: "contest",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
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
        query: () => "",
      }),
      getRecentContests: builder.query({
        query: () => "",
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