import React from "react";
import ContestCard from "./ContestCard";
import { Contest } from "<@>/types/Journey/Contest";

interface ContestsProps {
  contests: Contest[];
  setSelectedContest: (id: number | string) => void;
}
const Contests: React.FC<ContestsProps> = ({
  contests,
  setSelectedContest,
}) => {
  return (
    <div className="flex flex-col p-4 gap-3 w-full min-w-sm">
      <div className="flex flex-col w-full gap-2">
        <p className="font-bold text-xl">Upcoming Contests</p>

        {contests.map((contest, index) => {
          return (
            <ContestCard
              key={index}
              onClick={setSelectedContest}
              id={contest.id}
              description={contest.description}
              date={contest.date}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-bold text-xl">Recent Contests</p>
        {contests.map((contest, index) => {
          return (
            <ContestCard
              key={index}
              onClick={setSelectedContest}
              id={contest.id}
              description={contest.description}
              date={contest.date}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Contests;
