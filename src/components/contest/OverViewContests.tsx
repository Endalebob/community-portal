import React from "react";
import {
  BsCalendar2Week,
  BsArrowRepeat,
  BsPersonWorkspace,
} from "react-icons/bs";
import { useGetContestsStatQuery } from "<@>/store/contest/contest-api";
import Error from "../common/Error";
import OverViewCard, { CardProps } from "../common/OverViewCard";
import IsOverviewLoading from "./IsOverviewLoading";
const OverViewContests: React.FC = () => {
  const { data: status, isLoading, error } = useGetContestsStatQuery();

  if (isLoading) {
    return <IsOverviewLoading />;
  }
  if (error) {
    return <Error message={"Error occurred while fetching contests status"} />;
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
      title: "Current Contest",
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
