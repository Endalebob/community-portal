import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "<@>/store/hooks";
import Link from "next/link";
import { MdOutlineClose, MdViewHeadline } from "react-icons/md";
import { useRouter } from "next/router";
import { RootState } from "<@>/store";
import { useAppDispatch } from "<@>/store/hooks";
import { clearToken } from "<@>/store/auth/auth-slice";
import UserAvatar from "../common/UserAvatar";
import { IoNotificationsSharp } from "react-icons/io5";
import { useGetNotificationsQuery } from "<@>/store/notifications/notifications-api";
import { Notification } from "<@>/types/notifications/notifications";
import { MdNotificationAdd } from "react-icons/md";
import classNames from "<@>/utils/classNames";

interface NavDataType {
  student: NavItem[];
  admin: NavItem[];
}
interface NavItem {
  name: string;
  to: string;
  current: boolean;
}

const navData: NavDataType = {
  student: [
    {
      name: "Progress",
      to: "/journey",
      current: false,
    },
    {
      name: "Resources",
      to: "/resources",
      current: false,
    },
    {
      name: "Announcements",
      to: "/announcements",
      current: false,
    },
  ],
  admin: [
    {
      name: "Groups",
      to: "/admin/groups",
      current: true,
    },
    {
      name: "Contests",
      to: "/admin/contests",
      current: false,
    },
    {
      name: "Announcements",
      to: "/announcements",
      current: false,
    },
    {
      name: "Waitlist",
      to: "/admin/waitlist",
      current: false,
    },
    {
      name: "Resources",
      to: "/resources",
      current: false,
    },
  ],
};

const NavBar: React.FC = () => {

  const { asPath } = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [hideNav, setHideNav] = useState<Boolean>(false);
  const role = useAppSelector((state: RootState) => state.auth.role);
  const adminRole = "HeadOfEducation";

  const [navigation, setNavigation] = useState(() => {
    if (role === adminRole) {
      return navData.admin;
    }
    return navData.student;
  });

  useEffect(() => {
    if (role === adminRole) {
      setNavigation(navData.admin);
    } else {
      setNavigation(navData.student);
    }
  }, [role]);
  const { data} = useGetNotificationsQuery();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnreadNotification, setHasUnreadNotification] =
    useState<Boolean>(false);

  const showProfileRef = useRef<HTMLDivElement>(null);
  const showNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearToken());
    router.push("/auth/signin");
  };

  useEffect(() => {
    // remove navbar from pages certain pages
    const urls = ["/", "/auth/signin", "/auth/signup"];
    if (urls.includes(asPath) || router.pathname === "/404") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }

    setNavigation(
      navigation!.map((item) => {
        if (item.to === asPath) {
          return { ...item, current: true };
        } else {
          return { ...item, current: false };
        }
      })
    );
  }, [asPath]);

  const auth = useAppSelector((state: RootState) => state.auth);

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

  // notifications
  useEffect(() => {
    if (isAuthenticated && data?.isSuccess) {
      setNotifications(data.value.items);
    }
  }, [data]);

  useEffect(() => {
    const hasUnreadNotificationValue = notifications.some(
      (notification) => !notification.isRead
    );
    setHasUnreadNotification(hasUnreadNotificationValue);
  }, [notifications]);

  return (
    <>
      <section
        className={classNames(
          hideNav ? "hidden" : "flex",
          "px-4 py-2 border-b items-center"
        )}
      >
        {isAuthenticated ? (
          <div>
            <Image src="/A2SV-Logo.svg" width={105} height={30} alt="logo" />
          </div>
        ) : (
          <Link className="z-30" href="/">
            <div>
              <Image src="/A2SV-Logo.svg" width={105} height={30} alt="logo" />
            </div>
          </Link>
        )}

        <div className="w-full absolute -right-0 flex flex-col md:flex-row md:ml-8 md:static">
          {/* Navigation Links*/}

          {isAuthenticated && (
            <nav
              className={classNames(
                showNav ? "flex" : "hidden",
                "md:flex absolute mt-8 md:mt-0 md:static right-0 bg-white md:ml-0 shadow-xl md:shadow-none p-10 md:p-0 rounded-xl top-8"
              )}
            >
              <div
                ref={showNavRef}
                className="flex flex-col gap-5 z-20 md:m-0 content-between md:flex-row md:items-center md:w-full justify-between"
              >
                {navigation!.map(({ name, to, current }, index) => (
                  <Link
                    key={index}
                    href={to}
                    className={classNames(
                      current ? "text-primary" : "text-primary-text",
                      "text-sm md:text-base font-medium"
                    )}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </nav>
          )}

          {/* Mobile Navigation HumBurger Icon */}

          <div className="flex ml-auto justify-end mr-2">
            {isAuthenticated &&
              (showNav ? (
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
              ))}

            {/* Logged in user profile icon */}
            {isAuthenticated && (
              <div className="flex items-center gap-x-2">
                {hasUnreadNotification ? (
                  <Link href={"/notifications"}>
                    <MdNotificationAdd className="text-primary text-2xl hover:text-blue-600" />
                  </Link>
                ) : (
                  <Link href={"/notifications"}>
                    <IoNotificationsSharp className="text-gray-700 text-2xl hover:text-gray-500" />
                  </Link>
                )}

                <div className="h-5 border mx-1"></div>

                <button
                  className="shadow rounded-full"
                  onClick={() => {
                    setShowProfile(() => !showProfile);
                    setShowNav(false);
                  }}
                >
                  {auth.profilePicture && auth.profilePicture !== "null" ? (
                    <UserAvatar
                      fullName={auth.fullName!}
                      profilePhotoUrl={auth.profilePicture!}
                    />
                  ) : (
                    <UserAvatar fullName={auth.fullName!} profilePhotoUrl="" />
                  )}
                </button>
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              {showProfile && (
                <div
                  className="absolute right-4 z-20 top-16 w-60 rounded-lg shadow-lg flex flex-col p-2 bg-primarybg"
                  ref={showProfileRef}
                >
                  <div className="flex flex-col p-2">
                    <span className="font-medium">{auth.fullName}</span>
                    <span className="text-gray-400">{auth.email}</span>
                  </div>
                  <div className="border border-y-1 border-x-0 flex flex-col gap-y-2">
                    <Link href="/profile">
                      <button className="p-2 hover:bg-gray-100 w-full text-start">
                        My Profile
                      </button>
                    </Link>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 w-full text-start flex gap-2 items-center"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className={classNames(
                showNav || !isAuthenticated ? "flex" : "hidden",
                "ml-auto md:flex items-center space-x-4 text-sm"
              )}
            >
              {/* auth buttons */}
              <Link href="/auth/signin">
                <button className="py-2 px-4 rounded-md border-2  border-primary  text-primary hover:shadow-lg font-bold transition ease-in-out duration-200">
                  Login
                </button>
              </Link>

              <Link href="/auth/signup">
                <button className="py-2 px-4 rounded-md  bg-primary hover:shadow-lg font-bold text-white transition ease-in-out duration-200">
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
