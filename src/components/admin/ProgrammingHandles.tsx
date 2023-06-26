import Link from "next/link";
import { IconType } from "react-icons/lib";

interface ProgrammingHandlesProps {
  platform: string;
  handle: string;
  link?: string;
  icon: IconType;
}

const ProgrammingHandles: React.FC<ProgrammingHandlesProps> = ({
  platform,
  handle,
  link = "",
  icon: Icon,
}) => {
  return (
    <div className="flex space-x-3 py-2 px-3 items-center">
      <div className="bg-blue-100 p-3 text-blue-950 rounded-lg">
        <Icon />
      </div>
      <div>
        <h4 className="text-gray-700 font-semibold">{platform}</h4>
        <Link href={link}>
          <a className="text-xs text-gray-500">{handle}</a>
        </Link>
      </div>
    </div>
  );
};

export default ProgrammingHandles;
