import React from "react";
import GroupsCard from "../../components/heads/GroupCard";
import { useState } from "react";
import OverView from "../../components/heads/Overview"
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetGroupsQuery } from "<@>/store/group/group-api";
import Sidebar from "<@>/components/heads/SideBar";
import GroupCard from "../../components/heads/GroupCard";
import groupdata from "<@>/types/heads/dashboard";



const DashBoard: React.FC = () => {
  const { data: group = [], isLoading, error } = useGetGroupsQuery({});
  // const [groupData, setGroup] = useState<groupdata[]>([]);
  const [selecteGroup, setSelectedGroup] = useState("")
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(false);
  const handleCardClick = (group: groupdata) => {
    setSelectedGroup(group.id);
    setIsSidebarOpen(true);
  };

  
  // const handleGroupData = async () => {
  //   try {
  //     const response = await useGetGroupsQuery({});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error){
    return <div>Error</div>
  }
  console.log(group)
  const groupData = group.value

  // useEffect(() => {
  //   if (group) {
  //     handleGroupData();
  //   }
  // }, []);

  return (
  <div className="grid grid-cols-2">
  <div className="grid grid-row-2">
  <div className = "flex pb-24 border-shadow"><OverView/></div>
  <div className={`col-span-1 flex flex-col lg:flex-row gap-4 ${selecteGroup ? 'lg:pl-72' : ''}`}>
  <div className="flex flex-col gap-4">
    {groupData.map((data:any) => (
      <button onClick={handleCardClick}>
        <GroupsCard
        key={data.id}
        id = {data.id}
        groupName= {data.name}
        memberCount={data.capacity}
        
        // className={selecteGroup === groupData.id ? 'bg-gray-100' : ''}
        />
      </button>
      
    ))}
    </div>
    <div>
    {  <div>
  {activeItem && (
        <GroupCard id={groupData.id} groupName= {groupData.name} memberCount={groupData.capacity}/>
    )}
  </div>}
    </div>


    <div> 
    <Link href = "heads/CreateGroup">
    <button className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg" onClick = {()=> {router.push('/heads/CreateGroup')}}>
      New Group
    </button>
    </Link>
  </div>
  </div>
  </div>

  </div>
);
};
    

export default DashBoard;