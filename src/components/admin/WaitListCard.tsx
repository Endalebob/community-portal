import React from "react";
import Image from "next/image";
import { WaitListItem } from "<@>/types/admin/wait-list-item";
import UserAvatar from "../common/UserAvatar";

interface ApplicantProps {
  applicant: WaitListItem;
  selected: boolean;
  onSelect: () => void;
  getUserById: () => void;
}

const WaitListCard: React.FC<ApplicantProps> = ({
  applicant,
  selected,
  onSelect,
  getUserById,
}) => {
  const dateFormat = new Date(applicant.waitlistCreationDate || "");

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const verbalDate: string = dateFormat.toLocaleDateString("en-US", options);

  const handleCheckboxChange = () => {
    onSelect();
  };

  const handleCardClick = () => {
    getUserById();
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex px-6 py-3 w-full border-b border-gray-100 justify-between items-center rounded-sm hover:bg-gray-50"
    >
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={handleCheckboxChange}
          className="accent-blue-500"
        />
        <UserAvatar
          fullName={applicant.fullName}
          profilePhotoUrl={applicant.profilePhotoUrl || ""}
        />

        <div>
          <p className="text-gray-700 text-sm font-medium">
            {applicant.fullName}
          </p>
          {applicant.telegramUsername && (
            <p className="text-sm text-gray-500">@{applicant.telegramUsername}</p>
          )}
        </div>
      </div>

      <p className="text-gray-500 text-sm">{verbalDate}</p>
    </div>
  );
};

export default WaitListCard;
