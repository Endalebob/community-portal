import Profile from "<@>/components/profile/Profile";
import Head from "next/head";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>profile</title>
      </Head>
      <Profile />
    </>
  );
};

export default ProfilePage;
