import AnnouncementCard from "<@>/components/admin/AnnouncementCard";
import AnnouncementDetail from "<@>/components/admin/AnnouncementDetail";
import CreateAnnouncement from "<@>/components/admin/CreateAnnouncement";
import EditAnnouncement from "<@>/components/admin/EditAnnouncement";
import Button from "<@>/components/common/Button";
import Error from "<@>/components/common/Error";
import Modal from "<@>/components/common/Modal";
import { useGetAnnouncementsQuery } from "<@>/store/announcement/announcement-api";
import { Announcement } from "<@>/types/admin/Announcement";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const index: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(false);
  const [createAnnouncement, setCreateAnnouncement] = useState(false);
  const [announcementDetail, setAnnouncementDetail] = useState<number | null>();
  const {
    data: response,
    isSuccess,
    isLoading,
    isError,
  } = useGetAnnouncementsQuery({});

  const announcements: Announcement[] = response?.value;

  return (
    <div className="w-full p-8">
      {createAnnouncement && (
        <Modal onClose={() => setCreateAnnouncement(false)}>
          <CreateAnnouncement onClose={() => setCreateAnnouncement(false)} />
        </Modal>
      )}

      {typeof announcementDetail === "number" && (
        <Modal
          onClose={() => {
            setEditAnnouncement(false);

            setAnnouncementDetail(null);
          }}
        >
          {editAnnouncement ? (
            <EditAnnouncement
              announcement={
                announcements.find(
                  (announcement) => announcement.id === announcementDetail
                )!
              }
              onClose={() => setEditAnnouncement(false)}
            />
          ) : (
            <AnnouncementDetail
              onClose={() => setAnnouncementDetail(null)}
              onEdit={() => {
                setEditAnnouncement(true);
              }}
              announcement={
                announcements.find(
                  (announcement) => announcement.id === announcementDetail
                )!
              }
            />
          )}
        </Modal>
      )}

      <div className="flex justify-between w-full">
        <p className="opacity-60 text-lg">Announcements</p>

        <Button
          onClick={() => {
            setCreateAnnouncement(true);
            setShowModal(true);
          }}
          startIcon={<AiOutlinePlus></AiOutlinePlus>}
          label="New Announcements"
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 p-4">
        {isLoading ? (
          Array.from({ length: 16 }).map((_, index) => (
            <div className="animate-pulse flex flex-col gap-6 rounded-md shadow-md p-4">
              <div className="flex flex-col gap-2">
                <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
                <div className="w-36 rounded-sm h-4 bg-slate-200"></div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
                <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
                <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
                <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
              </div>
              <div className="self-end w-24 rounded-sm h-4 bg-slate-200"></div>
            </div>
          ))
        ) : isSuccess ? (
          response?.error ? (
            <Error message={"An error occured while fetching Contests"} />
          ) : (
            announcements.map((announcement, index) => {
              return (
                <AnnouncementCard
                  key={index}
                  onClick={() => {
                    setAnnouncementDetail(announcement.id);
                    setShowModal(true);
                  }}
                  title={announcement.title}
                  description={announcement.description}
                  date={announcement.date!}
                />
              );
            })
          )
        ) : isError ? (
          <div>
            <Error message={"An error occured while fetching Contests"} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default index;
