import React from "react";
import UserAvatar from "../common/UserAvatar";

interface UserProps {
  fullName: string;
  profilePicture: string;
  telegramUsername: string;
  university: string;
  graduationYear: string;
}

const ProfileCard: React.FC<UserProps> = ({
  fullName,
  profilePicture,
  telegramUsername,
  university,
  graduationYear,
}) => {
  return (
    <div className="flex px-6 py-3 w-full border-b border-gray-100 justify-between items-center rounded-sm ">
      <UserAvatar fullName={fullName} profilePhotoUrl={profilePicture} />
      <div className="pl-2">
        <p className="font-medium text-sm text-gray-500">{fullName}</p>
        <p className="text-sm text-gray-400 ">{telegramUsername}</p>
      </div>
      <div className="flex-1 flex justify-end text-sm pl-4 text-gray-600">
        <p className="pr-2">{university}</p>
        <div className="border-l border-gray-300 pl-2">
          <p>{graduationYear}</p>
        </div>
      </div>
    </div>
    
  );
};

export default ProfileCard;
