import Login from "<@>/types/auth/signin";
import Registration from "<@>/types/auth/signup";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `token ${token}`);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body: Login) => {
          return { url: "/Auth/login", method: "POST", body };
        },
      }),

      registerUser: builder.mutation({
        query: (body: Registration) => {
          return {
            url: "/Auth/register",
            method: "POST",
            body,
          };
        },
      }),

      updateUser: builder.mutation({
        query: ({ ...put }) => ({
          url: "/account/user-detail/",
          method: "PUT",
          body: put,
        }),
      }),

      getUserapi: builder.query({
        query: () => ({
          url: "/account/user-detail/",
          method: "GET",
        }),
      }),
      deleteUser: builder.mutation({
        query: () => ({
          url: "account/user-detail/",
          method: "DELETE",
        }),
      }),
    };
  },
});

export const {
  useLoginUserMutation,
  useGetUserapiQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApiSlice;
