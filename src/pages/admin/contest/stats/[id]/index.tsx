import ContestStats from "<@>/components/admin/contest_stats/ContestStats";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  return (
    <div>
      <ContestStats id={id} />
    </div>
  );
};

export default index;
