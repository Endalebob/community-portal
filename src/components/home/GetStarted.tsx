import { useRouter } from "next/router";
import React from "react";

const GetStarted: React.FC = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/auth/signup");
  };
  return (
    <div className="mt-16 h-full mb-16 lg:h-52 my-auto mx-auto bg-primary w-full text-white font-poppins tracking-wider leading-10">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold ml-8 md:ml-28 mt-8">
        Ready To Grow?
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-6">
        <p className="mt-4 left-10 md:text-lg lg:text-xl ml-8 md:ml-28 col-span-4">
          Are you ready to take the next step in your journey? Embrace the
          limitless possibilities and join A2SV today. Together, let's unlock
          your true potential and create a brighter future through technology.
        </p>
        <div className="col-span-2 text-xl mt-8 ml-8 md:ml-20 lg:ml-8 py-auto px-auto  mb-8">
          <button
            className="bg-white text-primary py-3 px-8 ml-2 md:ml-8 rounded-lg hover:bg-primary hover:text-white hover:border-2 hover:border-white transition duration-500"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
