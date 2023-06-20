import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { IconType, icons } from "react-icons";
import {
  TbCircle1Filled,
  TbCircle2Filled,
  TbCircle3Filled,
  TbCircle4Filled,
} from "react-icons/tb";

interface Step {
  title: String;
  description: String;
  icon: IconType; // Define the icon type as IconType from react-icons
}
const HowToJoin = () => {
  const steps: Step[] = [
    {
      title: "Sign Up",
      description:
        "Sign up to access contests and be eligible for applying to A2SV",
      icon: TbCircle1Filled, // Assign the icon component to the icon property
    },
    {
      title: "Take Contests",
      description: "Access contests and take at least 2 contests consecutively",
      icon: TbCircle2Filled,
    },
    {
      title: "Apply",
      description: "Complete your profile and apply to join A2SV",
      icon: TbCircle3Filled,
    },
  ];
  return (
    <div className="flex flex-col ml-8 md:ml-28 mb-20 mr-8 mt-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          How do I join A2SV?
        </h1>
        <p className="text-secondary-text pt-8 text-lg lg:text-xl xl:text-2xl leading-8 lg:leading-10">
          The way to join A2SV is through A2SV Community Portal. The community
          path is open to everyone who has interest in problem solving and in
          Data Structures and Algorithms.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 pt-12">
          {steps.map((step, index) => (
            <motion.div
              className="flex flex-row gap-x-8 pt-8"
              key={index}
              initial={{ x: -200 }}
              whileInView={{ x: 0 }}
              transition={{ delay: index * 0.2, duration: 1 }}
            >
              <div className="pt-2">
                <step.icon color="#3182CE" size={40} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  {step.title}
                </h1>
                <p className="text-secondary-text pt-2 text-lg lg:text-xl xl:text-2xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="col-span-1 mt-28 fle flex-row">
          <Image
            src={"/images/home/steps.svg"}
            alt="how to join image"
            width={500}
            height={600}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default HowToJoin;
