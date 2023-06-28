import React, { useState } from "react";
import MembersCard from "./MembersCard";
import {
  useAutoFillGroupMutation,
  useGetGroupByIdQuery,
} from "<@>/store/groups/groups-api";
import ConfrimationCard from "./ConfirmAutoFill";
import Modal from "../common/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface SidebarProps {
  id: string;
  setSelectedGroup: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ id, setSelectedGroup }) => {
  const { data, isLoading, error } = useGetGroupByIdQuery(id);
  const [autoFillGroup, { isLoading: isFilling }] = useAutoFillGroupMutation();
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAutofill = async (id: any) => {
    await autoFillGroup({ id });
    console.log("hey there", autoFillGroup)
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  if (isLoading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>Error</div>;
  }
  const memberData = data?.value;
  console.log("hey",data)

  return (
    <div className="flex flex-col sticky top-0 h-screen overflow-scroll waitlist-card-scroll sm:rounded-md border-l ">
      <div className=" sticky top-0 bg-white">
        <div className=" flex text-lg leading-6 font-medium p-2 border-b border-gray-100 text-gray-900 text-left ">
          <button onClick={() => setSelectedGroup("")} className="p-2 my-auto">
            <AiOutlineCloseCircle />
          </button>
          <div className="justify-between items-center">
            <h3 className="p-2 text-gray-500">{memberData?.name}</h3>
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-100 p-2 space-x-4 font-medium">
          <h3 className="pl-2">Name</h3>
          <h3 className="pr-2 ">Education</h3>
        </div>
      </div>

      <div>
        {memberData?.members?.length == 0 ? (
          <div className="text-center text-gray-300">No members</div>
        ) : (
          memberData?.members
            .filter((member) =>
              member.fullName.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((member, index) => (
              <MembersCard
                key={index}
                fullName={member.fullName}
                profilePicture={member?.profilePicture }
                telegramUsername={member?.telegramUsername}
                university={member?.university}
                graduationYear={member.graduationYear}
              />
            ))
        )}
      </div>
      <div className="sticky bottom-0 mt-auto bg-gray-100 pt-2 text-end">
        {showPopup && (
          <Modal
            onClose={handleClose}
            children={
              <ConfrimationCard
                handleAutoFill={() => handleAutofill(id)}
                handleClose={handleClose}
              />
            }
          />
        )}
        <button
          className="px-4 py-1  bg-primary text-white rounded-md justify-self-end "
          disabled={isFilling}
          onClick={() => setShowPopup(true)}
        >
          Auto Fill Seats
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
