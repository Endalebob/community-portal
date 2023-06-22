import React, { useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";

const CreateAnnouncement: React.FC = () => {
  const [formValue, setFormValue] = useState({ title: "", announcement: "" });
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <p className="font-bold text-lg">Create new Announcement</p>
      <p className="text-sm opacity-30">
        Add new announcement to the system and easily get everyone up to speed.
      </p>

      <form className="flex flex-col gap-2">
        <InputField
          label=""
          name="title"
          placeholder="Title"
          type="text"
          value={formValue.title}
          onChange={handleChange}
        />
        <textarea
          name="announcement"
          placeholder="content"
          value={formValue.announcement}
          onChange={handleChange}
          rows={10}
          cols={130}
          className="border rounded-md py-1 px-3 border-gray-300 placeholder-white-400"
        />
        <p className="text-sm opacity-30">Markdown Supported</p>
      </form>

      <div className="flex justify-end gap-2">
        <Button
          className="bg-secondary text-gray-800 font-medium"
          label="Cancel"
        ></Button>
        <Button className="font-medium" label="Create"></Button>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
