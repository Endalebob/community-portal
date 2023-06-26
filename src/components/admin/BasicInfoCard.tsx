import React from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface BasicInfoCardProps {
  data?: string;
  link?: string;
  icon: IconType;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  data,
  link = "",
  icon: Icon,
}) => {
  return (
    <div className="flex space-x-3 py-2 px-3 items-center">
      <div className="bg-blue-100 p-3 text-blue-950 rounded-lg">
        <Icon />
      </div>
      {link ? (
        <Link className="text-gray-700" href={link}>
          data
        </Link>
      ) : (
        <h4 className="text-gray-700">{data}</h4>
      )}
    </div>
  );
};

export default BasicInfoCard;
