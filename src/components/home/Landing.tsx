import Image from "next/image";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const Landing: React.FC = () => {
  return (
    <div className="bg-primarybg font-poppins ">
      <div className="relative">
        <Image
          src="/images/home/home1.jpg"
          alt="landing-image"
          width={2000}
          height={1000}
          className="brightness-50"
        />
        <div className="md:absolute bottom-0.5 left-16 text-primary-text md:text-primarybg w-1/1 md:w-7/12 lg:w-1/2 text-lg lg:bottom-1/4 m-4 md:m-0">
          <div className="mb-8 md:m-0 m-4">
            <h1 className="text-4xl font-bold md:pt-0 pt-8">Who We Are</h1>
            <p className="mt-8">
              A2SV upskills high-potential university students, connects them
              with opportunities at top tech companies around the world, and
              creates digital solutions to urgent problems in their home
              countries. The program is free for students, making the
              opportunity available for youth who have talent but lack the means
              to use it.
            </p>
          </div>

          <div className="flex flex-row mt-4 mx-auto my-auto">
            <button className="ml-4 md:ml-0 bg-primary px-4 md:px-16 lg:px-24 xl:px-28 py-2 rounded-md mr-12 hover:bg-blue-400 font-bold text-white">
              Join Us
            </button>
            <div className="flex flex-row">
              <button className="text-end font-bold">More Information</button>
              <div className="p-3">
                <AiOutlineRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
