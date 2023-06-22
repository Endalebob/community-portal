import React, { useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
}
interface AnnouncementDetailProps {
  announcement: Announcement;
  onEdit: () => void;
  onDelete: () => void;
}
const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({
  announcement: { id, title, description },
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full max-w-5xl h-full p-2 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <p className="font-bold text-lg">
          Would you like your idea to be implemented by some of the best
          engineers of Africa and win $200?
        </p>

        <div className="flex gap-2">
          <MdModeEditOutline onClick={onEdit} className="w-5 h-5" />
          <AiFillDelete onClick={onDelete} className="w-5 h-5" />
        </div>
      </div>

      <p className="text-sm opacity-70">
        If you want to be part of this pivotal stage in our education program,
        where innovation meets societal impact, please fill out this form 📝📋,
        which is designed to learn about project ideas aimed at addressing
        community problems.
      </p>
      <p className="text-sm opacity-70">
        🤔🌱 Your project idea should identify a specific community problem and
        present a viable solution 💡🤝, focusing on the positive change it can
        bring. While the primary objective should not be revenue generation, we
        do appreciate ideas that can sustain themselves financially 💰💪, as
        this is indicative of their long-term feasibility and success. Remember,
        every idea counts and every project starts with a spark of creativity.
      </p>
      <p className="text-sm opacity-70">
        🔥🌈 We encourage you to think big, be innovative, and most importantly,
        demonstrate how your project could make our community a better place.
        🌟✨ We can't wait to see the unique and impactful ideas that you, our
        A2SVians, will bring to the table. 🙌💡 Please share this form with
        anyone you think has a great idea. Don't forget, the right ideas will
        fly. 🚀🌟
      </p>
    </div>
  );
};

export default AnnouncementDetail;
