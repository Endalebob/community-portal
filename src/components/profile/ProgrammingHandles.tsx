import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { IconType } from "react-icons/lib";

interface ProgrammingHandlesProps {
  platform: string;
  handle: string;
  baseUrl: string;
  icon: IconType;
}

const ProgrammingHandles: React.FC<ProgrammingHandlesProps> = ({
  platform,
  handle,
  baseUrl,
  icon: Icon,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-center items-center space-x-4">
        <div className="bg-blue-100 p-3 text-blue-500 rounded-full">
          <Icon />
        </div>
        <div>
          <h4 className="text-gray-700 font-semibold">{platform}</h4>
          <p className="text-xs text-gray-500">{handle}</p>
        </div>
      </div>
      <Link target="_blank" className="basis-1/2" href={baseUrl}>
        <FiExternalLink className="text-gray-500 hover:text-gray-700" />
      </Link>
    </div>
  );
};

export default ProgrammingHandles;
