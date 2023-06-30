import React, { ReactNode, useEffect } from "react";
import ContestantsSolvedPerQuestion from "./ContestantsSolvedPerQuestion";
import ContestantsByNumberOfQuestions from "./ContestantsByNumberOfQuestions";
import Button from "<@>/components/common/Button";
import { IoRefresh } from "react-icons/io5";
import {
  useFillContestStatMutation,
  useGetContestQuery,
} from "<@>/store/contest/contest-api";
import ProgressIndicator from "<@>/components/common/ProgressIndicator";
import Error from "<@>/components/common/Error";

interface ContestStatsProps {
  id: string;
}

const dateFormmater = (date: Date): ReactNode => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};
const ContestStats: React.FC<ContestStatsProps> = ({ id }) => {
  const {
    currentData: response,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
  } = useGetContestQuery(id);

  const [
    fillContestStat,
    {
      isLoading: isFillingContestStat,
      isSuccess: isFillingContestStatSuccess,
      isError: isFillingContestStatError,
    },
  ] = useFillContestStatMutation();
  const contestData = response?.value;

  const usersCountForNoQuestionSolved =
    contestData &&
    Object.keys(contestData.usersCountForNoQuestionSolved)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = contestData.usersCountForNoQuestionSolved[key];
        return acc;
      }, {});

  const solversCountForQuestion =
    contestData &&
    Object.keys(contestData.solversCountForQuestion)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = contestData.solversCountForQuestion[key];
        return acc;
      }, {});
  return (
    <div>
      {isLoading ? (
        <div className="w-full animate-pulse p-4">
          <div className="flex w-full justify-between p-4">
            <div className="flex flex-col gap-1">
              <div className="w-56 h-4 rounded-sm bg-slate-200"></div>
              <div className="w-36 h-4 rounded-sm bg-slate-200"></div>
            </div>
            <div className="w-24 h-8 rounded-md bg-slate-200"></div>
          </div>

          <div className="flex flex-col gap-8 p-8 lg:p-16 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
              <div className="flex flex-col justify-start shadow-md rounded-md p-2 w-full gap-8">
                <div className="p-4 w-full">
                  <div className="flex flex-col w-full gap-8">
                    <div className="w-[80%] h-8 rounded-sm bg-slate-200"></div>
                    <div className="w-[43%] h-8 rounded-sm bg-slate-200"></div>
                    <div className="w-[10%] h-8 rounded-sm bg-slate-200"></div>
                    <div className="w-[60%] h-8 rounded-sm bg-slate-200"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-start shadow-md rounded-md p-2 w-full gap-8">
                <div className="p-4 w-full">
                  <div className="pl-16 grid grid-cols-6 gap-8 items-end h-[16rem]">
                    <div className="w-8 h-[90%] rounded-sm bg-slate-200"></div>
                    <div className="w-8 h-[60%] rounded-sm bg-slate-200"></div>
                    <div className="w-8 h-[20%] rounded-sm bg-slate-200"></div>
                    <div className="w-8 h-[8%] rounded-sm bg-slate-200"></div>
                    <div className="w-8 h-[60%] rounded-sm bg-slate-200"></div>
                    <div className="w-8 h-[20%] rounded-sm bg-slate-200"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isSuccess ? (
        <div className="p-4">
          <div className="flex justify-between items-start p-4">
            <div className="">
              <p className="text-lg opacity-80 font-semibold">
                {contestData.title}
              </p>
              <p className="opacity-50">
                {dateFormmater(new Date(contestData.date))}
              </p>
            </div>
            <Button
              onClick={() => {
                !isFillingContestStat && fillContestStat(id);
              }}
              className="bg-primary text-secondary shadow-sm"
              startIcon={
                isFillingContestStat ? (
                  <ProgressIndicator size={5} />
                ) : (
                  <IoRefresh />
                )
              }
              label={` ${
                isFillingContestStat
                  ? ""
                  : isFillingContestStatError
                  ? "Retry"
                  : "Refresh"
              }`}
            />
          </div>
          <div className="flex flex-col gap-8 p-8 lg:p-16 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
              <div className="flex flex-col justify-start shadow-md rounded-md p-2">
                <p className="opacity-80 p-4 max-w-xs">
                  Number of participants who solved each question
                </p>
                <div className="p-4">
                  <ContestantsSolvedPerQuestion
                    questions={Object.keys(solversCountForQuestion)}
                    numberOfParticipants={Object.values(
                      solversCountForQuestion
                    )}
                    totalParticipants={contestData.totalContestants}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-start shadow-md rounded-md p-2">
                <p className="opacity-80 p-4 max-w-xs">
                  Distribution of participants by number of questions solved
                </p>
                <div className="p-4">
                  <ContestantsByNumberOfQuestions
                    numberOfQuestions={Object.keys(
                      usersCountForNoQuestionSolved
                    )}
                    numberOfParticipants={Object.values(
                      usersCountForNoQuestionSolved
                    )}
                    totalParticipants={contestData.totalContestants}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col w-[24rem] shadow-md justify-center items-center gap-4 p-2 max-w-[16rem] text-center rounded-md">
                <p className="max-w-[16rem]">
                  Average number of questions solved by a participant{" "}
                </p>
                <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#EBF8FF]">
                  <p>{contestData.meanQuestionSolved}</p>
                </div>
              </div>
              <div className="flex flex-col w-[24rem] shadow-md justify-center items-center gap-4 p-2 max-w-[16rem] text-center rounded-md">
                <p className="max-w-[16rem]">Total number of Participants </p>
                <div className="flex items-center justify-center rounded-full w-16 h-16 bg-[#EBF8FF]">
                  <p>{contestData.totalContestants}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Error message="Error occurred while fetching" />{" "}
        </div>
      )}
    </div>
  );
};

export default ContestStats;
