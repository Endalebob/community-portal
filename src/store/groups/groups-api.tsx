import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '<@>/utils/cookie';
import Group from '<@>/types/groups/group';
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api"


export const GroupDataApi = createApi({
  reducerPath:'group/api',
  tagTypes: ['Group'],
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
    invalidatesTags: ['Group'],
    }),
    getGroups: builder.query({
    query: () => '/Groups',
    providesTags: ['Group']
  }),

    getGroup: builder.query({
      query: (id) => `/Groups/${id}`,
      providesTags: ['Group']
    }),

  autoFillGroup: builder.mutation<any, any>({
    query: (body) => ({
      url: "/Groups/auto-fill-members",
      method: "POST",
      body,
    }),
    invalidatesTags: ['Group']
  }),


})
});


export const {useGetGroupsQuery, useCreateGroupMutation, useGetGroupQuery , useAutoFillGroupMutation}= GroupDataApi;