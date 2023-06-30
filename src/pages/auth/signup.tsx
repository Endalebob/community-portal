import Signup from "<@>/components/auth/Signup";
import Head from "next/head";
import React from "react";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Signup />
    </>
  );
};

export default SignupPage;
