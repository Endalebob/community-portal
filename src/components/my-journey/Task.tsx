import React from "react";
import CheckBox from "./CheckBox";
interface TaskProps {
  isCompleted: boolean;
  title: string;
  description: string;
  active?: boolean;
}
const Task: React.FC<TaskProps> = ({
  isCompleted,
  title,
  description,
  active,
}) => {
  return (
    <div className="flex p-2 shadow-md rounded-md max-w-[44rem]">
      <div className="flex items-start m-4">
        <CheckBox isCompleted={isCompleted} active={active} />
      </div>

      <div className="flex flex-col gap-1 p-2">
        <p className="font-bold text-md lg:text-lg">{title}</p>
        <p className="font-small opacity-50">{description}</p>
      </div>
    </div>
  );
};

export default Task;
