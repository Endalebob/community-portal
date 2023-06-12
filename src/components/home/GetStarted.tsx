import React from "react";

const GetStarted: React.FC = () => {
  return (
    <div className="mt-16 h-full mb-16 md:h-52 my-auto mx-auto bg-primary w-full text-white font-poppins tracking-wider leading-10">
      <h1 className="text-4xl font-bold ml-8 md:ml-28 mt-8">Rady To Grow?</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <p className="mt-4 left-10 text-2xl ml-8 md:ml-28 col-span-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="col-span-1 text-xl mt-8 ml-8 md:ml-28 lg:ml-0">
          <button className="border-2 border-white py-2 px-5 rounded-lg">
            Learn More
          </button>
          <button className="bg-white text-primary py-3 px-8 ml-2 md:ml-8 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
