import ContestForm from "<@>/components/contest/CreateContest";
import Head from "next/head";
import React from "react";

const CreateContest = () => {
  return (
    <>
      <Head>
        <title>Create Contest</title>
      </Head>
      <ContestForm />
    </>
  );
};

export default CreateContest;
