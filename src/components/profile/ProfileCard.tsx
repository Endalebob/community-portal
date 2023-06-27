import { RootState } from "<@>/store";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaTelegram, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { IconType } from "react-icons/lib";
import { BiSolidUserCircle } from "react-icons/bi";

interface socialIcon {
  icon: IconType;
  to: string;
}

const ProfileCard = () => {
  const router = useRouter();
  const applicant = useSelector((state: RootState) => state.user.user);

  const socialMedia: socialIcon[] = [
    {
      icon: FaTelegram,
      to: `https://t.me/${applicant.telegramUsername}`,
    },
    {
      icon: FaLinkedin,
      to: `https://www.linkedin.com/in/${applicant.linkedInHandle}`,
    },
  ];

  return (
    <div className="w-96  mx-2 rounded overflow-hidden bg-white shadow-lg p-10">
      {applicant.profilePicture ? (
        <Image
          className="w-full rounded-lg"
          src={applicant.profilePicture}
          alt="profile-picture"
          width={317}
          height={212}
        />
      ) : (
        <div className="m-auto">
          <BiSolidUserCircle color="gray" size={300} />
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{applicant.fullName}</div>
      </div>

      <div className="flex ml-2 justify-start items-center space-x-5">
        {socialMedia.map(({ icon: Icon, to }, index) => (
          <Link key={index} target="_blank" href={to} passHref>
            <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 hover:border-primary transition-colors duration-300">
              <Icon className="text-2xl text-gray-500 hover:text-primary transition-colors duration-300" />
            </div>
          </Link>
        ))}
      </div>

      <button
        className="bg-primary mt-10 hover:bg-white text-white hover:text-black border hover:border-primary font-bold py-2 px-4 rounded-full w-full transition-colors duration-300"
        onClick={() => router.push("/profile/edit")}
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileCard;
