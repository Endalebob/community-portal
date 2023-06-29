import React from "react";
import { createMarkup } from "../common/TextEditor";
import { FaRegCalendarAlt } from "react-icons/fa";

interface NotifcationCardProps {
  title: string;
  content: string;
  date: string;
}
const NotificationsCard = ({ title, content, date }: NotifcationCardProps) => {
  return (
    <div className=" border rounded-md shadow-md border-gray-50 max-w-[90%] md:max-w-[80%] lg:max-w-5xl w-screen p-4 flex flex-col justify-between mx-auto hover:cursor-pointer">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">{title}</p>
        <div
          className="line-clamp-4"
          dangerouslySetInnerHTML={createMarkup(content)}
        />
      </div>

      <div className="flex justify-end w-full mt-10 text-sm ">
        <FaRegCalendarAlt className="mr-2" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NotificationsCard;
