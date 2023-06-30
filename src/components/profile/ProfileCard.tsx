import { RootState } from "<@>/store";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { FaTelegram, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { IconType } from "react-icons/lib";
import { BiSolidUserCircle } from "react-icons/bi";
import { setCookie } from "<@>/utils/cookie";

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
  // check if the applicant has a profile picture and set profilePicture cookie
  if (applicant.profilePicture) {
    setCookie("profilePicture", applicant.profilePicture);
  }
  return (
    <div className="w-96  mx-2 rounded-lg overflow-hidden bg-white shadow-md p-8">
      {applicant.profilePicture ? (
        <Image
          className="w-full rounded-lg aspect-square object-center object-contain"
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
      <div className="py-4">
        <div className="font-bold text-xl mb-2">{applicant.fullName}</div>
      </div>

      <div className="flex ml-2 justify-start items-center space-x-5">
        {socialMedia.map(({ icon: Icon, to }, index) =>
          to.split("/").pop() != "null" ? (
            <Link key={index} target="_blank" href={to} passHref>
              <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 hover:border-primary transition-colors duration-300">
                <Icon className="text-2xl text-gray-500 hover:text-primary transition-colors duration-300" />
              </div>
            </Link>
          ) : null
        )}
      </div>

      <button
        className=" hover:bg-[rgb(36,95,150)] bg-primary mt-10 text-white font-bold py-2 px-4 rounded-md w-full transition-colors duration-300"
        onClick={() => router.push("/profile/edit")}
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileCard;
