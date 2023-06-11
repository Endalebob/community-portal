import Image from "next/image";
import React from "react";
const AuthImage = () => {
  const imageUrl = 'https://github.com/Endalebob/t-web-project/blob/main/public/images/a2Sv.png';
  return (
<div className="h-screen w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${imageUrl})`, filter: 'brightness(75%)' }}>
      <div className="absolute inset-0 bg-sky-700 opacity-70"></div>
      <div className="absolute inset-0 justify-center">
        <div className="m-5 flex flex-col h-full justify-between">
          <img
            width={100}
            height={100}
            src="https://github.com/Endalebob/t-web-project/blob/main/public/images/logo.png"
            alt="logo"
            className="w-40"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl max-w-[439px] text-white font-bold font-Inter mt-5">
              Start making your dreams come true
            </h1>
            <p className="text-white max-w-[439px] mt-5">
              Create an account and discover the worlds' best UI component
              framework.
            </p>
            <div className="flex gap-2 mt-5 items-center">
              <img
                src="https://github.com/Endalebob/t-web-project/blob/main/public/images/Group.png"
                alt="group image"
                width={192}
                height={20}
              />
              <p className="text-white">Join 3.000+ users</p>
            </div>
          </div>

          <p className="text-white mb-10">© 2023 A2SV. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImage;
