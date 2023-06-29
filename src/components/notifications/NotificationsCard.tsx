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
    <div className={"bg-white rounded-lg shadow-lg max-w-3xl p-6"}>
      <h2 className="text-xl font-semibold mb-2 text-start">{title}</h2>
      <p
        className="text-start"
        dangerouslySetInnerHTML={createMarkup(content)}
      />

      {/* <p className="text-gray-700 mb-4">{content}</p> */}
      <div className="flex items-center text-gray-600">
        <FaRegCalendarAlt className="mr-2" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NotificationsCard;
