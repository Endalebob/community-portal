import React from "react";
import MembersCard from "./MembersCard";
// import { useState } from "react";
import {
  useGetGroupQuery,
  useAutoFillGroupMutation,
} from "<@>/store/groups/groups-api";

interface CardProps {
  name: string;
  email: string;
  imageUrl: string;
  education: string;
  date: string;
}
interface SidebarProps {
  id: string;
}

const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const { data: group = [], isLoading, error } = useGetGroupQuery(id);
  const [autoFillGroup, { isLoading: isFilling }] = useAutoFillGroupMutation();
  // const [autoFillSeats,{}] {useAutoFillGroupMutation()

  const handleAutofill = async (id:any) => {
    console.log(id,"@hello world@");

    await autoFillGroup({ id: id as number});
    console.log();
    
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error){
    return <div>Error</div>
  }
  console.log("this is the group@", group);
  const groupData = group.value;
  console.log("group Data", groupData);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 bg-">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-left">
          name
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 text right">
          education
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div>
          <div className="flex items-center space-x-4 p-4 border-b border-gray-300 font-medium">
            <div className="flex-1">Name</div>
            <div className="flex-1 text-right">Education</div>
          </div>

          <div>
            { groupData.map((data: any) => (
              <MembersCard
              key = {data.id}
              name = {data.fullName}
              image = {data.profileImage}
              telegram = {data.telegramUsername}
              education = {data.university}
              grdauationYear = {data.graduationYear}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <button
          className="px-4 py-1 bg-primary text-white rounded-md justify-self-end "
        disabled = {isFilling}
          onClick={(e)=>handleAutofill(groupData.id)}
        >
          {" "}
          Auto Fill Seats
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
