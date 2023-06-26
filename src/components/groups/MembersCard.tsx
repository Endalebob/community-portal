import { FC } from "react";
import Image from "next/image";
import User from "<@>/types/auth/user";
// import { Education } from "../models/education";
interface CardProps {
  fullName: string;
  profilePicture: string;
  telegramUsername: string;
  university: string;
  graduationYear: string;
}

const ProfileCard: FC<CardProps> = ({fullName, profilePicture, telegramUsername, university, graduationYear}) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-300">
          <div className="flex-shrink-0 h-12 w-12 rounded">
        <Image src={profilePicture} alt={ "profileImage"} width={48} height={48} />
      </div>
      <div>
        <p className="font-medium text-gray-900">{fullName}</p>
        <p className="text-gray-500">{telegramUsername}</p>
      </div>
      <div className="flex-1 flex justify-end">
        <p className="text-gray-500">{university}</p>
        <div className="border-l border-gray-300 pl-4 ml-4">
          <p className="text-gray-500">{graduationYear}</p>
        </div>
      </div>
    </div>
      
  );
};

export default ProfileCard;