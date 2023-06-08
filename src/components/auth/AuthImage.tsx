import React from "react";

const AuthImage = () => {
  return (
    <div className="h-screen w-1/2 bg-cover bg-center relative bg-[url('/images/a2Sv.png')] brightness-75">
      <div className="absolute inset-0 bg-primary opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-2xl font-bold">Your Text</p>
      </div>
    </div>
  );
};

export default AuthImage;
