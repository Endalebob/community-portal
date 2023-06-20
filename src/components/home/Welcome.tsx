<<<<<<< HEAD
import { motion } from "framer-motion";
=======
>>>>>>> 7632e57 (implement landing page)
import Image from "next/image";
import React from "react";

const Welcome: React.FC = () => {
  return (
<<<<<<< HEAD
    <div
      className="grid grid-cols-1 text-primary-text mt-8 font-poppins lg:grid-cols-2 ml-8 mr-8 md:mr-16 md:ml-16 lg:ml-28 "
      id="more"
    >
      <motion.div
        className="col-span-1 mt-0 md:mt-16"
        initial={{ x: -100 }}
        whileInView={{ x: 0, transition: { duration: 1 } }}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mt-0 lg:mt-16">
          Welcome to the A2SV Community
        </h1>
        <p className="text-secondary-text mt-4 mb-4 md:text-lg lg:text-xl">
=======
    <div className="grid grid-cols-1 text-primary-text mt-16 font-poppins lg:grid-cols-2 ml-8 md:ml-28 md:mr-8">
      <div className="col-span-1 mt-0 md:mt-16">
        <h1 className="text-3xl font-extrabold mt-0 md:mt-16">
          Welcome to the A2SV Community
        </h1>
        <p className="text-secondary-text mt-4 mb-4 text-lg">
>>>>>>> 7632e57 (implement landing page)
          We are strategists, designers and developers. Innovators and problem
          solvers. Small enough to be simple and quick, but big enough to
          deliver the scope you want at the pace you need. Small enough to be
          simple and quick, but big enough to deliver the scope you want at the
          pace you need.
        </p>
<<<<<<< HEAD
        <p className="text-secondary-text mt-4 mb-4 text-base md:text-lg lg:text-xl">
          We are strategists, designers and developers. Innovators and problem
          solvers. Small enough to be simple and quick.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:ml-16 mt-16 sm:grid-cols-2 gap-4  mx-auto lg:w-auto">
        <motion.div
          className="h-96"
          initial={{ y: -50 }}
          whileInView={{ y: 0, transition: { duration: 1 } }}
        >
          <Image
            src="/images/home/welcome1.jpg"
            alt="welcome first image"
            width={1000}
            height={1000}
            className="h-96 rounded-lg brightness-75 object-cover w-80 lg:w-auto"
          />
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ y: 50 }}
          whileInView={{ y: 0, transition: { duration: 1 } }}
        >
          <Image
            src="/images/home/welcome2.jpg"
            alt="welcome first image"
            width={1000}
            height={1000}
            className="h-96 rounded-lg brightness-75 object-cover w-80 lg:w-auto"
          />
        </motion.div>
=======
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
>>>>>>> 7632e57 (implement landing page)
      </div>
    </div>
  );
};

export default Welcome;
