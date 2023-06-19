import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MdFavorite, MdOutlineClose, MdViewHeadline } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { RootState } from "<@>/store";
import { useAppDispatch } from "<@>/store/hooks";
import { clearToken } from "<@>/store/auth/auth-slice";

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
      to: "/journey",
      current: false,
    },
  ];
  const { asPath } = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [navigation, setNavigation] = useState(() => navData);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const showProfileRef = useRef<HTMLDivElement>(null);
  const showNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    console.log("here");
    dispatch(clearToken());
    router.push("/auth/signin");
  };

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

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showProfileRef.current &&
        !showProfileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }

      if (
        showNavRef.current &&
        !showNavRef.current.contains(event.target as Node)
      ) {
        setShowNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileRef]);

  // handle route change
  useEffect(() => {
    const handleRouteChange = () => {
      setShowNav(false);
      setShowProfile(false);
    };

    // Attach an event listener to the router's 'routeChangeStart' event
    router.events.on("routeChangeStart", handleRouteChange);

    // Remove the event listener when the component is unmounted
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  console.log(isAuthenticated, user);

  return (
    <>
      <section className="flex p-4 border-b-2">
        <div className="w-28 lg:w-52">
          <Image src="/a2sv-logo.png" width={105} height={30} alt="logo" />
        </div>

        <div className="w-full absolute -right-0 flex flex-col gap-y-4 md:flex-row md:static">
          {/* Navigation Links*/}
          <nav
            className={classNames(
              showNav ? "flex" : "hidden",
              "md:flex absolute md:static right-0 bg-white md:ml-0 shadow-xl md:shadow-none p-10 md:p-0 rounded-xl top-8"
            )}
          >
            <div
              ref={showNavRef}
              className="flex flex-col gap-5 z-20 md:m-0 bg-white content-between md:flex-row md:w-full justify-between"
            >
              {navigation.map(({ name, to, current }, index) => (
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
            </div>
          </nav>

          {/* Mobile Navigation HumBurger Icon */}
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

            {/* Logged in user profile icon */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setShowProfile((showProfile) => !showProfile);
                  setShowNav(false);
                }}
              >
                <Image
                  className="w-10 h-10 rounded-full bg-white hover:ring-2 p-1 hover:ring-gray-300 transition ease-in-out duration-200"
                  src="/img/profile-picture.jpg"
                  alt="Bordered avatar"
                  width={150}
                  height={150}
                />
              </button>
            )}
          </div>

          {isAuthenticated ? (
            <>
              {showProfile && (
                <div
                  className="absolute right-0 top-16 w-60 border border-r-0 bg-white shadow-2xl text-gray-500"
                  ref={showProfileRef}
                >
                  <div className="text-start p-2">
                    <p className="font-bold">{user.fullName}</p>
                    <span>{user.email}</span>
                  </div>
                  <div className="border border-y-2 border-x-0 flex flex-col text-sm gap-y-2">
                    <Link href="/profile">
                      <button className="p-2 hover:bg-gray-100 w-full text-start">
                        My Profile
                      </button>
                    </Link>

                    <button className="p-2     { && (hover:bg-gray-100 w-full text-start">
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
                  <button
                    className="p-2 hover:bg-gray-100 w-full text-start"
                    onClick={handleLogout}
                  >
                    signout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className={classNames(
                showNav ? "flex" : "hidden",
                "ml-auto md:flex gap-4 items-center text-sm lg:text-lg"
              )}
            >
              {/* auth buttons */}
              <Link href="/auth/signin">
                <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none border-blue-400 text-primary hover:scale-110 transition ease-in-out duration-200">
                  Login
                </button>
              </Link>

              <Link href="/auth/signup">
                <button className="py-2 px-4 rounded-md border-2 shadow-xl md:shadow-none border-blue-400 bg-primary hover:scale-110 text-white transition ease-in-out duration-200">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NavBar;
