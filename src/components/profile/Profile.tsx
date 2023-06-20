// in this component I only want to show the button that lead to edit profile page

import { useGetUserapiQuery } from "<@>/store/auth/auth-api";
import { setUser } from "<@>/store/auth/user-slice";
import { useAppDispatch } from "<@>/store/hooks";
import CustomSuccess from "<@>/types/auth/custom-success";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StudentDetail from "./StudentDetail";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "<@>/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);

  // route protection
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login page if user is not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Redirect />;
  }

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

  console.log(user);
  return (
    <section>
      <h1 className="text-xl md:text-lg">Profile</h1>
      <div className="flex justify-center items-center">
        <div>{/* <Image src={} /> */}</div>
        <StudentDetail />
      </div>
    </section>
  );
};

export default Profile;
