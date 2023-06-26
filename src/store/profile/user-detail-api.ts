import { UserDetailData } from "<@>/types/admin/user-detail-response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userDetailApi = createApi({
  reducerPath: "userDetailApi",
  tagTypes: ["UserDetail"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api/Profile",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      getUserDetail: builder.query<UserDetailData, GetUserIdParams>({
        query: (params) => ({
          url: `/`,
          params
        }),
        providesTags: ["UserDetail"],
      }),
    };
  },
});

// TODO: Change this, User Id shouldn't pass by param from backend
interface GetUserIdParams {
  userId?: string;
}

export const { useGetUserDetailQuery } = userDetailApi;
