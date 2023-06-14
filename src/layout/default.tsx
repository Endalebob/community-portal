import NavBar from "<@>/components/layout/NavBar";
import React from "react";
import { ReactNode, Suspense } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};

export default RootLayout;
