import Contest from "<@>/types/contest";
import { getCookie } from "<@>/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "<@>/types/response";

const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api";

export const contestApiSlice = createApi({
  reducerPath: "contest",
  tagTypes: ["Contest"],
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
  endpoints: (builder) => ({
    createContest: builder.mutation<Response, Partial<Contest>>({
      query: (contest) => ({
        url: "/Contests",
        method: "POST",
        body: contest,
      }),
      invalidatesTags: ["Contest"],
    }),
    getContest: builder.query<Response, string>({
      query: (id) => `/Contests/${id}`,
      providesTags: ["Contest"],
    }),
    fillContestStat: builder.mutation({
      query: (id) => ({
        url: `/Contests/fill/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Contest"],
    }),
    getContests: builder.query<Response, void>({
      query: () => "/Contests",
      providesTags: ["Contest"],
    }),
    deleteContest: builder.mutation({
      query: (id) => ({
        url: `/Contests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contest"],
    }),
    updateContest: builder.mutation<Response, Partial<Contest>>({
      query: (contest) => ({
        url: `/Contests`,
        method: "PUT",
        body: contest,
      }),
    }),
    getUpcomingContests: builder.query({
      query: () => "/Contests/upcoming",
    }),
    getRecentContests: builder.query({
      query: () => "/Contests/recent",
    }),
    getContestsStat: builder.query<Response, void>({
      query: () => "/Contests/contest-stat",
      providesTags: ["Contest"],
    }),
  }),
});

export const {
  useCreateContestMutation,
  useUpdateContestMutation,
  useGetContestQuery,
  useGetContestsQuery,
  useDeleteContestMutation,
  useGetRecentContestsQuery,
  useGetUpcomingContestsQuery,
  useFillContestStatMutation,
  useGetContestsStatQuery,
} = contestApiSlice;
