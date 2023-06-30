import SideBar from "<@>/components/resources/Sidebar";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <SideBar />
    </>
  );
};

export default index;
