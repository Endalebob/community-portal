import React, { useState } from "react";
import { useCreateContestMutation } from "<@>/store/contest/contest-api";

const ContestForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");

  const [createContest, { isLoading }] = useCreateContestMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !time || !link) {
      // Handle form validation error
      alert("Please fill in all fields");
      return;
    }

    try {
      const contest = {
        title,
        description,
        date,
        time,
        link,
      };

      await createContest(contest).unwrap();

      // Contest creation successful, reset form fields
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLink("");
    } catch (error) {
      // Handle contest creation error
      alert("An error occurred while creating the contest");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 mx-auto mt-8 my-auto xl:h-full h-80"
    >
      <div>
        <h1 className="pt-4 pb-8 text-2xl text-secondary-text font-semibold">
          Create Contest
        </h1>
      </div>
      <div className="mb-8">
        <label htmlFor="title" className="block mb-2 font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="block mb-2 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="mb-8 col-span-1">
          <label htmlFor="date" className="block mb-2 font-semibold">
            Date
          </label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="6/8/2023"
          />
        </div>
        <div className="mb-8 col-span-1">
          <label htmlFor="time" className="block mb-2 font-semibold">
            Time
          </label>
          <input
            type="text"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="08:00:00"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="link" className="block mb-2 font-semibold">
          Link
        </label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
      </div>
      <div>
        <div className="border h-0 mt-12 mb-4"></div>
      </div>
      <div className="grid justify-items-end">
        <div>
          <button className="font-semibold mr-4 py-2 text-lg">Cancel</button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContestForm;
