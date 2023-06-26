import React from "react";
import ContestCard from "./ContestCard";
import { Contest } from "<@>/types/Journey/Contest";
import { setSelectedContest } from "<@>/store/contest/contest-slice";
import { RootState } from "<@>/store";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import ContestDetail from "./ContestDetail";
import Error from "../common/Error";
import {
  useGetRecentContestsQuery,
  useGetUpcomingContestsQuery,
} from "<@>/store/contest/contest-api";

const Contests: React.FC = () => {
  const upcomingContestResponse = useGetUpcomingContestsQuery({});
  const recentContestResponse = useGetRecentContestsQuery({});
  return (
    <div className="flex flex-col p-4 gap-3 w-full min-w-sm">
      <div className="flex flex-col w-full gap-2">
        <p className="font-bold text-xl">Upcoming Contests</p>
        {upcomingContestResponse.isLoading ? (
          <div className="animate-pulse w-full flex flex-col p-4 gap-2">
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
          </div>
        ) : upcomingContestResponse.isSuccess ? (
          upcomingContestResponse.currentData?.error ? (
            <div>{upcomingContestResponse.currentData?.error}</div>
          ) : upcomingContestResponse.currentData.value.length == 0 ? (
            <div className="p-2">No Upcoming Contests</div>
          ) : (
            upcomingContestResponse.currentData.value.map(
              (contest: Contest, index: number) => {
                return (
                  <ContestCard
                    key={index}
                    id={contest.id}
                    title={contest.title}
                    date={contest.date}
                  />
                );
              }
            )
          )
        ) : upcomingContestResponse.isError ? (
          <div className="flex justify-center h-fit w-full p-4">
            <Error message={"An error occured while fetching Contests"} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-bold text-xl">Recent Contests</p>
        {recentContestResponse.isLoading ? (
          <div className="animate-pulse w-full flex flex-col p-4 gap-2">
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
            <div className="w-full rounded-md  h-20 bg-slate-200"></div>
          </div>
        ) : recentContestResponse.isSuccess ? (
          recentContestResponse.currentData?.error ? (
            <div>{recentContestResponse.currentData?.error}</div>
          ) : recentContestResponse.currentData.value.length == 0 ? (
            <div className="p-2">No Recent Contests</div>
          ) : (
            recentContestResponse.currentData.value.map(
              (contest: Contest, index: number) => {
                return (
                  <ContestCard
                    key={index}
                    id={contest.id}
                    title={contest.title}
                    date={contest.date}
                  />
                );
              }
            )
          )
        ) : recentContestResponse.isError ? (
          <div className="flex justify-center h-fit w-full p-4">
            <Error message={"An error occured while fetching Contests"} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Contests;
