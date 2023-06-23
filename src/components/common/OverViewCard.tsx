import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface CardProps {
  icon: IconType;
  title: string;
  number: number;
}
const OverViewCard: React.FC<CardProps> = ({ icon: Icon, title, number }) => {
  return (
    <div className="flex items-center p-4 bg-white max-w-xs w-64 shadow-sm rounded-xl border-l border-r border-b">
      <div className="mr-4 w-12 h-12 rounded-xl bg-blue-50 flex items-center">
        <Icon size={30} className="mx-auto" />
      </div>
      <div>
        <div className="text-primary-text font-bold text-2xl">{number}</div>
        <div className="text-secondary-text text-sm">{title}</div>
      </div>
    </div>
  );
};

export default OverViewCard;
