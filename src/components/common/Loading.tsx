import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading: React.FC = () => {
  return (
    <div className="flex py-10 items-center text-gray-500 space-x-2 justify-center">
      <AiOutlineLoading3Quarters className="animate-spin" /> <p>Loading...</p>
    </div>
  );
};

export default Loading;
