import React from "react";

interface createProps {
  handleAutoFill: () => void;
  handleClose: () => void;
}

const ConfrimationCard: React.FC<createProps> = ({
  handleAutoFill,
  handleClose,
}) => {
  const handleConfirm = () => {
    handleAutoFill();
  };

  return (
    <div className="flex flex-col mb-4 w-[50vw] md:w-[40vw] lg:w-[30vw]">
      <div className="mx-auto items-center justify-content text-start">
        <h1 className="font-bold p-2">Are you sure?</h1>
        <p className="text-light item-align">
          Auto fill will fill the remaining seats in the group with earliest
          applicants from the wait list.
        </p>
      </div>
      <div className="pt-8">
        <button
          className="mr-4 text-xl text-light"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 bg-primary text-white rounded-md"
          onClick={handleConfirm}
        >
          <span className="font-bold">Confirm</span>
        </button>
      </div>
    </div>
  );
};

export default ConfrimationCard;
