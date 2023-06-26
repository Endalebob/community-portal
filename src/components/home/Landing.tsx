import { RootState } from "<@>/store";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";

const Landing: React.FC = () => {
  const router = useRouter();
  const handleJoinUs = () => {
    router.push("/auth/signup");
  };
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div className="bg-primarybg font-poppins ">
      <div className="relative">
        <Image
          src="/images/home/home2.jpg"
          alt="landing-image"
          width={2000}
          height={1000}
          className="brightness-50"
        />
        <div className="md:absolute bottom-0.5 left-16 text-primary-text md:text-primarybg w-1/1 md:w-7/12 lg:w-1/2 lg:top-16 md:bottom-1/4  m-4 md:m-0">
          <div className="md:m-0 m-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-4xl font-extrabold lg:font-bold md:pt-16 pt-8">
              Who We Are
            </h1>
            <motion.p
              className="mt-8 md:text-lg lg:text-xl lg:mt-24 xl:mb-12 text-secondary-text md:text-primarybg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              A2SV upskills high-potential university students, connects them
              with opportunities at top tech companies around the world, and
              creates digital solutions to urgent problems in their home
              countries. The program is free for students, making the
              opportunity available for youth who have talent but lack the means
              to use it.
            </motion.p>
          </div>
          <motion.div
            className="flex flex-row mt-4 mx-auto my-auto mb:mb-16 lg:text-lg md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            {!isAuthenticated && (
              <motion.button
                className="ml-2 md:ml-0 bg-primary px-2 sm:px-4 md:px-16 lg:px-24 xl:px-28 py-2 rounded-md mr-4 lg:mr-12 hover:bg-blue-400 font-semibold sm:font-bold text-white lg:py-3"
                initial={{ scale: 0.9 }}
                whileHover={{
                  scale: 1,
                  transition: {
                    duration: 0.5,
                  },
                }}
                onClick={handleJoinUs}
              >
                Join Us
              </motion.button>
            )}

            <Link href={"#more"}>
              <div className="flex flex-row">
                <button className="text-end font-semibold sm:font-bold">
                  More Information
                </button>
                <div className="p-3">
                  <AiOutlineRight />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
