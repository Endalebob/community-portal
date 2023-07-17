
import React from "react";
import CheckBox from "./CheckBox";
import ReactMarkdown from "react-markdown";
import { GrLinkNext } from "react-icons/gr";
import Button from "../common/Button";
import { useRouter } from "next/router";
interface TaskProps {
  isCompleted: boolean;
  title: string;
  description: string;
  active?: boolean;
  action?: string;
  path?: string;
}
const Task: React.FC<TaskProps> = ({
  isCompleted,
  title,
  description,
  active,
  action,
  path,
}) => {
  const router = useRouter();
  return (
    <div className="flex p-2 shadow-md rounded-md max-w-[44rem]">
      <div className="flex items-start m-4">
        <CheckBox isCompleted={isCompleted} active={active} />
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col gap-1 p-2">
          <p className="font-bold text-md lg:text-lg">{title}</p>
          <p className="font-small opacity-50">
            {" "}
            <ReactMarkdown children={description} />
          </p>
        </div>
        {action && !isCompleted && (
          <div className="flex justify-end p-2">
            <button
              onClick={() => path && router.push(path)}
              className={`${
                active ? "border-2 text-primary border-primary" : ""
              } hover:cursor-pointer hover:border-opacity-70 text-md font-semibold flex gap-3 items-center border rounded-md py-1 px-3`}
              disabled={!active}
            >
              {
                <span>
                  {" "}
                  {!active
                    ? `You have to complete the previous steps to`
                    : "Click here to"}{" "}
                  <span className="">{action}</span>
                </span>
              }

              <div>
                <style>
                  {`
                svg path {
                  stroke: primary
                }
                `}
                </style>
                <GrLinkNext color="primary" className="text-primary" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
