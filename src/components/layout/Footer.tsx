import Link from "next/link";
import Image from "next/image";
import {
  RiTelegramLine,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiFacebookCircleLine,
  RiTwitterLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Footer: React.FC = () => {
  const { asPath } = useRouter();

  const [hideNav, setHideNav] = useState<Boolean>(false);

  useEffect(() => {
    // remove navbar from pages certain pages
    if (["/auth/signin", "/auth/signup"].includes(asPath)) {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  }, [asPath]);

  return (
    <div
      className={classNames(
        hideNav ? "hidden" : "flex",
        "flex-col gap-y-10 items-start md:flex-row justify-between md:items-center py-10 px-20 mt-auto border-t-2 border-gray-100 bg-slate-100"
      )}
    >
      <div className="flex flex-col space-y-5 items-start">
        <Image src="/A2SV-Logo.svg" alt="logo" width={150} height={150} />
        <p className="text-sm text-gray-500">
          © Copyright 2023 A2SV Foundation. All rights reserved.
        </p>
      </div>
      <div className="flex justify-between items-center space-x-10">
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href="https://t.me/a2svofficial"
          target="_blank"
        >
          <RiTelegramLine />
        </Link>

        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href="http://www.instagram.com/a2sv_org"
          target="_blank"
        >
          <RiInstagramLine />
        </Link>
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"https://twitter.com/A2_SV"}
          target="_blank"
        >
          <RiTwitterLine />
        </Link>
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"http://www.linkedin.com/company/a2sv"}
          target="_blank"
        >
          <RiLinkedinBoxFill />
        </Link>

        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"/https://www.facebook.com/profile.php?id=100085473798621"}
          target="_blank"
        >
          <RiFacebookCircleLine />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
