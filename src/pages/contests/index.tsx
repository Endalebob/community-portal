import ContestList from "<@>/components/contest/ContestList";
import Head from "next/head";
import React from "react";

const Contests = () => {
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
