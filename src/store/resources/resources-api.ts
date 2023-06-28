import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IResource from "<@>/types/resources/resourcesType";
import IResourceTopic from "<@>/types/resources/resourceListType";
import { getCookie } from "<@>/utils/cookie";

export const resourcesApiSlice = createApi({
  reducerPath: "resourcesApi",
  tagTypes: ["Resources"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api/Resource",
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
      getResources: builder.query({
        query: () => ({
          url: "/",
          method: "GET",
        }),
        providesTags: ["Resources"],
      }),
      getResourceById: builder.query({
        query: (id) => ({
          url: `/${id}`,
          method: "GET",
        }),
        providesTags: ["Resources"],
      }),
    };
  },
});
