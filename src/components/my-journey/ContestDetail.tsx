import React, { useState } from "react";
import ContestDetailTimer from "./contestDetailTimer";
import Button from "../common/Button";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface ContestDetailProps {
  id: string | number;
  setSelectedContest: (id: string | number | null) => void;
}
const ContestDetail: React.FC<ContestDetailProps> = ({
  id,
  setSelectedContest,
}) => {
  const contest = {
    title: "Round 3 Community Contest for on-boarding",
    date: "Jun 16, 2023",
    description:
      "Welcome to Competitive Programming Contest #2 Div-1! This thrilling event is designed for skilled programmers and will consist of algorithmic problems covering topics such as dynamic programming and graph algorithms. Use your creativity to solve problems and score the most points to win. Good luck and have fun!",
    link: "where should i go",
  };
  return (
    <div className="flex flex-col items-start w-full gap-6 max-w-sm">
      <div
        onClick={() => setSelectedContest(null)}
        className="flex mt-1 self-end justify-center w-7 h-7 items-center hover:bg-secondary rounded-full border p-1 transition-opacity"
      >
        <AiOutlineClose className="w-6 h-6" />
      </div>
      <div className="flex items-start">
        <p className="font-medium text-xl">{contest.title}</p>
      </div>

      <div className="mx-auto">
        <ContestDetailTimer date={new Date(contest.date)} />
      </div>

      <p>{contest.description}</p>

      <div className="flex w-full justify-end">
        <Button label="Open Contest" startIcon={<BiLinkExternal />} />
      </div>
    </div>
  );
};

export default ContestDetail;
