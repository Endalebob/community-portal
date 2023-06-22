import Contest from "<@>/types/contest";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api";

export const contestsApi = createApi({
  tagTypes: ["Contest"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createContest: builder.mutation<any, Partial<Contest>>({
      query: (contest) => ({
        url: "/Contests",
        method: "POST",
        body: contest,
      }),
      invalidatesTags: ["Contest"],
    }),
    getContest: builder.query<any, string>({
      query: (id) => `/Contests/${id}`,
      providesTags: ["Contest"],
    }),
    getContests: builder.query({
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
    updateContest: builder.mutation<any, Partial<Contest>>({
      query: (contest) => ({
        url: `/Contests`,
        method: "PUT",
        body: contest,
      }),
    }),
  }),
});

export const {
  useCreateContestMutation,
  useUpdateContestMutation,
  useGetContestQuery,
  useGetContestsQuery,
  useDeleteContestMutation,
} = contestsApi;
