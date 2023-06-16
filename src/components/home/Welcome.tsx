import Image from "next/image";
import React from "react";

const Welcome: React.FC = () => {
  return (
    <div
      className="grid grid-cols-1 text-primary-text mt-8 font-poppins lg:grid-cols-2 ml-8 mr-8 md:mr-16 md:ml-16 lg:ml-28 "
      id="more"
    >
      <div className="col-span-1 mt-0 md:mt-16">
        <h1 className="text-3xl font-extrabold mt-0 lg:mt-16">
          Welcome to the A2SV Community
        </h1>
        <p className="text-secondary-text mt-4 mb-4 text-lg">
          We are strategists, designers and developers. Innovators and problem
          solvers. Small enough to be simple and quick, but big enough to
          deliver the scope you want at the pace you need. Small enough to be
          simple and quick, but big enough to deliver the scope you want at the
          pace you need.
        </p>
        <p className="text-secondary-text text-lg">
          We are strategists, designers and developers. Innovators and problem
          solvers. Small enough to be simple and quick.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:ml-16 mt-16 sm:grid-cols-2 gap-4  mx-auto lg:w-auto">
        <div className="h-96">
          <Image
            src="/images/home/welcome1.jpg"
            alt="welcome first image"
            width={1000}
            height={1000}
            className="h-96 rounded-lg brightness-75 object-cover w-80 lg:w-auto"
          />
        </div>
        <div className="mt-8">
          <Image
            src="/images/home/welcome2.jpg"
            alt="welcome first image"
            width={1000}
            height={1000}
            className="h-96 rounded-lg brightness-75 object-cover w-80 lg:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
