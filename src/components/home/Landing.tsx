<<<<<<< HEAD
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
=======
import Image from "next/image";
>>>>>>> 7632e57 (implement landing page)
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const Landing: React.FC = () => {
<<<<<<< HEAD
  const router = useRouter();
  const handleJoinUs = () => {
    router.push("/auth/signup");
  };
=======
>>>>>>> 7632e57 (implement landing page)
  return (
    <div className="bg-primarybg font-poppins ">
      <div className="relative">
        <Image
<<<<<<< HEAD
          src="/images/home/home1.jpg"
          alt="landing-image"
          width={2000}
          height={1000}
          className="brightness-50"
        />
        <div className="md:absolute bottom-0.5 left-16 text-primary-text md:text-primarybg w-1/1 md:w-7/12 lg:w-1/2 text-lg lg:bottom-1/4 m-4 md:m-0">
          <div className="mb-8 md:m-0 m-4">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:pt-0 pt-8"
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
            >
              Who We Are
            </motion.h1>
            <motion.p
              className="mt-8 md:text-lg lg:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
=======
          src="/img/home/home1.jpg"
          alt="landing-img"
          width={2000}
          height={1000}
          className="brightness-50 h-96 md:h-full"
        />
        <div className="md:absolute bottom-0.5 left-16 text-primary-text md:text-primarybg w-1/1 md:w-1/2 text-lg lg:bottom-1/3 m-4 md:m-0">
          <div className="mb-8 md:m-0 m-4">
            <h1 className="text-4xl font-bold md:pt-0 pt-8">Who We Are</h1>
            <p className="mt-8">
>>>>>>> 7632e57 (implement landing page)
              A2SV upskills high-potential university students, connects them
              with opportunities at top tech companies around the world, and
              creates digital solutions to urgent problems in their home
              countries. The program is free for students, making the
              opportunity available for youth who have talent but lack the means
              to use it.
<<<<<<< HEAD
            </motion.p>
          </div>

          <motion.div
            className="flex flex-row mt-4 mx-auto my-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <motion.button
              className="ml-4 md:ml-0 bg-primary px-2 sm:px-4 md:px-16 lg:px-24 xl:px-28 py-2 rounded-md mr-12 hover:bg-blue-400 font-bold text-white"
              initial={{ scale: 0.9 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              onClick={handleJoinUs}
            >
              Join Us
            </motion.button>

            <Link href={"#more"}>
              <div className="flex flex-row">
                <button className="text-end font-bold">More Information</button>
                <div className="p-3">
                  <AiOutlineRight />
                </div>
              </div>
            </Link>
          </motion.div>
=======
            </p>
          </div>

          <div className="flex flex-col sm:flex-row mt-4 mx-auto my-auto">
            <button className="bg-primary px-16 md:px-28 py-2 rounded-md mr-12 hover:bg-blue-400 font-bold">
              Join Us
            </button>
            <div className="flex flex-row">
              <button className="text-end font-bold">More Information</button>
              <div className="p-3">
                <AiOutlineRight />
              </div>
            </div>
          </div>
>>>>>>> 7632e57 (implement landing page)
        </div>
      </div>
    </div>
  );
};

export default Landing;
