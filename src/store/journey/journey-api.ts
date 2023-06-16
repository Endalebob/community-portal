import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const stepApiSlice = createApi({
  reducerPath: "step",
  baseQuery: fetchBaseQuery({
    baseUrl: "some",
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
