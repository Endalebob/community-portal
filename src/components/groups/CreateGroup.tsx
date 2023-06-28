import React from "react";
import { useState } from "react";
import { useCreateGroupMutation } from "<@>/store/groups/groups-api";
import Group from "<@>/types/groups/group-body";

interface CreateGroup{
  handleClose: () => void;
}

const initialState: Group = {
  name: "",
  capacity: 0,
  telegramLink: "",
  divisionId: 1,
};
const initialError = {
  name: "",
  capacity: "",
  telegramLink: "",
  divisionId: "",
};

const CreateGroup: React.FC <CreateGroup> = ({handleClose}) => {
  const [group, setGroup] = useState(initialState);
  const [createData, { isLoading, error }] = useCreateGroupMutation();
  const [errors, setErrors] = useState(initialError);
  const [onCreate, setCreat] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setGroup((prevErrors) => ({
      ...prevErrors,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, capacity, telegramLink, divisionId } = group;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "group name is required",
      }));
      return;
    }

    if (!capacity) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        capacity: "group size is required",
      }));
      return;
    }

    if (!telegramLink) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        telegramLink: "telegram link is required",
      }));
      return;
    }

    if (!divisionId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        divisionId: "division level is required",
      }));
      return;
    }

    try {
      await createData({
        name,
        capacity: capacity as number,
        telegramLink,
        divisionId: divisionId as number,
      }).unwrap();
      setGroup(initialState);
      setErrors(initialError);
    } catch (errors) {
    }
  };

  const handleCreat = () => {
    setCreat(true)
  }

  return (
    <div className="flex flex-col mb-4 items-center w-[100vw] md:w-[80vw] lg:w-[45vw]">
      <h1 className="text-2xl font-semibold">
        Create New Group
      </h1>
      <form className="w-full px-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="group-name"
            className="text-gray-500 mb-2"
          >
            Group Name
          </label>
          <input
            name="name"
            type="text"
            value={group.name}
            onChange={handleChange}
            className="outline-none w-full p-1 border rounded leading-tight focus:border-gray-400"
            placeholder="Enter group name"
            required
          />
          {errors.name && <p className="text-red-500"> {errors.name}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="group-size"
            className="text-gray-600 mb-1"
          >
            Group Size
          </label>
          <input
            id="group-size"
            name="capacity"
            type="number"
            value={group.capacity}
            onChange={handleChange}
            className="outline-none w-full p-1 border rounded leading-tight focus:border-gray-400"
            placeholder="Enter group size"
            required
          />
          {errors.capacity && (
            <p className="text-red-500"> {errors.capacity}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="group-size"
            className="text-gray-500"
          >
            Group Telegram Link
          </label>
          <input
            id="telegram link"
            name="telegramLink"
            type="text"
            value={group.telegramLink}
            onChange={handleChange}
            className="outline-none w-full p-1 border rounded leading-tight focus:border-gray-400"
            placeholder="Enter group telegram link"
            required
          />
          {errors.telegramLink && (
            <p className="text-red-500"> {errors.telegramLink}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="division-level"
            className="text-gray-500 "
          >
            Select Division
          </label>
          <select
            id="division-level"
            name="divisionId"
            value={group.divisionId}
            onChange={handleChange}
            className="outline-none w-full p-1 border rounded leading-tight focus:border-gray-400"
            required
          >
            <option value="" className="text-sm sm:text-base md:text-lg">
              -select-
            </option>
            <option value="1" className="text-sm sm:text-base md:text-lg">
              Div 1
            </option>
            <option value="2" className="text-sm sm:text-base md:text-lg">
              Div 2
            </option>
            <option value="3" className="text-sm sm:text-base md:text-lg">
              Div 3
            </option>
          </select>
          {errors.divisionId && (
            <p className="text-red-500"> {errors.divisionId}</p>
          )}
        </div>
        <div className="flex justify-end items-center py-4">
          <button
            className="mr-4"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
            onClick={handleSubmit}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
