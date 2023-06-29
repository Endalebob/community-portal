import EditContestForm from "<@>/components/contest/UpdateContest";
import Head from "next/head";
import React from "react";

const UpdateContest = () => {
  return (
    <>
      <Head>
        <title>Edit Contest</title>
      </Head>
      <EditContestForm />
    </>
  );
};

export default UpdateContest;
