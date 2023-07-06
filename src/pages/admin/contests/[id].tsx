import EditContestForm from "<@>/components/contest/UpdateContest";
import { getCookie } from "<@>/utils/cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const UpdateContest = () => {
  const router = useRouter();
  const role = getCookie("role");
  if (role && role === "Student") {
    router.push("/journey");
  }
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
