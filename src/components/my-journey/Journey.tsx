import React, { useState } from "react";
import Stepper from "./Stepper";
import Task from "./Task";
import Contests from "./Contests";
import ContestDetail from "./ContestDetail";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../common/Modal";

const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedContest, setSelectedContest] = useState<
    number | string | null
  >();
  const contests = [
    {
      id: "1",
      description: "OnBoarding Contest #2 Div-1 ",
      date: "Jun 14, 2023",
    },
    {
      id: "1",
      description: "OnBoarding Contest #2 Div-1 ",
      date: "Jun 17, 2023",
    },
    {
      id: "1",
      description: "OnBoarding Contest #2 Div-1 ",
      date: "Jun 13, 2023",
    },
  ];
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
    <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t">
      <div
        className={`${
          selectedContest != null ? `md:col-span-2` : `md:col-span-3`
        } col-span-4 flex flex-col md:border-r p-4 pt-8`}
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

      <div className="col-span-2 md:col-span-1 flex px-3 border-r">
        <Contests setSelectedContest={setSelectedContest} contests={contests} />
      </div>

      <div
        className={`${
          selectedContest != null ? "flex" : "hidden"
        } flex-col col-span-1`}
      >
        <div className="md:hidden">
          <Modal
            isOpen={selectedContest != null}
            onClose={() => setSelectedContest(null)}
          >
            <ContestDetail
              id={selectedContest!}
              setSelectedContest={setSelectedContest}
            />
          </Modal>
          <div className="bg-primarybg rounded-lg p-4"></div>
        </div>
        <div className="hidden  md:flex sticky top-0">
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
