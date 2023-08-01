import React from "react";
import ContestTimer from "./ContestCardTimer";
import { setSelectedContest } from "<@>/store/contest/contest-slice";
import { useAppDispatch } from "<@>/store/hooks";

interface ContestCardProps {
  id: string;
  date: string;
  title: string;
}

const ContestCard: React.FC<ContestCardProps> = ({ id, date, title }) => {
  const contestTime = new Date(date);
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(setSelectedContest({ id: id }))}
      className="flex flex-col cursor-pointer w-full p-4 gap-1 rounded-md shadow-sm bg-primarybg border"
    >
      <div>
        <p className="font-semibold">{title}</p>
      </div>
      <div className="flex gap-6 text-sm opacity-30">
        <p className="">
          {contestTime.toLocaleDateString()}{" "}
          {contestTime.toLocaleTimeString().split(":").slice(0, 2).join(":") +
            " " +
            contestTime.toLocaleTimeString().slice(-2)}
        </p>
        <ContestTimer date={contestTime} />
      </div>
    </div>
  );
};

export default ContestCard;
