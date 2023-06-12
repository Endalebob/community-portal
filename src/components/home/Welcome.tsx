import Image from "next/image";
import React from "react";

const Welcome: React.FC = () => {
  return (
    <div className="grid grid-cols-1 text-primary-text mt-16 font-poppins lg:grid-cols-2 ml-8 md:ml-28 md:mr-8">
      <div className="col-span-1 mt-0 md:mt-16">
        <h1 className="text-3xl font-extrabold mt-0 md:mt-16">
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
      <div className="grid grid-cols-1 ml-8 md:ml-16 mt-16 sm:grid-cols-2">
        <div className="h-96">
          <Image
            src="/img/home/welcome1.jpg"
            alt="welcome first image"
            width={250}
            height={1000}
            className="h-96 rounded-lg brightness-75 object-cover"
          />
        </div>
        <div className="mt-8">
          <Image
            src="/img/home/welcome2.jpg"
            alt="welcome first image"
            width={250}
            height={1000}
            className="h-96 rounded-lg brightness-75 hover:brightness-50 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
