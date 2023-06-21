import React, { useState } from "react";
import { useGetContestsQuery } from "<@>/store/contest/contest-api";

const contest = [
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
  {
    id: 1,
    title: "contest1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, perspiciatis.",
    date: "12/04/2023",
    time: "02:00",
    link: "htttp://contest",
  },
];

const ContestList = () => {
  const [theme, setTheme] = useState("light");
  const { data: contests = [], error, isLoading } = useGetContestsQuery({});
  const classname = "bg-gray-50";
  if (isLoading) {
    return <div>Loading contests...</div>;
  }

  // if (error) {
  //   return <div>Error occurred while fetching contests.</div>;
  // }
  // console.log(contests.value);
  // console.log("the lengh is", contests.value.length);
  // const trial = contests.value;

  return (
    <div>
      {/* {contests.length === 0 && <p>No contests found.</p>} */}

      {/* <ul>
        {trial.map((contest: any) => (
          <li key={contest.id}>
            <h2>{contest.title}</h2>
            <p>{contest.description}</p>
            <p>Date: {contest.date}</p>
            <p>Link: {contest.link}</p>
          </li>
        ))}
      </ul> */}
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
            {contest.map((contes, index) => (
              <tr
                className={`border-b dark:bg-gray-900 dark:border-gray-700 py-8 ${
                  index % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <th
                  scope="row"
                  className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {contes.title}
                </th>
                <td className="px-6 py-4">{contes.date}</td>
                <td className="px-6 py-4">{contes.time}</td>
                <td className="px-6 py-4">{contes.link}</td>
                <td>
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-4"
                  >
                    Edit
                  </a>

                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline px-4"
                  >
                    Remove
                  </a>
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
