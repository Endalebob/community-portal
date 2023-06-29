import React from "react";
import {
  BsCalendar2Week,
  BsArrowRepeat,
  BsPersonWorkspace,
} from "react-icons/bs";
import { useGetContestsStatQuery } from "<@>/store/contest/contest-api";
import Error from "../common/Error";
import OverViewCard, { CardProps } from "../common/OverViewCard";
const OverViewContests: React.FC = () => {
  const { data: status, isLoading, error } = useGetContestsStatQuery();

  if (isLoading) {
    return (
      <div className="rounded-md p-4 w-full mx-auto m-12">
        <div className="animate-pulse flex flex-row flex-wrap">
          <div className="h-20 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
          <div className="h-20 bg-slate-200 rounded-xl mt-8 w-64 ml-4 sm:ml-6"></div>
          <div className="h-20 bg-slate-200 rounded mt-8 w-64 ml-4 sm:ml-6"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return <Error message={"Error occured while fetching contests status"} />;
  }

  const overViewData: CardProps[] = [
    {
      icon: BsPersonWorkspace,
      title: "Total Contests Held",
      number: status?.value.totalContest,
    },
    {
      icon: BsCalendar2Week,
      title: "Upcoming Contest",
      number: status?.value.upcomingContests,
    },
    {
      icon: BsArrowRepeat,
      title: "current Contest",
      number: status?.value.currentContests,
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {overViewData.map((data, index) => (
        <div key={index} className="mt-4">
          <OverViewCard
            icon={data.icon}
            title={data.title}
            number={data.number}
          />
        </div>
      ))}
    </div>
  );
};

export default OverViewContests;
