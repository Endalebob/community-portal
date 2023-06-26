import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '<@>/utils/cookie';
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api"


export const GroupDataApi = createApi({
  baseQuery: fetchBaseQuery({
  baseUrl: BASE_URL,
  
  prepareHeaders: (headers) => {
    const token = getCookie('token');
    if (token) {
      headers.set("authorization", `bearer ${token}`);
    }
    return headers;
  },
}),
  endpoints: (builder) => ({
    createGroup: builder.mutation<any, any>({
      query: (group) => ({
        url: "/Groups",
        method: "POST",
        body: group,
      }),
    }),
    getGroups: builder.query({
    query: () => '/Groups'
  }),
})
});

export const {useGetGroupsQuery, useCreateGroupMutation }= GroupDataApi;

