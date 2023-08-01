import React, { useState } from "react";
import Stepper, { areAllSubStepsTrue } from "./Stepper";
import Task from "./Task";
import Contests from "./Contests";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "<@>/store";
import { setSelectedContest } from "<@>/store/contest/contest-slice";
import Modal from "../common/Modal";
import ContestDetail from "./ContestDetail";
import { useWindowWidth } from "../common/WindowWidth";
import { useGetStepsQuery } from "<@>/store/journey/journey-api";
import { SubSteps } from "<@>/types/Journey/SubSteps";
import Error from "../common/Error";
import { setApplicationStatus } from "<@>/store/journey/journey-slice";
import IsStepLoading from "./IsStepLoading";

const Journey: React.FC = () => {
  const [isActiveStep, setIsActiveStep] = useState(0);
  const dispatch = useDispatch();
  const selectedContest = useSelector(
    (state: RootState) => state.selectedContest.id
  );

  const windowWidth = useWindowWidth();
  const largeScreen = 1024;
  const modalOpen = windowWidth! < largeScreen && selectedContest !== null;
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStepsQuery({});

  const stepsError = error as any;
  const steps = response?.value;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
      <div
        className={`${
          selectedContest !== null ? `lg:col-span-2` : `lg:col-span-3`
        } col-span-4 flex flex-col lg:border-r p-4 pt-8 lg:min-h-screen`}
      >
        {isLoading ? (
          <IsStepLoading />
        ) : isSuccess ? (
          <>
            <div className="flex flex-col p-2">
              <Stepper steps={steps} setActiveStep={setIsActiveStep} />
            </div>

            <div className="flex flex-col p-4 mt-4">
              <p className="font-semibold text-lg ">
                {steps[isActiveStep].stepName}
              </p>
              <div className="flex flex-col p-4 gap-4">
                {steps[isActiveStep]?.subSteps.map(
                  (subStep: SubSteps, index: number) => {
                    const isStepInprogress =
                      !areAllSubStepsTrue(steps[isActiveStep]) &&
                      (isActiveStep === 0 ||
                        areAllSubStepsTrue(steps[isActiveStep - 1]));

                    const active =
                      !subStep.isCompleted &&
                      (index === 0 ||
                        steps[isActiveStep].subSteps[index - 1].isCompleted) &&
                      isStepInprogress;
                    if (
                      active &&
                      subStep.subStepName === "Apply to the program"
                    ) {
                      dispatch(
                        setApplicationStatus({ readyForApplication: true })
                      );
                    }
                    return (
                      <Task
                        key={index}
                        isCompleted={subStep.isCompleted}
                        title={subStep.subStepName}
                        description={subStep.description}
                        action={
                          subStep.subStepName === "Apply to the program"
                            ? "Apply"
                            : ""
                        }
                        path={
                          subStep.subStepName === "Apply to the program"
                            ? "/apply"
                            : ""
                        }
                        active={active}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </>
        ) : isError ? (
          <>
            {error &&
              stepsError.data?.error?.map((err: any, index: number) => {
                return <Error message={err.errorMessage} />;
              })}{" "}
            {error && !stepsError.data && <Error message="Unknown Error" />}
          </>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`col-span-2 lg:col-span-1 flex ${
          modalOpen || selectedContest === null ? "" : "border-r px-3"
        }`}
      >
        <Contests />
      </div>

      <div
        className={`${
          selectedContest !== null ? "flex" : "hidden"
        } flex-col col-span-1`}
      >
        <div className="">
          {modalOpen && (
            <Modal onClose={() => dispatch(setSelectedContest({ id: null }))}>
              <ContestDetail
                id={selectedContest!}
                setSelectedContest={setSelectedContest}
                isModalVisible
              />
            </Modal>
          )}

          <div className="bg-primarybg rounded-lg p-4"></div>
        </div>
        <div className="hidden  lg:flex sticky top-0">
          {selectedContest !== null && (
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
