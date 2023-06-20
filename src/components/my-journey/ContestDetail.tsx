import React, { useEffect, useState } from "react";
import ContestDetailTimer from "./contestDetailTimer";
import Button from "../common/Button";
import { BiLinkExternal } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useGetContestQuery } from "<@>/store/journey/contest-api";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { SelectedContest } from "<@>/store/journey/contest-slice";
import { useAppDispatch } from "<@>/store/hooks";
import Error from "../common/Error";
import PopUpError from "../common/PopUpError";

interface ContestDetailProps {
  id: string | number;
  setSelectedContest: ActionCreatorWithPayload<
    SelectedContest,
    "selectedContest/setSelectedContest"
  >;
}
const ContestDetail: React.FC<ContestDetailProps> = ({
  id,
  setSelectedContest,
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

  return (
    <div className="flex flex-col items-start w-full max-w-sm p-4 gap-8">
      <div
        onClick={() => dispatch(setSelectedContest({ id: null }))}
        className="flex mt-1 w-full justify-between items-start  p-1 transition-opacity gap-6"
      >
        {isFetching && !response ? (
          <div className="w-36 rounded-sm h-4 bg-slate-200"></div>
        ) : isSuccess ? (
          <div className="flex items-start">
            <p className="font-medium  text-xl">{contest.title}</p>
          </div>
        ) : (
          ""
        )}

        <AiOutlineClose className="rounded-full shrink-0 mt-1 hover:bg-secondary  p-1 w-7 h-7 border" />
      </div>

      {isFetching && !response ? (
        <div className="animate-pulse flex flex-col gap-6">
          <div className="w-36 my-4 mx-auto rounded-md  h-16 bg-slate-200"></div>

          <div className="flex flex-col gap-2">
            <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
            <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
            <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
            <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
          </div>
        </div>
      ) : isSuccess ? (
        response?.error ? (
          <Error message={"An error occured while fetching Contests"} />
        ) : (
          <>
            <div className="w-full flex flex-col gap-6">
              <div className="flex justify-center">
                <ContestDetailTimer date={new Date(contest.date)} />
              </div>

              <p>{contest.description}</p>
            </div>

            <div className="flex w-full justify-end">
              <Button label="Open Contest" startIcon={<BiLinkExternal />} />
            </div>
          </>
        )
      ) : isError ? (
        <div>
          <Error message={"An error occured while fetching Contests"} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ContestDetail;
