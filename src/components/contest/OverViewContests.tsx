import React from "react";
import OverViewCard, { CardProps } from "../common/OverViewCard";
import { PiStudentFill } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";

const overViewData: CardProps[] = [
  {
    icon: PiStudentFill,
    title: "Total Contests Held",
    number: 182,
  },
  {
    icon: PiStudentFill,
    title: "Upcoming Contest",
    number: 5,
  },
  {
    icon: PiStudentFill,
    title: "current Contest",
    number: 2,
  },
];

const OverViewContests: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {overViewData.map((data, index) => (
        <div
          key={index}
          className="ml-4 sm:ml-6 mt-4 hover:scale-110 transition duration-500"
        >
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
