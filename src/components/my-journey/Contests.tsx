import React from "react";
import ContestCard from "./ContestCard";
import { Contest } from "<@>/types/Journey/Contest";
import { setSelectedContest } from "<@>/store/journey/contest-slice";
import { RootState } from "<@>/store";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import ContestDetail from "./ContestDetail";

interface ContestsProps {
  contests: Contest[];
}
const Contests: React.FC<ContestsProps> = ({ contests }) => {
  const selectedContest = useSelector(
    (state: RootState) => state.selectedContest.id
  );
  const currentTime = new Date();
  const dayInMiliSeconds = 24 * 60 * 60 * 1000;
  const week = 7;
  const upcomingContests = contests.filter(
    (contest: Contest) => currentTime < new Date(contest.date)
  );
  const RecentContests = contests.filter(
    (contest: Contest) =>
      currentTime >= new Date(contest.date) &&
      (currentTime.getTime() - new Date(contest.date).getTime()) /
        dayInMiliSeconds <=
        2 * week
  );
  console.log("selectedContest", selectedContest);
  return (
    <div className="flex flex-col p-4 gap-3 w-full min-w-sm">
      <div className="flex flex-col w-full gap-2">
        <p className="font-bold text-xl">Upcoming Contests</p>

        {upcomingContests.map((contest, index) => {
          return (
            <ContestCard
              key={index}
              id={contest.id}
              title={contest.title}
              date={contest.date}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-bold text-xl">Recent Contests</p>
        {RecentContests.map((contest, index) => {
          return (
            <ContestCard
              key={index}
              id={contest.id}
              title={contest.title}
              date={contest.date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Contests;
