// in this component I only want to show the button that lead to edit profile page

import { useGetUserapiQuery } from "<@>/store/auth/auth-api";
import { setUser } from "<@>/store/auth/user-slice";
import { useAppDispatch } from "<@>/store/hooks";
import CustomSuccess from "<@>/types/auth/custom-success";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import StudentDetail from "./StudentDetail";
import { useSelector } from "react-redux";
import { RootState } from "<@>/store";
import Redirect from "../common/Redirect";
import ProgrammingHandles from "./ProgrammingHandles";
import {
  SiCodeforces,
  SiGeeksforgeeks,
  SiGithub,
  SiLeetcode,
} from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";

const Profile = () => {
  const applicant = useSelector((state: RootState) => state.user.user);

  const programmingSites = [
    {
      platform: "LeetCode",
      handle: applicant?.leetCode,
      baseUrl: `https://leetcode.com/${applicant?.leetCode}`,
      icon: SiLeetcode,
    },
    {
      platform: "CodeForces",
      handle: applicant?.codeforces,
      baseUrl: `https://codeforces.com/profile/${applicant?.gitHub}`,
      icon: SiCodeforces,
    },
    {
      platform: "Github",
      handle: applicant?.gitHub,
      baseUrl: `https://github.com/${applicant?.gitHub}`,
      icon: SiGithub,
    },
    {
      platform: "HackerRank",
      handle: applicant?.hackerrank,
      baseUrl: `https://www.hackerrank.com/${applicant?.hackerrank}`,
      icon: FaHackerrank,
    },
    {
      platform: "GeeksForGeeks",
      handle: applicant?.geeksforgeeks,
      baseUrl: `https://auth.geeksforgeeks.org/user/${applicant?.geeksforgeeks}`,
      icon: SiGeeksforgeeks,
    },
  ];
  // route protection
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => router.push("/auth/signin"), 2000);
      // Redirect to login page if user is not authenticated
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

  return (
    <section>
      <h1 className="ml-16 text-xl md:text-lg">Profile</h1>

      <StudentDetail />

      <div className="space-y-2">
        {programmingSites.map((item, index) => (
          <ProgrammingHandles key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
