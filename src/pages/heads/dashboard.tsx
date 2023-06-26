import React from "react";
import GroupsCard from "../../components/groups/GroupCard";
import { useState } from "react";
import OverView from "../../components/groups/OverView";
import { useRouter } from "next/router";
import { useGetGroupsQuery } from "<@>/store/groups/groups-api";
import SideBar from "<@>/components/groups/SideBar";
import groupdata from "<@>/types/groups/dashboard";

const DashBoard: React.FC = () => {
  const { data: group = [], isLoading, error } = useGetGroupsQuery({});
  // const [groupData, setGroup] = useState<groupdata[]>([]);
  const [selecteGroup, setSelectedGroup] = useState("");
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(false);
  const handleCardClick = (id: any) => {
    setSelectedGroup(id);
    setActiveItem(!activeItem);
  };

  // const handleGroupData = async () => {
  //   try {
  //     const response = await useGetGroupsQuery({});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  console.log(group);
  const groupData = group.value;

  // useEffect(() => {
  //   if (group) {
  //     handleGroupData();
  //   }
  // }, []);

  return (
    <div className={`grid ${activeItem ? "grid-cols-2" : "grid-cols-1"} `}>
      <div>
        <div className="flex pb-24 border-shadow">
          <OverView />
        </div>
        <div></div>
        <div className="grid grid-cols-2 ml-16 mr-16">
          <div>
            <h1 className="text-secondary-text font-semibold ml-2 text-lg col-span-1">
              Groups
            </h1>
          </div>
          <div className="pb-4 col-span-1 justify-self-end">
            <button
              className="px-4 py-1 bg-primary text-white rounded-md justify-self-end"
              onClick={() => router.push("/heads/create-group")}
            >
              <span className="font-bold">+</span> New Group
            </button>
          </div>
        </div>
        <div className={`col-span-1 flex flex-row lg:flex-row gap-4 mx-16`}>
          <div className="flex flex-row flex-wrap gap-4">
            {groupData.map((data: any) => (
              <button onClick={() => handleCardClick(data.id)}>
                <GroupsCard
                  key={data.id}
                  id={data.id}
                  groupName={data.name}
                  memberCount={data.capacity}

                  // className={selecteGroup === groupData.id ? 'bg-gray-100' : ''}
                />
              </button>
            ))}
          </div>
          <div></div>
        </div>
      </div>

      {activeItem && (
        <div className="col-span-1">
          <SideBar id={selecteGroup} />
        </div>
      )}
    </div>
  );
};

export default DashBoard;
