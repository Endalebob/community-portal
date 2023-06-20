import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Group from '<@>/types/group';
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api"


export const createGroupApi = createApi({
  baseQuery: fetchBaseQuery({
  baseUrl: BASE_URL,
  /*
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("authorization", `token ${token}`);
    }
    return headers;
  },*/
}),
  endpoints: (builder) => ({
    createGroup: builder.mutation<any, Partial<Group>>({
      query: (group) => ({
        url: "/Groups",
        method: "POST",
        body: group,
      }),
    }),
  }),
});

export const {useCreateGroupMutation} = createGroupApi;