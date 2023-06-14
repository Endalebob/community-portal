import Contest from "<@>/types/contest";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contestsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `token ${token}`);
      }
      return headers;
    },
  }),
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
