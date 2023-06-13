import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdFavorite, MdOutlineClose, MdViewHeadline } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
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
  const [showProfile, setShowProfile] = useState(false);
  const [navigation, setNavigation] = useState(() => navData);
  const [loggedIn, setLoggedIn] = useState(true);

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
      <section className="flex p-4">
        <div className="w-28 lg:w-52">
          <Image src="/a2sv-logo.png" width={105} height={30} alt={""} />
        </div>

        <div className="w-full absolute -right-0 flex flex-col gap-y-4 md:flex-row md:static">
          <nav
            className={classNames(
              showNav ? "flex" : "hidden",
              "md:flex absolute md:static right-0 md:ml-0 shadow-xl md:shadow-none p-10 md:p-0 rounded-xl top-8"
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

          <div className="flex ml-auto justify-end">
            {showNav ? (
              <MdOutlineClose
                className="block w-10 h-10 p-2 md:hidden ml-auto"
                onClick={() => {
                  setShowNav(!showNav);
                  setShowProfile(false);
                }}
              />
            ) : (
              <MdViewHeadline
                className="block w-10 h-10 p-2 md:hidden ml-auto"
                onClick={() => {
                  setShowNav(!showNav);
                  setShowProfile(false);
                }}
              />
            )}

            <button
              onClick={() => {
                setShowProfile((showProfile) => !showProfile);
                setShowNav(false);
              }}
            >
              <Image
                className="w-10 h-10 rounded-full hover:ring-2 p-1 hover:ring-gray-300"
                src="/img/profile-picture.jpg"
                alt="Bordered avatar"
                width={150}
                height={150}
              />
            </button>
          </div>

          {loggedIn ? (
            <div className="">
              {showProfile && (
                <div className="absolute right-0 top-16 w-60 border border-r-0 text-gray-500">
                  <div className="text-start p-2">
                    <p className="font-bold">Neil Sims</p>
                    <span>name@a2sv.org</span>
                  </div>
                  <div className="border border-y-2 border-x-0 flex flex-col text-sm gap-y-2">
                    <button className="p-2 hover:bg-gray-100 w-full text-start">
                      My Profile
                    </button>
                    <button className="p-2 hover:bg-gray-100 w-full text-start">
                      Account settings
                    </button>
                    <div className="border border-1"></div>
                    <button className="p-2 hover:bg-gray-100 w-full text-start flex gap-2 items-center">
                      <MdFavorite />
                      My likes
                    </button>
                    <button className="p-2 hover:bg-gray-100 w-full text-start flex gap-2 items-center">
                      <BsCollectionFill />
                      Collections
                    </button>
                  </div>
                  <button className="p-2 hover:bg-gray-100 w-full text-start">
                    signout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className={classNames(
                showNav ? "flex" : "hidden",
                "ml-auto md:flex gap-4 items-center text-sm lg:text-lg"
              )}
            >
              {/* auth buttons */}

              <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none border-blue-400 text-primary hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 ">
                Login
              </button>
              <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none bg-primary text-white hover:bg-blue-400">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NavBar;
