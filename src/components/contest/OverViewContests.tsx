import React from "react";
import { PiStudentFill } from "react-icons/pi";
import OverViewCard, { CardProps } from "../common/OverViewCard";

const overViewData: CardProps[] = [
  {
    icon: PiStudentFill,
    title: "Total Contests Held",
    number: 182,
  },
  {
    icon: PiStudentFill,
    title: "Upcoming Contests",
    number: 5,
  },
  {
    icon: PiStudentFill,
    title: "Current Contests",
    number: 2,
  },
];

const OverViewContests: React.FC = () => {
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
