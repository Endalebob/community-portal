import Image from "next/image";
import React, { useState } from "react";
import ContestTimer from "./ContestCardTimer";

interface ContestCardProps {
  id: string | number;
  date: string;
  description: string;
  onClick: (id: number | string) => void;
}

const ContestCard: React.FC<ContestCardProps> = ({
  onClick,
  id,
  date,
  description,
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="flex flex-col cursor-pointer w-full p-4 gap-1 rounded-md shadow-md bg-primarybg"
    >
      <div>
        <p className="font-semibold">{description}</p>
      </div>
      <div className="flex gap-6 text-sm opacity-30">
        <p className="">{date}</p>
        <ContestTimer date={new Date(date)} />
      </div>
    </div>
  );
};

export default ContestCard;
