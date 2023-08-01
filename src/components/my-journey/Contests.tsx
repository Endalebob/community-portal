import React from "react";
import ContestCard from "./ContestCard";
import { Contest } from "<@>/types/Journey/Contest";
import Error from "../common/Error";
import {
  useGetRecentContestsQuery,
  useGetUpcomingContestsQuery,
} from "<@>/store/contest/contest-api";
import IsRecentContestLoading from "./IsRecentContestLoading";
import IsUpcomingContestLoading from "./IsUpcomingContestLoading";

const Contests: React.FC = () => {
  const upcomingContestResponse = useGetUpcomingContestsQuery({});
  const recentContestResponse = useGetRecentContestsQuery({});
  return (
    <div className="flex flex-col p-4 gap-3 w-full min-w-sm">
      <div className="flex flex-col w-full gap-2">
        <p className="font-bold text-xl">Upcoming Contests</p>
        {upcomingContestResponse.isLoading ? (
          <IsUpcomingContestLoading />
        ) : upcomingContestResponse.isSuccess ? (
          upcomingContestResponse.currentData?.error ? (
            <div>{upcomingContestResponse.currentData?.error}</div>
          ) : upcomingContestResponse.currentData.value.length === 0 ? (
            <div className="p-2">No upcoming contests</div>
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
            <Error message={"An error occurred while fetching contests"} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-bold text-xl">Recent Contests</p>
        {recentContestResponse.isLoading ? (
          <IsRecentContestLoading />
        ) : recentContestResponse.isSuccess ? (
          recentContestResponse.currentData?.error ? (
            <div>{recentContestResponse.currentData?.error}</div>
          ) : recentContestResponse.currentData.value.length === 0 ? (
            <div className="p-2">No recent contests</div>
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
