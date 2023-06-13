import Login from "<@>/types/signin";
import Registration from "<@>/types/signup";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApiSlice = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `token ${token}`);
      }
      return headers;
    }
  }),

  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body: Login) => {
          return { url: "/account/login/", method: "POST", body };
        },
      }),

      registerUser: builder.mutation({
        query: (body: Registration) => {
          return {
            url: "/account/register/",
            method: "POST",
            body,
          };
        },
      }),

      updateUser: builder.mutation({
        query: ({  ...patch }) => ({
          url: "/account/user-detail/",
          method: "PUT",
          body: patch,
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
