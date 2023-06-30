import Contests from "<@>/components/my-journey/Contests";
import Journey from "<@>/components/my-journey/Journey";
import Stepper from "<@>/components/my-journey/Stepper";
import Head from "next/head";
import React from "react";

const index: React.FC = () => {
  return (
    <div>
      <Head>
        <title>My journey</title>
      </Head>
      <Journey />
    </div>
  );
};

export default index;
