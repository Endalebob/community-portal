import React from 'react';

interface CardProps {
  id: string,
  groupName: string,
  memberCount: string,
}

const GroupCard: React.FC<CardProps> = ({ id, groupName, memberCount}) => {
  
  return (

    <div className="flex items-center p-4 bg-white max-w-xs w-64 shadow-sm rounded-xl border-l border-r border-b">
    <div className="font-semibold text-xl text-gray-500 text-left p-8"><h1>Groups</h1></div>
      <div className="p-4">
        <h2 className="text-primary-text font-bold text-2xl mx-auto">{groupName}</h2>
        <p className="text-secondary-text text-sm text-left">{memberCount}</p>
      </div>
    </div>
 
    )
};

export default GroupCard;