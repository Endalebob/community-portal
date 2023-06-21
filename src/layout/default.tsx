import NavBar from "<@>/components/layout/NavBar";
import React, { useEffect } from "react";
import { ReactNode, Suspense } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
