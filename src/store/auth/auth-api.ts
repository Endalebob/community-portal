import Login from "<@>/types/auth/signin";
import Registration from "<@>/types/auth/signup";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `bearer ${token}`);
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
          url: "/Profile/me",
          method: "POST",

          body: put,
        }),
      }),

      getUserapi: builder.query({
        query: () => ({
          url: "/Profile/me",
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
