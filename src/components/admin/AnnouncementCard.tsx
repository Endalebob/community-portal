import React from "react";
import Button from "../common/Button";
import { AiOutlinePlus } from "react-icons/ai";
interface AnnouncementCardProps {
  title: string;
  description: string;
  date: string;
  onClick: () => void;
}
const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  onClick,
  title,
  description,
  date,
}) => {
  return (
    <div
      onClick={onClick}
      className="border rounded-md shadow-md border-gray-50 p-4 flex flex-col gap-4 hover:cursor-pointer"
    >
      <p className="text-lg font-medium">{title}</p>

      <p className="line-clamp-4">{description}</p>
      <div className="flex justify-end w-full ">
        <p className="text-sm opacity-30">
          {Math.floor(
            (new Date().getTime() - new Date(date).getTime()) /
              (24 * 60 * 60 * 1000)
          )}{" "}
          days ago
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
