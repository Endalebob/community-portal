import ContestList from "<@>/components/contest/ContestList";
import { getCookie } from "<@>/utils/cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Contests = () => {
  const router = useRouter();
  const role = getCookie("role");
  if (role && role === "Student") {
    router.push("/journey");
  }
  return (
    <>
      <Head>
        <title>Contests</title>
      </Head>
      <ContestList />
    </>
  );
};

export default Contests;
