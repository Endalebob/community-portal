import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "<@>/utils/cookie";
import { GroupsResponse } from "<@>/types/groups/group-response";
import GroupBody from "<@>/types/groups/group-body";
import { GroupByIdResponse } from "<@>/types/groups/group-id-response";
import { AutoFillResponse } from "<@>/types/groups/autofill-response";
const BASE_URL = "https://a2sv-community-portal-api.onrender.com/api";

export const GroupDataApi = createApi({
  reducerPath: "group/api",
  tagTypes: ["Group"],
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
  endpoints: (builder) => ({
    createGroup: builder.mutation<GroupsResponse, GroupBody>({
      query: (group) => ({
        url: "/Groups",
        method: "POST",
        body: group,
      }),
      invalidatesTags: ["Group"],
    }),
    getGroups: builder.query<GroupsResponse, void>({
      query: () => ({
        url: "/Groups",
      }),
      providesTags: ["Group"],
    }),

    getGroupById: builder.query<GroupByIdResponse, string>({
      query: (id) => ({
        url: `/Groups/${id}`,
      }),
      providesTags: ["Group"],
    }),

    autoFillGroup: builder.mutation<AutoFillResponse, { id: number }>({
      query: (id) => ({
        url: "/Groups/auto-fill-members",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useGetGroupByIdQuery,
  useAutoFillGroupMutation,
} = GroupDataApi;
