import Footer from "<@>/components/layout/Footer";
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
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex flex-col">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
