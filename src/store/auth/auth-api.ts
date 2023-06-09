import SigninType from "<@>/types/signin";
import SignupType from "<@>/types/signup";
import User from "<@>/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Token {
  token: string;
}

export const authApiSlice = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body: SigninType) => {
          return { url: "/account/login/", method: "POST", body };
        },
      }),

      registerUser: builder.mutation({
        query: (body: SignupType) => {
          return {
            url: "/account/register/",
            method: "POST",
            body,
          };
        },
      }),

      updateUser: builder.mutation({
        query: ({ token, ...put }) => ({
          headers: {
            authorization: `token ${token.token}` as string,
          },
          url: "/account/user-detail/",
          method: "PUT",
          body: put as User,
        }),
      }),

      getUserapi: builder.query<User, Token>({
        query: (token) => ({
          headers: {
            authorization: `token ${token.token}` as string,
          },
          url: "/account/user-detail/",
          method: "GET",
        }),
      }),
      deleteUser: builder.mutation({
        query: (token) => ({
          headers: {
            authorization: `token ${token.token}` as string,
          },
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
