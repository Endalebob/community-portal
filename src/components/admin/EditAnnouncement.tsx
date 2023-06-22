import React, { useState } from "react";
import Button from "../common/Button";
import InputField from "../auth/InputField";

interface EditAnnouncementProps {
  onClose: () => void;
}
const EditAnnouncement: React.FC<EditAnnouncementProps> = ({ onClose }) => {
  const [formValue, setFormValue] = useState({ title: "", announcement: "" });
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <p className="font-bold text-lg">Edit Announcement</p>

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
          onClick={onClose}
          className="bg-secondary text-gray-800 font-medium"
          label="Cancel"
        ></Button>
        <Button
          onClick={onClose}
          className="font-medium"
          label="Update"
        ></Button>
      </div>
    </div>
  );
};

export default EditAnnouncement;
