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
import ProfileCard from "./ProfileCard";

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

  const dispatch = useAppDispatch();
  const {
    data = [] as unknown as CustomSuccess,
    isFetching,
    isSuccess,
  } = useGetUserapiQuery("");

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => router.push("/auth/signin"), 2000);
      // Redirect to login page if user is not authenticated
    }
  }, [isAuthenticated, router]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    console.log(data);
    dispatch(setUser(data.value));
  }

  if (!isAuthenticated) {
    return <Redirect />;
  }

  return (
    <section className="bg-[#F6F6FC]">
      <h1 className="ml-16 text-xl md:text-lg">Profile</h1>

      <div className="grid grid-cols-1 2xl:grid-cols-4 md:p-4 lg:p-20 space-y-6 space-x-6">
        <div className="flex flex-row flex-wrap gap-5 2xl:flex-col justify-center  md:col-span-2 lg:col-span-1">
          <ProfileCard />
          <div className="w-96">
            <h1 className="font-light font-sans uppercase whitespace-nowrap p-6 bg-white">
              Programming site handles
            </h1>
            <div className="space-y-2 max-w-md rounded overflow-hidden shadow-lg p-10 align-top bg-white">
              {programmingSites.map((item, index) => (
                <ProgrammingHandles key={index} {...item} />
              ))}
            </div>
          </div>
        </div>

        <StudentDetail />
      </div>
    </section>
  );
};

export default Profile;
