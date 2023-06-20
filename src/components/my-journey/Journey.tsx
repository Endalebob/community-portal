import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import Task from "./Task";
import Contests from "./Contests";
import { useGetContestsQuery } from "<@>/store/journey/contest-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "<@>/store";
import { setSelectedContest } from "<@>/store/journey/contest-slice";
import Modal from "../common/Modal";
import ContestDetail from "./ContestDetail";
import { useWindowWidth } from "../common/WindowWidth";
import Error from "../common/Error";

const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    data: response,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetContestsQuery({});
  const dispatch = useDispatch();
  const contests = response?.value;
  const selectedContest = useSelector(
    (state: RootState) => state.selectedContest.id
  );

  const windowWidth = useWindowWidth();
  const largeScreen = 1024;
  const modalOpen = windowWidth! < largeScreen && selectedContest !== null;

  const steps = [
    {
      isCompleted: true,
      stepName: "Setup Profile",
      subSteps: [
        {
          isCompleted: true,
          subStepName: "Sign Up",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
        {
          isCompleted: true,
          subStepName: "Codeforce profile",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
        {
          isCompleted: true,
          subStepName: "Github profile",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
        {
          isCompleted: true,
          subStepName: "Leetcode profile",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
      ],
    },
    {
      isCompleted: false,
      stepName: "Participate in A2SV Contest",
      subSteps: [
        {
          isCompleted: false,
          subStepName: "Participate in Your first A2SV contest",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
        {
          isCompleted: false,
          subStepName: "Participate in Your second A2SV contest",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
      ],
    },
    {
      isCompleted: false,
      stepName: "Resume",
      subSteps: [
        {
          isCompleted: false,
          subStepName: "Upload your resume",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
      ],
    },
    {
      isCompleted: false,
      stepName: "Ready to Apply",
      subSteps: [
        {
          isCompleted: false,
          subStepName: "Apply to join A2SV community",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
      ],
    },
    {
      isCompleted: false,
      stepName: "Waitlist",
      subSteps: [
        {
          isCompleted: false,
          subStepName: "Apply to join A2SV community",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dignissimos reiciendis. Pariatur et placeat at deleniti, laboriosam consequuntur. Porro dolorem cum unde praesentium. Temporibus in veritatis nemo perspiciatis fuga quia!",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 w-full border-t">
      <div
        className={`${
          selectedContest != null ? `lg:col-span-2` : `lg:col-span-3`
        } col-span-4 flex flex-col lg:border-r p-4 pt-8`}
      >
        <div className="flex flex-col p-2">
          <Stepper steps={steps} setActiveStep={setActiveStep} />
        </div>

        <div className="flex flex-col p-4 mt-4">
          <p className="font-bold text-2xl">{steps[activeStep].stepName}</p>
          <div className="flex flex-col p-4 gap-4">
            {steps[activeStep]?.subSteps.map((subStep, index) => {
              const stepInprogress =
                !steps[activeStep].isCompleted &&
                (activeStep === 0 || steps[activeStep - 1].isCompleted);
              return (
                <Task
                  key={index}
                  isCompleted={subStep.isCompleted}
                  title={subStep.subStepName}
                  description={subStep.description}
                  active={
                    !subStep.isCompleted &&
                    (index === 0 ||
                      steps[activeStep].subSteps[index - 1].isCompleted) &&
                    stepInprogress
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`col-span-2 lg:col-span-1 flex ${
          modalOpen || selectedContest === null ? "" : "border-r px-3"
        }`}
      >
        {isLoading ? (
          <div className="animate-pulse w-full flex flex-col p-4 gap-2">
            <div className="w-2/3 rounded-sm h-4 mb-8 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
          </div>
        ) : isSuccess ? (
          response?.error ? (
            <div>{response?.error}</div>
          ) : (
            <Contests contests={contests} />
          )
        ) : isError ? (
          <div className="flex justify-center h-fit w-full p-4">
            <Error message={"An error occured while fetching Contests"} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        className={`${
          selectedContest != null ? "flex" : "hidden"
        } flex-col col-span-1`}
      >
        <div className="lg:hidden">
          <Modal
            isOpen={modalOpen}
            onClose={() => dispatch(setSelectedContest({ id: null }))}
          >
            <ContestDetail
              id={selectedContest!}
              setSelectedContest={setSelectedContest}
            />
          </Modal>
          <div className="bg-primarybg rounded-lg p-4"></div>
        </div>
        <div className="hidden  lg:flex sticky top-0">
          {selectedContest && (
            <ContestDetail
              id={selectedContest}
              setSelectedContest={setSelectedContest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Journey;
