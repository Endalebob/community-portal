import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Announcement } from "<@>/types/admin/Announcement";
import { useDeleteAnnouncementMutation } from "<@>/store/announcement/announcement-api";

interface AnnouncementDetailProps {
  announcement: Announcement;
  onEdit: () => void;
  onClose: () => void;
}
const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({
  announcement: { id, title, description },
  onEdit,
  onClose,
}) => {
  const [deleteAnnouncement, { data, isError, isSuccess, isLoading }] =
    useDeleteAnnouncementMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, data, isLoading, isError]);
  return (
    <div className="w-full max-w-5xl h-full p-2 flex flex-col gap-4">
      <div className="flex justify-between items-start gap-24">
        <p className="font-bold text-lg">
          <ReactMarkdown children={title} />
        </p>

        <div className="flex gap-2">
          <MdModeEditOutline onClick={onEdit} className="w-5 h-5" />
          <AiFillDelete
            onClick={() => {
              deleteAnnouncement(id);
            }}
            className="w-5 h-5"
          />
        </div>
      </div>

      <ReactMarkdown children={description} />
    </div>
  );
};

export default AnnouncementDetail;
