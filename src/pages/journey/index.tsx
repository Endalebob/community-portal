import Contests from "<@>/components/my-journey/Contests";
import Journey from "<@>/components/my-journey/Journey";
import Stepper from "<@>/components/my-journey/Stepper";
import { getCookie } from "<@>/utils/cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const index: React.FC = () => {
  const router = useRouter();
  const role = getCookie("role");
  if (role && role !== "Student") {
    router.push("/admin/groups");
  }
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
