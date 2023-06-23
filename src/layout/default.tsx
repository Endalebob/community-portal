import Footer from "<@>/components/layout/Footer";
import NavBar from "<@>/components/layout/NavBar";
import { setToken } from "<@>/store/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "<@>/store/hooks";
import React, { useEffect } from "react";
import { ReactNode, Suspense } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      const item = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (item) {
        dispatch(setToken({ token: item, role: role, isAuthenticated: true }));
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
