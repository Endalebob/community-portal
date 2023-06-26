import React, { useEffect, useState } from "react";
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

const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
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
          selectedContest != null ? `lg:col-span-2` : `lg:col-span-3`
        } col-span-4 flex flex-col lg:border-r p-4 pt-8 lg:min-h-screen`}
      >
        {isLoading ? (
          <div className="animate-pulse w-full">
            <div className="flex flex-col p-2 w-full gap-8">
              <div className="grid grid-cols-4 justify-items-start w-full max-w-[68rem] gap-2  text-xs md:text-sm lg:text-base">
                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-3 bg-slate-200 rounded-md"></div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                    <div className="w-[60%] h-3 bg-slate-200 rounded-md"></div>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-3 bg-slate-200 rounded-md"></div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                    <div className="w-[60%] h-3 bg-slate-200 rounded-md"></div>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-3 bg-slate-200 rounded-md"></div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                    <div className="w-[60%] h-3 bg-slate-200 rounded-md"></div>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-3 bg-slate-200 rounded-md"></div>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                    <div className="w-[60%] h-3 bg-slate-200 rounded-md"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-4 mt-4">
                <div className="max-w-sm h-3 bg-slate-200 rounded-sm"></div>

                <div className="flex flex-col p-4 gap-4">
                  <div className="flex p-2 rounded-md max-w-[44rem] h-fit">
                    <div className="flex items-start m-4">
                      <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    </div>

                    <div className="flex flex-col gap-3 p-2 w-full">
                      <div className="w-[30%] h-3 bg-slate-200 rounded-sm"></div>
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-3 bg-slate-200 rounded-sm"></div>
                        <div className="w-[90%] h-3 bg-slate-200 rounded-sm"></div>
                        <div className="w-full h-3 bg-slate-200 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-2 rounded-md max-w-[44rem] h-fit">
                    <div className="flex items-start m-4">
                      <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    </div>

                    <div className="flex flex-col gap-3 p-2 w-full">
                      <div className="w-[30%] h-3 bg-slate-200 rounded-sm"></div>
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-3 bg-slate-200 rounded-sm"></div>
                        <div className="w-[90%] h-3 bg-slate-200 rounded-sm"></div>
                        <div className="w-full h-3 bg-slate-200 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-2 rounded-md max-w-[44rem] h-fit">
                    <div className="flex items-start m-4">
                      <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    </div>

                    <div className="flex flex-col gap-3 p-2 w-full">
                      <div className="w-[30%] h-3 bg-slate-200 rounded-sm"></div>
                      <div className="flex flex-col gap-1">
                        <div className="w-full h-3 bg-slate-200 rounded-sm"></div>
                        <div className="w-[90%] h-3 bg-slate-200 rounded-sm"></div>
                        <div className="w-full h-3 bg-slate-200 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isSuccess ? (
          <>
            <div className="flex flex-col p-2">
              <Stepper steps={steps} setActiveStep={setActiveStep} />
            </div>

            <div className="flex flex-col p-4 mt-4">
              <p className="font-semibold text-lg ">
                {steps[activeStep].stepName}
              </p>
              <div className="flex flex-col p-4 gap-4">
                {steps[activeStep]?.subSteps.map(
                  (subStep: SubSteps, index: number) => {
                    const stepInprogress =
                      !areAllSubStepsTrue(steps[activeStep]) &&
                      (activeStep === 0 ||
                        areAllSubStepsTrue(steps[activeStep - 1]));
                    return (
                      <Task
                        key={index}
                        isCompleted={subStep.constraintSpecification === "true"}
                        title={subStep.subStepName}
                        description={subStep.description}
                        active={
                          !(subStep.constraintSpecification === "true") &&
                          (index === 0 ||
                            steps[activeStep].subSteps[index - 1]
                              .constraintSpecification === "true") &&
                          stepInprogress
                        }
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
          selectedContest != null ? "flex" : "hidden"
        } flex-col col-span-1`}
      >
        <div className="">
          {modalOpen && (
            <Modal onClose={() => dispatch(setSelectedContest({ id: null }))}>
              <ContestDetail
                id={selectedContest!}
                setSelectedContest={setSelectedContest}
                modal
              />
            </Modal>
          )}

          <div className="bg-primarybg rounded-lg p-4"></div>
        </div>
        <div className="hidden  lg:flex sticky top-0">
          {selectedContest != null && (
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
