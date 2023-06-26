import React, { useState } from "react";
import { useCreateContestMutation } from "<@>/store/contest/contest-api";
import { useRouter } from "next/router";
import ProgressIndicator from "../common/ProgressIndicator";

const initialState = {
  GymId: "",
  title: "",
  description: "",
  date: "",
  time: "",
  link: "",
};

const ContestForm: React.FC = () => {
  const [contest, setContest] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [createContest, { isLoading }] = useCreateContestMutation();
  const [backEndError, setBackendError] = useState("");
  const router = useRouter();
  const handleCancel = () => {
    // Todo
    router.push("/contests");
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "date") {
      // If the target input is the date input, update the state directly
      setContest((prevContest) => ({
        ...prevContest,
        date: value,
      }));
    } else {
      // For other inputs, update the state as before
      setContest((prevContest) => ({
        ...prevContest,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { GymId, title, description, date, time, link } = contest;

    if (!title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "title is required",
      }));
      return;
    }

    if (!GymId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        GymId: "Gym Id is required",
      }));
      return;
    }

    if (!description) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "description is required",
      }));
      return;
    }

    if (!date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "date is required",
      }));
      return;
    }

    if (!time) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        time: "time is required",
      }));
      return;
    }

    if (!link) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        link: "link is required",
      }));
      return;
    }
    const dateTime = `${date}T${time}:00Z`;
    try {
      await createContest({
        GymId,
        title,
        description,
        date: dateTime,
        link,
      }).unwrap();
      // Contest creation successful, reset form fields
      router.push("/contests");
    } catch (error: any) {
      // Handle contest creation error
      setBackendError(`An error occurred : ${error.data.title}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-8 h-full">
      <div>
        <h1 className="pt-4 pb-8 text-2xl text-secondary-text font-semibold">
          Create Contest
        </h1>
      </div>
      {backEndError && <p className="text-red-500">{backEndError}</p>}
      <div className="mb-8">
        <label htmlFor="title" className="block mb-2 font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={contest.title}
          onChange={handleChange}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>
      <div className="mb-8">
        <label htmlFor="GymId" className="block mb-2 font-semibold">
          GymId
        </label>
        <input
          type="number"
          id="GymId"
          name="GymId"
          value={contest.GymId}
          onChange={handleChange}
          placeholder="0"
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
        {errors.GymId && <p className="text-red-500">{errors.GymId}</p>}
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="block mb-2 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={contest.description}
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
            value={contest.date}
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
            value={contest.time}
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
          value={contest.link}
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
            disabled={isLoading}
            className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
          >
            {isLoading ? (
              <ProgressIndicator size={5} color="white" />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContestForm;
