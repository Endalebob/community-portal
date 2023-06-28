import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthImage = () => {
  return (
    <div className="hidden md:flex h-screen w-1/2 bg-cover bg-center relative  bg-gray-500 bg-[url('/images/a2Sv.png')] bg-blend-multiply">
      <div className="absolute inset-0 justify-center">
        <div className="mx-5 pt-5 flex flex-col h-full justify-between">
          <Link href="/">
            <Image
              width={100}
              height={100}
              src="/images/logo.svg"
              alt="logo"
              className="w-32"
            />
          </Link>

          <div className="flex flex-col">
            <h1 className="text-4xl max-w-[439px] text-white font-bold font-Inter mt-5">
              Start making your dreams come true
            </h1>
            <p className="text-white max-w-[439px] mt-5">
              Create an account and join africa's digital revolution.
            </p>
          </div>

          <p className="text-white mb-5">© 2023 A2SV. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImage;
