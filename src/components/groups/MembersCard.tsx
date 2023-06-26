import { FC } from "react";
import Image from "next/image";
// import { Education } from "../models/education";

interface CardProps {
  name: string;
  email: string;
  imageUrl: string;
//   education: Education;
  date: string;
}

const Card: FC<CardProps> = ({ name, email, imageUrl, date }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-300">
      <div className="flex-shrink-0 h-12 w-12">
        <Image src={imageUrl} alt={name} layout="responsive" width={48} height={48} />
      </div>
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-gray-500">{email}</p>
      </div>
      <div className="flex-1 flex justify-end">
        {/* <p className="text-gray-500">{education}</p> */}
        <div className="border-l border-gray-300 pl-4 ml-4">
          <p className="text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;