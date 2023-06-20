import { RootState } from "<@>/store";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaTelegram, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";

const ProfileCard = () => {
  const router = useRouter();
  const applicant = useSelector((state: RootState) => state.user.user);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-10">
      <img
        className="w-full rounded-lg"
        src={applicant.profilePicture}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{applicant.fullName}</div>
      </div>

      <div className="flex justify-center items-center">
        <Link href="https://t.me/username" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300">
              <FaTelegram className="text-2xl text-gray-500 hover:text-blue-500 transition-colors duration-300" />
            </div>
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/username" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300 ml-4">
              <FaLinkedin className="text-2xl text-gray-500 hover:text-blue-500 transition-colors duration-300" />
            </div>
          </a>
        </Link>
        <Link href="https://twitter.com/username" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300 ml-4">
              <FaTwitter className="text-2xl text-gray-500 hover:text-blue-500 transition-colors duration-300" />
            </div>
          </a>
        </Link>
        <Link href="https://www.instagram.com/username" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300 ml-4">
              <FaInstagram className="text-2xl text-gray-500 hover:text-blue-500 transition-colors duration-300" />
            </div>
          </a>
        </Link>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition-colors duration-300"
        onClick={() => router.push("/profile/edit")}
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileCard;
