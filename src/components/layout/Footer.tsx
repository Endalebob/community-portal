import Link from "next/link";
import Image from "next/image";
import {
  RiTelegramLine,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiFacebookCircleLine,
  RiTwitterLine,
} from "react-icons/ri";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-10 items-start md:flex-row justify-between md:items-center py-10 px-20 mt-auto border-t-2 border-gray-100">
      <div className="flex flex-col space-y-5 items-start">
        <Image src="/A2SV-Logo.svg" alt="logo" width={150} height={150} />
        <p className="text-sm text-gray-500">
          © Copyright 2023 A2SV Foundation. All rights reserved.
        </p>
      </div>
      <div className="flex justify-between items-center space-x-10">
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href=""
          target="_blank"
        >
          <RiTelegramLine className="" />
        </Link>

        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"/"}
          target="_blank"
        >
          <RiInstagramLine />
        </Link>
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"/"}
          target="_blank"
        >
          <RiTwitterLine />
        </Link>
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"/"}
          target="_blank"
        >
          <RiLinkedinBoxFill />
        </Link>

        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"/"}
          target="_blank"
        >
          <RiFacebookCircleLine />
        </Link>
      </div>
    </div>
  );
};

export default Footer;