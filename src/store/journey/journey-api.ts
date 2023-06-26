import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const stepApiSlice = createApi({
  reducerPath: "step",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api/steps",
  }),
  endpoints(builder) {
    return {
      getSteps: builder.query({
        query: () => "",
      }),
    };
  },
});

export const { useGetStepsQuery } = stepApiSlice;
