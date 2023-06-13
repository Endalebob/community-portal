import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineClose, MdViewHeadline } from "react-icons/md";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavItem {
  name: string;
  to: string;
  current: boolean;
}
const NavBar: React.FC = () => {
  const navData: NavItem[] = [
    {
      name: "Home",
      to: "/",
      current: true,
    },
    {
      name: "Contests",
      to: "/contests",
      current: false,
    },
    {
      name: "Your Progress",
      to: "/your-progress",
      current: false,
    },
  ];
  const { asPath } = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [navigation, setNavigation] = useState(() => navData);

  useEffect(() => {
    setNavigation(
      navigation.map((item) => {
        if (item.to === asPath) {
          return { ...item, current: true };
        } else {
          return { ...item, current: false };
        }
      })
    );
  }, [asPath]);

  return (
    <>
      <section className="flex items-center p-4">
        <div className="w-28 lg:w-52">
          <Image src="/a2sv-logo.png" width={105} height={30} alt={""} />
        </div>

        <div className="w-full absolute top-5 -right-0 flex flex-col items-center gap-y-4 md:ml-0 md:flex-row md:static">
          {showNav ? (
            <MdOutlineClose
              className="block w-10 h-10 p-2 md:hidden ml-auto"
              onClick={() => {
                setShowNav(!showNav);
              }}
            />
          ) : (
            <MdViewHeadline
              className="block w-10 h-10 p-2 md:hidden ml-auto"
              onClick={() => {
                setShowNav(!showNav);
              }}
            />
          )}

          <nav
            className={classNames(
              showNav ? "flex" : "hidden",
              "md:flex ml-auto md:ml-0 shadow-xl md:shadow-none p-10 md:p-0 rounded-xl"
            )}
          >
            <ul className="flex flex-col gap-5  md:m-0 content-between md:flex-row md:w-full justify-between">
              {navData.map(({ name, to, current }, index) => (
                <Link
                  key={index}
                  href={to}
                  className={classNames(
                    current
                      ? "text-blue-700 underline underline-offset-8 decoration-4"
                      : "no-underline text-primary-text",
                    "text-sm md:text-base"
                  )}
                >
                  {name}
                </Link>
              ))}
            </ul>
          </nav>

          <div
            className={classNames(
              showNav ? "flex" : "hidden",
              "ml-auto md:flex gap-4 items-center text-sm lg:text-lg"
            )}
          >
            <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none border-blue-400 text-primary hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 ">
              Login
            </button>
            <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none bg-primary text-white hover:bg-blue-400">
              Sign Up
            </button>
          </div>
        </div>

        {/* buttons */}
      </section>
    </>
  );
};

export default NavBar;
