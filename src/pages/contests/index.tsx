import React, { useEffect, useState } from "react";
import {
  useGetContestsQuery,
  useDeleteContestMutation,
} from "<@>/store/contest/contest-api";
import { useRouter } from "next/router";

const ContestList: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const { data: contests = [], error, isLoading } = useGetContestsQuery({});
  const [deleteContest, response] = useDeleteContestMutation();
  const [updatesContests, setUpdatedContests] = useState([]);

  const handleDelete = async (id: any) => {
    await deleteContest(id);
    setUpdatedContests((prevContests: any) =>
      prevContests.filter((contest: any) => contest.id !== id)
    );
    console.log(contests);
  };
  if (isLoading) {
    return <div>Loading contests...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error occurred while fetching contests.</div>;
  }

  console.log(contests.value);
  console.log("the length is", contests.value.length);
  const trial = contests.value;
  // setUpdatedContests(trial);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-12">
        <div className="first:flex items-center justify-end pb-4">
          <label htmlFor="table-search" className="first:sr-only">
            Search
          </label>
          <div className="first:relative">
            <div className="first:absolute right-58 pt-2.5 flex items-center pl-3 pointer-events-none">
              <svg
                className="first:w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="first:block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                Link
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {trial.map((contest: any, index: any) => (
              <tr
                key={index}
                className={`border-b dark:bg-gray-900 dark:border-gray-700 py-8 ${
                  index % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <th
                  scope="row"
                  className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {contest.title}
                </th>
                <td className="px-6 py-4">{contest.date.split("T")[0]}</td>
                <td className="px-6 py-4">{contest.date.split("T")[1]}</td>
                <td className="px-6 py-4">{contest.link}</td>
                <td className="flex flex-row py-4">
                  <div>
                    <a
                      href={`/contests/${contest.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-4"
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestList;
