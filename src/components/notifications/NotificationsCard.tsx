import React from "react";
import dynamic from "next/dynamic";
import { FaRegCalendarAlt } from "react-icons/fa";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface NotifcationCardProps {
  title: string;
  content: string;
  date: string;
}
const NotificationsCard: React.FC<NotifcationCardProps> = ({ title, content, date }: NotifcationCardProps) => {
  return (
    <div className=" border rounded-md border-gray-50 max-w-[90%] md:max-w-[80%] lg:max-w-5xl w-screen p-4 flex flex-col justify-between mx-auto hover:cursor-pointer">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold capitalize">{title}</p>
        <ReactQuill value={content} readOnly={true} theme="bubble" />
      </div>

      <div className="flex justify-end w-full mt-10 text-sm ">
        <FaRegCalendarAlt className="mr-2" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NotificationsCard;
