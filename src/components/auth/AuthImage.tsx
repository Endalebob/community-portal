import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthImage = () => {
  return (
    <div className="hidden md:flex flex-col justify-between p-6 h-full min-h-screen w-1/2 bg-cover bg-center  bg-gray-600 bg-[url('/images/a2Sv.webp')] bg-blend-multiply">
      <Link href="/">
        <Image
          width={100}
          height={100}
          src="/images/logo.svg"
          alt="logo"
          className="w-32 h-full"
        />
      </Link>

      <div className="flex flex-col">
        <h1 className="text-4xl max-w-[439px] text-white font-bold font-Inter mt-5">
          Start making your dreams come true
        </h1>
        <p className="text-white max-w-[439px] mt-5">
          Create an account and join Africa's digital revolution.
        </p>
      </div>

      <p className="text-white mb-5">© 2023 A2SV. All rights reserved.</p>
    </div>
  );
};

export default AuthImage;