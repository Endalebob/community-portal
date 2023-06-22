import React, { useState, useEffect } from "react";
import {
  useGetContestQuery,
  useUpdateContestMutation,
} from "<@>/store/contest/contest-api";
import { useRouter } from "next/router";
import Contest from "<@>/types/contest";
import ProgressIndicator from "<@>/components/auth/ProgressIndicator";

const initialState = {
  id: "",
  title: "",
  description: "",
  date: "",
  time: "",
  link: "",
};

const EditContestForm: React.FC = () => {
  const [updateContest, { isLoading: isUpdating }] = useUpdateContestMutation();
  const router = useRouter();
  const { id } = router.query;
  const {
    data: response = [],
    isError,
    isLoading,
  } = useGetContestQuery(id as string);

  const [contest, setContest] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  useEffect(() => {
    if (response.value) {
      const curr = response.value;
      console.log(curr.date.split("T")[1].slice(0, 5));
      const currContest = {
        id: id as string,
        title: curr.title,
        description: curr.description,
        date: curr.date.split("T")[0],
        time: curr.date.split("T")[1].slice(0, 5),
        link: curr.link,
      };
      setContest(currContest);
    }
  }, [response.value, id]);

  const handleCancel = () => {
    router.push("/contests");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContest((prevContest) => ({
      ...prevContest,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    const { id, title, description, time, date, link } = contest;
    const dateTime = `${date}T${time}:00Z`;
    const updatedContest: Partial<Contest> = {
      id,
      title,
      description,
      date: dateTime,
      link,
    };

    if (!title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required",
      }));
      return;
    }

    if (!description) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
      return;
    }

    if (!date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Date is required",
      }));
      return;
    }

    if (!time) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        time: "Time is required",
      }));
      return;
    }

    if (!link) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        link: "Link is required",
      }));
      return;
    }

    try {
      await updateContest(updatedContest).unwrap();
      // Contest update successful, redirect to contest details
      router.push(`/contests`);
    } catch (error) {
      alert(`An error occurred while updating the contest:, ${error}`);
    }
  };
  if (isLoading) {
    return (
      <div className="rounded-md p-4 w-3/4 mt-28 mx-auto">
        <div className="animate-pulse flex">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="pl-12 pr-12">
                <div className="h-6 bg-slate-100 rounded mt-8"></div>
                <div className="h-16 bg-slate-100 rounded mt-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="h-6 bg-slate-100 rounded mt-8 col-span-1"></div>
                  <div className="h-6 bg-slate-100 rounded mt-8 col-span-1"></div>
                </div>
                <div className="h-6 bg-slate-100 rounded mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-8 h-full">
      <div>
        <h1 className="pt-4 pb-8 text-2xl text-secondary-text font-semibold">
          Edit Contest
        </h1>
      </div>
      <div className="mb-8">
        <label htmlFor="title" className="block mb-2 font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={contest.title || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="block mb-2 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={contest.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="mb-8 col-span-1">
          <label htmlFor="date" className="block mb-2 font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={contest.date || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="6/8/2023"
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>
        <div className="mb-8 col-span-1">
          <label htmlFor="time" className="block mb-2 font-semibold">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={contest.time || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="08:00"
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="link" className="block mb-2 font-semibold">
          Link
        </label>
        <input
          type="text"
          id="link"
          name="link"
          value={contest.link || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
        {errors.link && <p className="text-red-500">{errors.link}</p>}
      </div>
      <div>
        <div className="border h-0 mt-12 mb-4"></div>
      </div>
      <div className="grid justify-items-end">
        <div>
          <button
            className="font-semibold mr-4 py-2 text-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
          >
            {isUpdating ? (
              <ProgressIndicator size={5} color="white" />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditContestForm;
