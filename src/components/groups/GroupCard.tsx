import React from "react";

interface CardProps {
  groupName: string;
  memberCount: number;
  capacity: number;
  handleCardClick: () => void;
}

const GroupCard: React.FC<CardProps> = ({
  groupName,
  memberCount,
  capacity,
  handleCardClick,
}) => {
  return (
    <div
      onClick={handleCardClick}
      className="flex items-center p-4 bg-white max-w-xs w-60 shadow-sm rounded-xl border-l border-r border-b"
    >
      <div className="card-item">
        <h2 className="text-gray-600 font-semibold text-2xl">{groupName}</h2>
        <p className="text-gray-400 text-sm">
          {memberCount} / {capacity}
        </p>
      </div>
    </div>
  );
};

export default GroupCard;
