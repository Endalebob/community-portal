import React, { useEffect } from "react";
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
export function areAllSubStepsTrue(step: any): boolean {
  return step.subSteps.every((subStep: any) => subStep.isCompleted);
}

const Stepper: React.FC<StepperProps> = ({ steps, setActiveStep }) => {
  useEffect(() => {
    for (let index = 0; index < steps.length; index++) {
      const curStep = steps[index];

      if (
        !areAllSubStepsTrue(curStep) &&
        (index === 0 || areAllSubStepsTrue(steps[index - 1]))
      ) {
        setActiveStep(index);
      }
    }
  }, []);
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
                  areAllSubStepsTrue(step) ||
                  (!areAllSubStepsTrue(step) &&
                    (index === 0 || areAllSubStepsTrue(steps[index - 1])))
                    ? true
                    : false
                }
              />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-2 hyphens-auto">
              <div className="mt-1">
                <CheckBox
                  stepper
                  isCompleted={areAllSubStepsTrue(step)}
                  active={
                    !areAllSubStepsTrue(step) &&
                    (index === 0 || areAllSubStepsTrue(steps[index - 1]))
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
