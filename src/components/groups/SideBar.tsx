import { FC } from "react";
import MembersCard from "./MembersCard";

interface CardProps {
  name: string;
  email: string;
  imageUrl: string;
  education: string;
  date: string;
}

interface SidebarProps {
  cards: CardProps[];
}

const Sidebar: FC<SidebarProps> = ({ cards }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">name</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          education
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="flex items-center space-x-4 p-4 border-b border-gray-300 font-medium">
            <div className="flex-1">Name</div>
            <div className="flex-1 text-right">Education</div>
          </div>
          {cards.map((card, index) => (
            <div key={index}>
              <MembersCard {...card} />
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Sidebar;