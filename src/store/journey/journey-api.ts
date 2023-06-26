import { getCookie } from "<@>/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api";
export const stepApiSlice = createApi({
  reducerPath: "step",
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
  endpoints(builder) {
    return {
      getSteps: builder.query({
        query: () => "/progress/me",
      }),
    };
  },
});

export const { useGetStepsQuery } = stepApiSlice;
