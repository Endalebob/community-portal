import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Announcement } from "<@>/types/admin/Announcement";
import { useDeleteAnnouncementMutation } from "<@>/store/announcement/announcement-api";
import { MdModeEditOutline } from "react-icons/md";
import { createMarkup } from "../common/TextEditor";

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
  const [
    deleteAnnouncement,
    { data, isError, isSuccess, isLoading: isDeleting },
  ] = useDeleteAnnouncementMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, data, isDeleting, isError]);
  return (
    <div className="w-screen max-w-5xl h-full p-2 flex flex-col gap-4 min-h-screen">
      <div className="flex justify-between items-start gap-24">
        <p className="font-bold text-lg">
          <ReactMarkdown children={title} />
        </p>

        <div className="flex gap-2">
          <MdModeEditOutline onClick={onEdit} className="w-5 h-5" />
          <AiFillDelete
            onClick={() => {
              !isDeleting && deleteAnnouncement(id);
            }}
            className="w-5 h-5"
          />
        </div>
      </div>
      <div dangerouslySetInnerHTML={createMarkup(description)} />
    </div>
  );
};

export default AnnouncementDetail;
