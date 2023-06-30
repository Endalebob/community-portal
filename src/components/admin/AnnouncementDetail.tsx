import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Announcement } from "<@>/types/admin/Announcement";
import { useDeleteAnnouncementMutation } from "<@>/store/announcement/announcement-api";
import { MdModeEditOutline } from "react-icons/md";
import { createMarkup } from "../common/TextEditor";
import Modal from "../common/Modal";
import ProgressIndicator from "../common/ProgressIndicator";
import ReactQuill from "react-quill";

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
  const [deleteResource, setDeleteResource] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, data, isDeleting, isError]);
  return (
    <div className="w-screen max-w-5xl h-full p-2 flex flex-col gap-4 min-h-[60vh]">
      {deleteResource && (
        <Modal onClose={() => setDeleteResource(false)}>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-lg font-bold">Are you sure?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteResource(false)}
                className="bg-primary text-white rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => !isDeleting && deleteAnnouncement(id)}
                className="bg-primary text-white rounded-md px-4 py-2"
              >
                {isDeleting ? (
                  <ProgressIndicator size={5} color="white" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="flex justify-between items-start gap-24">
        <p className="font-bold text-lg">
          <ReactMarkdown children={title} />
        </p>

        <div className="flex gap-2">
          <MdModeEditOutline onClick={onEdit} className="w-5 h-5" />
          <AiFillDelete
            onClick={() => setDeleteResource(true)}
            className="w-5 h-5"
          />
        </div>
      </div>
      <ReactQuill value={description} readOnly={true} theme="snow" />{" "}
    </div>
  );
};

export default AnnouncementDetail;
