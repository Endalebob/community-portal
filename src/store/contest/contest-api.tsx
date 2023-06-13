import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Contest {
  title: string;
  description: string;
  date: string;
  time: string;
  link: string;
}

export const contestsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createContest: builder.mutation<any, Partial<Contest>>({
      query: (contest) => ({
        url: "/contests",
        method: "POST",
        body: contest,
      }),
    }),
  }),
});

export const { useCreateContestMutation } = contestsApi;
