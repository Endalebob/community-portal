import Image from "next/image";
import React from "react";
import Link from "next/link";

interface NavItem {
  name: string;
  to: string;
}
const NavBar: React.FC = () => {
  const navData: NavItem[] = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Contests",
      to: "/contests",
    },
    {
      name: "Your Progress",
      to: "/your-progress",
    },
  ];

  return (
    <section className="flex items-center p-4 justify-between">
      <div>
        <Image src="/a2sv-logo.png" width={105} height={30} alt={""} />
      </div>
      <nav className="ml-5 mr-auto">
        <ul className="flex gap-x-8">
          {navData.map(({ name, to }) => (
            <Link href={to}>{name}</Link>
          ))}
        </ul>
      </nav>

      {/* buttons */}
      <div className="flex gap-5">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Light
        </button>
        <button className="py-2 px-4 rounded-md border-2 border-blue-400 text-blue-400 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 ">
          Login
        </button>
        <button className="py-2 px-4 rounded-md border-2 bg-blue-400 text-white">
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default NavBar;
