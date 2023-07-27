import React, { useState } from "react";
import MembersCard from "./MembersCard";
import {
  useAutoFillGroupMutation,
  useGetGroupByIdQuery,
} from "<@>/store/groups/groups-api";
import ConfrimationCard from "./ConfirmAutoFill";
import Modal from "../common/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../common/Loading";
import FetchingError from "../common/FetchingError";
import { FaSearch } from "react-icons/fa";

interface SidebarProps {
  id: string;
  setSelectedGroup: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ id, setSelectedGroup }) => {
  const { data, isLoading, error } = useGetGroupByIdQuery(id);
  const [autoFillGroup, { error: autoFillError, isLoading: isFilling }] =
    useAutoFillGroupMutation();
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAutofill = async (id: any) => {
    await autoFillGroup({ id });
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
  const memberData = data?.value;

  return (
    <div className="flex flex-col sticky top-0 h-screen overflow-y-scroll waitlist-card-scroll sm:rounded-md border-l border-b">
      <div className=" sticky top-0 bg-white">
        <div className=" flex justify-between text-lg leading-6 font-medium p-2 border-b border-gray-100 text-gray-900 text-left ">
          <div className="flex text-gray-500 justify-between items-center">
            <button onClick={() => setSelectedGroup("")} className="pr-2">
              <AiOutlineCloseCircle />
            </button>

            <h3>{memberData?.name}</h3>
          </div>
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
            <span className="text-gray-300 mr-2">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              className="w-full focus:outline-none placeholder:font-normal"
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
                profilePicture={member?.profilePicture}
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
              autoFillError ? (
                <div className="flex flex-col w-full items-center mb-4  w-[50vw] md:w-[40vw] lg:w-[30vw] justify-center text-gray-500">
                  No user in the waitlist
                </div>
              ) : data?.value?.capacity !== data?.value?.membersCount ? (
                <ConfrimationCard
                  handleAutoFill={() => handleAutofill(id)}
                  handleClose={handleClose}
                />
              ) : (
                <div className="flex flex-col text-center mb-4 text-gray-500 w-[50vw] md:w-[40vw] lg:w-[30vw]">
                  This group is full!
                </div>
              )
            }
          />
        )}
        <button
          className="px-4 py-1 bg-primary text-white rounded-md"
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
