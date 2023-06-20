import Link from "next/link";
import {
  SiCodeforces,
  SiGithub,
  SiGeeksforgeeks,
  SiLeetcode,
} from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
import ProgrammingHandles from "./ProgrammingHandles";
import Image from "next/image";
import User from "<@>/types/auth/user";
import { RootState } from "<@>/store";
import { useSelector } from "react-redux";

const StudentDetail = () => {
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

  return (
    <div className="overflow-y-scroll max-h-screen">
      <div className=" px-4 py-6 my-0.5 shadow-sm justify-between  text-gray-500 ">
        <h2 className="font-semibold">Student Detail</h2>
      </div>
      <div className="py-4 px-8">
        <div className="flex w-full space-x-4 my-6">
          <Image
            width={640}
            height={640}
            className="rounded-full bg-gray-100 w-32 h-32"
            src={applicant?.profilePicture || ""}
            alt=""
          />
          <div>
            <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
              <h3 className="whitespace-nowrap">Personal info</h3>
              <div className="w-full">
                <hr />
              </div>
            </div>
            <p className="text-gray-500">{applicant?.shortBio || "unknown"}</p>
          </div>
        </div>
        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap">Programming handles</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whiteore hooks than durinspace-nowrap">Education</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500">
              {applicant?.university || "unknown"} -
              {applicant?.department || "unknown"}
            </p>
            <p className="text-gray-500">
              Graduation year: {applicant?.graduationYear || "unknown"}
            </p>
          </div>
        </div>
        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap">Contact info</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500">
              Email: {applicant?.email || "unknown"}
            </p>
            <p className="text-gray-500">
              Country: {applicant?.country || "unknown"}
            </p>
            <p className="text-gray-500">
              Phone number: {applicant?.phoneNumber || "unknown"}
            </p>
            <p className="text-gray-500">
              Telegram:{" "}
              <Link
                href={`https://t.me/${applicant?.telegramUsername}`}
                className="text-blue-500 hover:underline"
              >
                {applicant?.telegramUsername || "unknown"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
