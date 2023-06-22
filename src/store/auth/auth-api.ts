import Login from "<@>/types/auth/signin";
import Registration from "<@>/types/auth/signup";
import { getCookie } from "<@>/utils/cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "auth/api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a2sv-community-portal-api.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = getCookie("token");
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
        query: (body: any) => {
          const formData = new FormData();
          for (const key in body) {
              if (body[key]) {
                formData.append(key, body[key]);
              }
            }
          return {
            url: "/Profile/me",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["User"],
      }),

      getUserapi: builder.query({
        query: () => ({
          url: "/Profile/me",
          method: "GET",
        }),
        providesTags: ["User"],
      }),
      deleteUser: builder.mutation({
        query: () => ({
          url: "/Profile/me",
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
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
