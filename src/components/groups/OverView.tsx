import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { MdGroups2 } from "react-icons/md";
import { SiZenn } from "react-icons/si";
import OverViewCard, { CardProps } from "../common/OverViewCard";
import {
  useGetGroupTotalStudentQuery,
  useGetTotalGroupsQuery,
  useGetGroupMeanSizeQuery,
} from "<@>/store/groups/groups-api";
import Loading from "../common/Loading";
import FetchingError from "../common/FetchingError";

const GroupOverView: React.FC = () => {
  const { data: students, isLoading, error } = useGetGroupTotalStudentQuery();
  const { data: groups, isLoading: isLoadingGroups } = useGetTotalGroupsQuery();
  const { data: meanSize, isLoading: isLoadingMeanSize } =
    useGetGroupMeanSizeQuery();
    
  const GroupOverViewData: CardProps[] = [
    {
      icon: PiStudentFill,
      title: "Total Students",
      number: students?.value,
    },
    {
      icon: MdGroups2,
      title: "Total Groups",
      number: groups?.value,
    },
    {
      icon: SiZenn,
      title: "Mean Group Size",
      number: meanSize?.value,
    },
  ];

  if (isLoading|| isLoadingGroups|| isLoadingMeanSize){
    return <Loading/>
  }
  if (error) {
    return <FetchingError/>
  }

  return (
    <div className="font-semibold text-lg text-seconday-text text-left p-4">
      <h1 className="pl-4">Overview</h1>
      <div className="flex flex-row flex-wrap">
        {GroupOverViewData.map((data, index) => (
          <div key={index} className="ml-2 sm:ml-4 mt-4">
            <OverViewCard
              icon={data.icon}
              title={data.title}
              number={data.number}
            />
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default GroupOverView;