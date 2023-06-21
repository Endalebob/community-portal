import Contest from "<@>/types/contest";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api";
export const contestsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as any).auth.token;
    //   if (token) {
    //     headers.set("authorization", `token ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    createContest: builder.mutation<any, Partial<Contest>>({
      query: (contest) => ({
        url: "/Contests",
        method: "POST",
        body: contest,
      }),
    }),
    getContest: builder.query<any, string>({
      query: (id) => `/Contests/${id}`,
    }),
    getContests: builder.query({
      query: () => "/contests",
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
} = contestsApi;
