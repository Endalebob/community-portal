import Signin from "<@>/components/auth/Signin";
import Head from "next/head";
import React from "react";

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Signin />
    </>
  );
};

export default SigninPage;
