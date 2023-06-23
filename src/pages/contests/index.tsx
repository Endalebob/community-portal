import React, { useEffect, useState } from "react";
import {
  useGetContestsQuery,
  useDeleteContestMutation,
} from "<@>/store/contest/contest-api";
import { useRouter } from "next/router";
import { getCookie } from "<@>/utils/cookie";
import Error from "<@>/components/common/Error";
import OverViewContests from "<@>/components/contest/OverViewContests";

const ContestList: React.FC = () => {
  const { data: contests = [], error, isLoading } = useGetContestsQuery({});
  const [deleteContest, response] = useDeleteContestMutation();
  const router = useRouter();
  const role = getCookie("role");
  console.log(role);
  const handleDelete = async (id: any) => {
    try {
      await deleteContest(id);
    } catch (error) {
      // Handle contest creation error
      alert(`An error occurred while deleteing the contest:$ {error}`);
    }
  };
  if (isLoading) {
    return (
      <div className="rounded-md p-4 w-full mx-auto m-12">
        <div className="animate-pulse flex space-x-4 space-y-8">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="pl-12 pr-12">
                <div className="h-8 bg-slate-100 rounded mt-8"></div>
                <div className="h-8 bg-slate-100 rounded mt-8"></div>
                <div className="h-8 bg-slate-100 rounded mt-8"></div>
                <div className="h-8 bg-slate-100 rounded mt-8"></div>
                <div className="h-8 bg-slate-100 rounded mt-8"></div>
                <div className="h-8 bg-slate-100 rounded mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-3/4 mx-auto mt-16">
        <Error message="Error occurred while fetching contests." />
      </div>
    );
  }

  console.log(contests.value);
  console.log("the length is", contests.value.length);
  const contestData = contests.value;
  return (
    <div>
      <div className="mt-8">
        <h1 className="text-secondary-text font-semibold ml-6 text-lg">
          OverView
        </h1>
        <OverViewContests />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg pl-8 pr-8">
        {role === "HeadOfEducation" && (
          <div className="grid grid-cols-2 mt-8">
            <div>
              <h1 className="text-secondary-text font-semibold ml-6 text-lg col-span-1">
                Contests
              </h1>
            </div>
            <div className="pb-4 col-span-1 justify-self-end">
              <button
                className="px-4 py-1 bg-primary text-white rounded-md justify-self-end"
                onClick={() => router.push("/contests/create-contest")}
              >
                <span className="font-bold">+</span> New Contest
              </button>
            </div>
          </div>
        )}
        {contestData.length === 0 ? (
          <div className="max-auto text-center font-bold mb-4">
            No contests added yet. Check back soon for updates!
          </div>
        ) : (
          <div>
            {role !== "HeadOfEducation" && (
              <h1 className="text-secondary-text font-semibold ml-6 text-lg">
                Contests
              </h1>
            )}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Codeforces
                  </th>
                  {role === "HeadOfEducation" && (
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {contestData.map((contest: any, index: any) => (
                  <tr
                    key={index}
                    className={`border-b dark:bg-gray-900 dark:border-gray-700 py-8 ${
                      index % 2 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td
                      scope="row"
                      className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {contest.title}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {contest.date.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {contest.date.split("T")[1]}
                    </td>
                    <td className="px-6 py-4 font-medium text-primary underline">
                      <a href={contest.link}>Link</a>
                    </td>
                    {role === "HeadOfEducation" && (
                      <td className="flex flex-row py-4">
                        <div>
                          <a
                            href={`/contests/${contest.id}`}
                            className="font-medium text-primary dark:text-primary hover:underline px-4"
                          >
                            Edit
                          </a>
                        </div>

                        <div>
                          <button
                            onClick={() => handleDelete(contest.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline px-4"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestList;
