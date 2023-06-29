import React from "react";
import GroupsCard from "../../components/groups/GroupCard";
import { useState } from "react";
import OverView from "../../components/groups/OverView";
import { useGetGroupsQuery } from "<@>/store/groups/groups-api";
import SideBar from "<@>/components/groups/SideBar";
import Loading from "<@>/components/common/Loading";
import FetchingError from "<@>/components/common/FetchingError";
import Modal from "<@>/components/common/Modal";
import CreateGroup from "<@>/components/groups/CreateGroup";

const DashBoard: React.FC = () => {
  const { data, isLoading, error } = useGetGroupsQuery();
  const [selecteGroup, setSelectedGroup] = useState("");
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const handleCardClick = (id: any) => {
    setSelectedGroup(id);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }
  const groupData = data?.value;

  return (
    <div
      className={`grid ${selecteGroup ?  "grid-cols-6 mb-16" : "grid-cols-1"} `}
    >
      <div className={`${selecteGroup ? "col-span-6 md:col-span-4" : "col-span-1"}`}>
        <div className="flex pb-8 border-shadow">
          <OverView />
        </div>
        <div className="grid grid-cols-2 ml-8">
          <div>
            <h1 className="text-secondary-text font-semibold text-lg col-span-1">
              Groups
            </h1>
          </div>
          <div className="pb-4 col-span-1 justify-self-end mb-8">
            {showPopup && (
              <Modal
                onClose={handleClose}
                children={<CreateGroup handleClose={handleClose} />}
              />
            )}
            <button
              className="px-4 py-1 bg-primary text-white rounded-md justify-self-end mr-2"
              onClick={() => setShowPopup(true)}
            >
              <span className="font-bold ">+</span> New Group
            </button>
          </div>
        </div>
        <div className={`col-span-4 flex flex-wrap gap-4 ml-6`}>
          {groupData?.map((data: any) => (
            <GroupsCard
              key={data.id}
              handleCardClick={() => handleCardClick(data.id)}
              groupName={data.name}
              memberCount={data.membersCount}
              capacity={data.capacity}
            />
          ))}
        </div>
      </div>

      {selecteGroup && (
        <div className="hidden md:block col-span-2 relative">
          <SideBar id={selecteGroup} setSelectedGroup={setSelectedGroup} />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
