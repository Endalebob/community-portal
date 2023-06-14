import Contest from "<@>/types/contest";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createContest: builder.mutation<any, Partial<Contest>>({
      query: (contest) => ({
        url: "/create-contest",
        method: "POST",
        body: contest,
      }),
    }),
  }),
});

export const { useCreateContestMutation } = contestsApi;
