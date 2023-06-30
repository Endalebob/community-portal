import React from "react";
import { createMarkup } from "../common/TextEditor";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const postTime = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <div
      onClick={onClick}
      className="border rounded-md shadow-md border-gray-50 p-4 flex flex-col justify-between hover:cursor-pointer max-h-60"
    >
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">{title}</p>

        <div className="line-clamp-4 max-h-36">
          <ReactQuill value={description} readOnly={true} theme="bubble" />
        </div>
      </div>

      <div className="flex justify-end w-full ">
        <p className="text-sm opacity-30">
          {postTime > 0 && `${postTime} day${postTime > 1 ? "s" : ""} ago`}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
