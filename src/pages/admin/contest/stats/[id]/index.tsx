import ContestStats from "<@>/components/admin/contest_stats/ContestStats";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return (
    <>
      <Head>
        <title>Contests Status</title>
      </Head>
      <div>
        <ContestStats id={id} />
      </div>
    </>
  );
};

export default index;
