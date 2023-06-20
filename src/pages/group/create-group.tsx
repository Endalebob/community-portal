import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateGroupMutation } from '<@>/store/group/group-api';

const initialState = {
  groupName: "",
  groupSize: "",
  divisionLevel: "",
}

const CreateGroup: React.FC = () => {
  const [group, setGroup] = useState(initialState);
  const [createData, {isLoading, error}] = useCreateGroupMutation();
  const [errors, setErrors] = useState(initialState);

  const router = useRouter();
  const handleCancel = () => {
    router.push("/")
  };
  const handleChange = (event: any) => {
    const {name, value} = event.target;
    setGroup((prevErrors) => ({
      ...prevErrors,
      [name]:value
    }));
  };
  

  const handleSubmit = async(event:React.FormEvent) => {
    event.preventDefault();
    const {groupName, groupSize, divisionLevel} = group;

    if (!groupName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        groupName: "group name is required"
      }));
      return;
    }
  
    if (!groupSize) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        groupSize: "group size is required"
      }))
      return;
    }
  
    if (!divisionLevel) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        divisionLevel:"division level is required"
      }));
      return;

  }

  try {
    await createData({
      groupName,
      groupSize,
      divisionLevel,
    }).unwrap();
    setGroup(initialState)
    setErrors(initialState)
    console.log('success')
    // console.log(response.data.data)
  } catch (errors){
    console.error("Failed to create Group")
  }
  
  };

return (
  <div className="container w-full md:w-3/4 lg:w-1/2 mx-auto mt-8 h-full p-8 sm:p-12 md:p-16 lg:p-24 lg:py-16">
  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-secondary-text font-bold items-center text-primary py-12 text-gray-700 w-full h-full lg:mb-16">
      Create New Group
    </h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="group-name" className="block font-semibold text-gray-900 mb-2 text-base md:text-lg">
          Group Name
        </label>
        <input
          name='groupName'
          type="text"
          value={group.groupName}
          onChange={handleChange}
          className="appearance-none w-full p-3 border rounded leading-tight focus:border-black focus:shadow-outline"
          placeholder="Enter group name"
          required
        />
    {errors.groupName && <p className='text-red-500'> {errors.groupName}</p>}
      </div>
      <div className="mb-4 grid">
        <label htmlFor="group-size" className="block font-semibold text-gray-900 mb-2 text-base md:text-lg pt-8">
          Group Size
        </label>
        <input
          id="group-size"
          name = "groupSize"
          type="number"
          value={group.groupSize}
          onChange={handleChange}
          className="appearance-none w-1/2 p-2 border rounded leading-tight focus:border-black focus:shadow-outline"
          placeholder="Enter group size"
          required
        />
      {errors.groupSize && <p className='text-red-500'> {errors.groupSize}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="division-level" className="block font-semibold text-gray-900 text-base md:text-lg mb-2 pt-8">
        Select Division
      </label>
      <select
        id="division-level"
        name = "divisionLevel"
        value={group.divisionLevel}
        onChange={handleChange}
        className="appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:border-black focus:shadow-outline"
        required
      >
        <option value="" className='text-sm sm:text-base md:text-lg'>-select-</option>
        <option value="div1" className='text-sm sm:text-base md:text-lg'>Div 1</option>
        <option value="div2" className='text-sm sm:text-base md:text-lg'>Div 2</option>
        <option value="div3" className='text-sm sm:text-base md:text-lg'>Div 3</option>
      </select>
      {errors.divisionLevel && <p className = 'text-red-500'> {errors.divisionLevel}</p>}
    </div>
      <div className="flex justify-end py-12" >
      <button className="mr-4 pt-4 text-xl justify-self-end" onClick={handleCancel}>Cancel</button>
        <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
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