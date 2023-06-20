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

const applicant: User = {
  appUserId: 123456789,
  fullName: "John Doe",
  profilePicture:
    "https://res.cloudinary.com/djtkzulun/image/upload/v1684307248/Portfolio/dgxjqlgpys1imwnw2bhq.png",
  telegramUsername: "abelmek",
  email: "johndoe@gmail.com",
  country: "United States",
  phoneNumber: "123-456-7890",
  university: "Example University",
  department: "Computer Science",
  graduationYear: "2023",
  favoriteLanguage: "JavaScript",
  cv: "https://example.com/johndoe/cv",
  shortBio:
    " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque quisquam reprehenderit perspiciatis ab beatae modi facilis reiciendis pariatur temporibus, molestiae nostrum odit corrupti, expedita non esse distinctio tenetur ipsum architecto! Lorem",
  leetCode: "johndoe",
  hackerrank: "johndoe",
  gitHub: "johndoe",
  linkedIn: "https://linkedin.com/in/johndoe",
  groupId: 123,
  codeforces: "jebessa",
  geeksforgeeks: "https://geeksforgeeks.com/johndoe",
};

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

const StudentDetail = () => {
  return (
    <div className="col-span-7 overflow-y-scroll max-h-screen waitlist-card-scroll">
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
            <p className="text-gray-500">{applicant?.shortBio}</p>
          </div>
        </div>
        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap">Programming handles</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="space-y-2">
            {programmingSites.map((item, index) => (
              <ProgrammingHandles key={index} {...item} />
            ))}
          </div>
        </div>
        <div className="my-6">
          <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
            <h3 className="whitespace-nowrap">Education</h3>
            <div className="w-full">
              <hr />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500">
              {applicant?.university} - {applicant?.department}
            </p>
            <p className="text-gray-500">
              Graduation year: {applicant?.graduationYear}
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
            <p className="text-gray-500">Email: {applicant?.email}</p>
            <p className="text-gray-500">Country: {applicant?.country}</p>
            <p className="text-gray-500">
              Phone number: {applicant?.phoneNumber}
            </p>
            <p className="text-gray-500">
              Telegram:{" "}
              <Link
                href={`https://t.me/${applicant?.telegramUsername}`}
                className="text-blue-500 hover:underline"
              >
                {applicant?.telegramUsername}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
