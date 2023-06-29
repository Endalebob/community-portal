import { RootState } from "<@>/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const Landing: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="bg-zinc-500 bg-[url(/images/home/home2.jpg)] bg-blend-multiply bg-cover bg-no-repeat bg-center min-h-screen w-full text-white flex flex-col items-center justify-center">
      <div className="text-white py-4 flex w-screen px-10 md:px-20">
        <Link className="z-50" href="/">
          <div className="flex items-center">
            <Image
              src="/a2sv_logo_white.svg"
              width={105}
              height={30}
              className="h-10"
              alt="logo"
            ></Image>
          </div>
        </Link>
        <div className="flex flex-row justify-end items-center gap-6 flex-grow">
          <Link href="/auth/signin">
            <div className="py-2 px-6 rounded-md bg-primary">Sign In</div>
          </Link>
        </div>
      </div>
      <div className="md:m-0 m-4 max-w-7xl flex flex-col justify-center items-center flex-grow">
        <h1 className="font-extrabold text-center text-3xl md:text-6xl lg:text-7xl">
          Ignite Africa's Digital Future<br></br> Join us today
        </h1>
        <span className="italic text-sm md:text-xl pt-4 text-center font-medium">
          "Consistent improvement is better than delayed perfection."<br></br>
          Mark Twain
        </span>
        <div className="flex gap-4 mt-10">
          <Link href="/auth/signin">
            <div className="py-2 px-8 w-40 h-10 border-primary border-2 bg-primary rounded-full font-medium cursor-pointer flex justify-center items-center">
              Get Started
            </div>
          </Link>
          <div className="py-2 px-8 w-40 h-10 rounded-full font-medium cursor-pointer border-2 flex justify-center items-center">
            Learn More
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
