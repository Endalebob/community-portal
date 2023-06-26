import Image from "next/image";
import React from "react";

interface UserAvatarProps {
  fullName: string;
  profilePhotoUrl: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  fullName,
  profilePhotoUrl,
}) => {

  const placeholder: string = fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .slice(0, 2).join("");

    //To get the background color of the avatar based on the user's name
    const getBackgroundColor = () => {
      const asciiSum = fullName
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
      const r = (asciiSum * 37) % 255;
      const g = (asciiSum * 79) % 255;
      const b = (asciiSum * 127) % 255;
  
      return `rgb(${r}, ${g}, ${b})`;
    };

    const bgColor = getBackgroundColor();
  return (
    <div>
      {profilePhotoUrl ? (
        <Image
          width={100}
          height={100}
          className="w-10 h-10 rounded-full object-cover"
          src={profilePhotoUrl || ""}
          alt={`${fullName} ProfilePicture`}
        />
      ) : (
        <div
          style={{ backgroundColor: bgColor }}
          className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full"
        >
          <span className="text-white text-lg">{placeholder}</span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
