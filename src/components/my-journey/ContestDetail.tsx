import React, { useEffect, useState } from "react";
import ContestDetailTimer from "./contestDetailTimer";
import Button from "../common/Button";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { SelectedContest } from "<@>/store/contest/contest-slice";
import { useAppDispatch } from "<@>/store/hooks";
import Error from "../common/Error";
import { useGetContestQuery } from "<@>/store/contest/contest-api";
import IsContestDetailLoading from "./IsContestDetailLoading";

interface ContestDetailProps {
  id: string;
  setSelectedContest: ActionCreatorWithPayload<
    SelectedContest,
    "selectedContest/setSelectedContest"
  >;
  isModalVisible?: boolean;
}
const ContestDetail: React.FC<ContestDetailProps> = ({
  id,
  setSelectedContest,
  isModalVisible,
}) => {
  const {
    currentData: response,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
  } = useGetContestQuery(id);
  const dispatch = useAppDispatch();
  const contest = response?.value;
  const contestTime = new Date(contest?.date);

  const openContest = () => {
    window.open(contest.link, "_blank");
  };
  return (
    <div className="flex flex-col items-start w-full max-w-sm px-4 py-1 gap-8">
      <div className="flex mt-1 w-full justify-between items-start  p-1 gap-6">
        {isFetching && !response ? (
          <div className="w-36 rounded-sm h-4 bg-slate-200"></div>
        ) : isSuccess ? (
          <div className="flex items-start">
            <p className="font-medium  text-xl">{contest.title}</p>
          </div>
        ) : (
          ""
        )}

        {!isModalVisible && (
          <AiOutlineClose
            onClick={() => dispatch(setSelectedContest({ id: null }))}
            className="rounded-full shrink-0 mt-1 hover:bg-secondary  p-1 w-7 h-7 border"
          />
        )}
      </div>

      {isFetching && !response ? (
        <IsContestDetailLoading />
      ) : isSuccess ? (
        response?.error ? (
          <Error message={"An error occurred while fetching contests"} />
        ) : (
          <>
            <div className="w-full flex flex-col gap-6">
              <div className="flex justify-center">
                {contestTime > new Date() ? (
                  <ContestDetailTimer date={contestTime} />
                ) : (
                  <p className="">
                    {contestTime.toLocaleDateString()}{" "}
                    {contestTime
                      .toLocaleTimeString()
                      .split(":")
                      .slice(0, 2)
                      .join(":") +
                      " " +
                      contestTime.toLocaleTimeString().slice(-2)}
                  </p>
                )}
              </div>

              <p>{contest.description}</p>
            </div>

            <div className="flex w-full justify-end">
              <Button
                onClick={openContest}
                label="Open Contest"
                startIcon={<BiLinkExternal />}
              />
            </div>
          </>
        )
      ) : isError ? (
        <div>
          <Error message={"An error occurred while fetching contests"} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContestDetail;
