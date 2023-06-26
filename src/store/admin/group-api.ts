import { GroupResponse } from "<@>/types/admin/group-response";
import { waitListApi } from "./waitlist-api";
import { AddToGroupBody } from "<@>/types/admin/add-group-body";

const groupApi = waitListApi.injectEndpoints({
  endpoints(builder) {
    return {
      getGroups: builder.query<GroupResponse, void>({
        query: () => ({
          url: "/Groups",
        }),
        providesTags: ["Group"],
      }),
      addMembersToGroup: builder.mutation<GroupResponse, AddToGroupBody>({
        query: (body) => ({
          url: "/Groups/add-members",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Waitlist","Group"],
      }),
    };
  },
  overrideExisting: false,
});

export const { useGetGroupsQuery, useAddMembersToGroupMutation } = groupApi;
