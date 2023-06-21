import NavBar from "<@>/components/layout/NavBar";
import { setToken } from "<@>/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "<@>/store/hooks";
import React, { useEffect } from "react";
import { ReactNode, Suspense } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
