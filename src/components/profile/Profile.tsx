// in this component I only want to show the button that lead to edit profile page

import { useGetUserapiQuery } from "<@>/store/auth/auth-api";
import { setUser } from "<@>/store/auth/user-slice";
import { useAppDispatch } from "<@>/store/hooks";
import CustomSuccess from "<@>/types/auth/custom-success";
import { useRouter } from "next/router";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data = [] as unknown as CustomSuccess,
    isFetching,
    isSuccess,
  } = useGetUserapiQuery("");
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    console.log(data);
    dispatch(setUser(data.value));
  }
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => {
          router.push("/profile/edit");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
