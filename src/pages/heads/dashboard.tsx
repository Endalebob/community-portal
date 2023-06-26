import React from "react";
import GroupCard from "../../components/groups/GroupCard";
// import Sidebar from "<@>/components/heads/SideBar";
import { useState, useEffect } from "react";
import groupdata from "../../types/groups/dashboard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetGroupsQuery } from "<@>/store/groups/groups-api";



const DashBoard: React.FC = () => {
  const { data: group = [], isLoading, error } = useGetGroupsQuery({});
  const [groupData, setGroup] = useState<groupdata[]>([]);
  const [selecteGroup, setSelectedGroup] = useState("")
  const router = useRouter()
  // const handleGroupData = async () => {
  //   try {
  //     const response = useGetGroupsQuery;
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleCardClick = (group: groupdata) => {
    setSelectedGroup(group.id);
  };

  // useEffect(() => {
  //   handleGroupData();
  // }, []);
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error){
    return <div>Error</div>
  }
  console.log(group)
  return (
  <div className={`flex flex-col lg:flex-row gap-4 ${selecteGroup ? 'lg:pl-72' : ''}`}>
  <div className="flex flex-col gap-4">
    {groupData.map((groupData) => (
      <GroupCard
        key={groupData.id}
        id = {groupData.id}
        groupName= {groupData.groupName}
        memberCount={groupData.memberCount}
        // handleCardClick = {()=>handleCardClick}

        // className={selecteGroup === groupData.id ? 'bg-gray-100' : ''}
        />
    ))}
    <Link href = "heads/CreateGroup">
    <button className="mr-4 pt-4 text-xl justify-self-end" onClick = {()=> {router.push('/heads/CreateGroup')}}>
      Create New Group
    </button>
    </Link>
  </div>
  </div>
);
};
    

export default DashBoard;