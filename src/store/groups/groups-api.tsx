import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '<@>/utils/cookie';
import Group from '<@>/types/groups/group';
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api"


export const GroupDataApi = createApi({
tagTypes:["groups"],
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
    createGroup: builder.mutation<any, Partial<Group>>({
      query: (group) => ({
        url: "/Groups",
        method: "POST",
        body: group,
      }),
      invalidatesTags:["groups"]
    }),
    getGroups: builder.query({
    query: () => '/Groups',
    providesTags:["groups"]
  }),
})
});

export const {useGetGroupsQuery, useCreateGroupMutation }= GroupDataApi;

