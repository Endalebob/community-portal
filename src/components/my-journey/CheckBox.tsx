import React from "react";
import { BiCheck } from "react-icons/bi";
interface CheckBoxProps {
  isCompleted: boolean;
  isStepper?: boolean;
  isActive?: boolean;
}
const CheckBox: React.FC<CheckBoxProps> = ({
  isCompleted,
  isStepper,
  isActive,
}) => {
  return (
    <div
      className={`${
        isStepper ? "w-4 h-4" : "w-5 h-5"
      } flex shrink-0 rounded-full items-center justify-center  ${
        isCompleted
          ? "bg-primary"
          : isActive
          ? "border-4 border-primary"
          : "border-4"
      }`}
    >
      {isCompleted && <BiCheck className="w-full h-full text-white" />}
    </div>
  );
};

export default CheckBox;
