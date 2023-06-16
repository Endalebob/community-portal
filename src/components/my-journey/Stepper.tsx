import React from "react";
import CheckBox from "./CheckBox";
import Connector from "./Connector";
import { SubSteps } from "<@>/types/Journey/SubSteps";

interface Step {
  isCompleted: boolean;
  stepName: string;
  subSteps: SubSteps[];
}
interface StepperProps {
  steps: Step[];
  setActiveStep: (step: number) => void;
}
const Stepper: React.FC<StepperProps> = ({ steps, setActiveStep }) => {
  return (
    <div
      className={`justify-items-start flex-grow max-w-[68rem] gap-2  text-xs md:text-sm lg:text-base`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
      }}
    >
      {steps.map((step, index) => {
        return (
          <div
            key={index}
            onClick={() => setActiveStep(index)}
            className="flex justify-start flex-col w-full gap-1 cursor-pointer"
          >
            <div className="w-full flex items-center">
              <Connector
                fill={
                  step.isCompleted ||
                  (!step.isCompleted &&
                    (index === 0 || steps[index - 1].isCompleted))
                    ? true
                    : false
                }
              />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-2 hyphens-auto">
              <div className="mt-1">
                <CheckBox
                  stepper
                  isCompleted={step.isCompleted}
                  active={
                    !step.isCompleted &&
                    (index === 0 || steps[index - 1].isCompleted)
                  }
                />
              </div>

              <p className="font-semibold hyphens-auto">{step.stepName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
