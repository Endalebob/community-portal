import AnnouncementCard from "<@>/components/admin/AnnouncementCard";
import AnnouncementDetail from "<@>/components/admin/AnnouncementDetail";
import CreateAnnouncement from "<@>/components/admin/CreateAnnouncement";
import EditAnnouncement from "<@>/components/admin/EditAnnouncement";
import Button from "<@>/components/common/Button";
import Modal from "<@>/components/common/Modal";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const announcements: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(false);
  const [createAnnouncement, setCreateAnnouncement] = useState(false);
  const [announcementDetail, setAnnouncementDetail] = useState<number | null>();
  const announcement = [
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
    {
      id: "dkjfkdjfkdj",
      title: "Quo asperiores odit aut error est eos autem quae delectus.",
      description:
        "Et veniam eos dolorem eaque sapiente repellendus ut. Ea doloremque utmollitia culpa dolor accusamus pariatur quisquam assumenda....",
      date: "2023-06-22",
    },
  ];
  return (
    <div className="w-full p-8">
      {createAnnouncement && (
        <Modal onClose={() => setCreateAnnouncement(false)}>
          <CreateAnnouncement />
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
            <EditAnnouncement onClose={() => setEditAnnouncement(false)} />
          ) : (
            <AnnouncementDetail
              onDelete={() => {}}
              onEdit={() => {
                setEditAnnouncement(true);
              }}
              announcement={announcement[announcementDetail]}
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
        {announcement.map((a, index) => {
          return (
            <AnnouncementCard
              onClick={() => {
                setAnnouncementDetail(index);
                setShowModal(true);
              }}
              title={a.title}
              description={a.description}
              date={a.date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default announcements;
