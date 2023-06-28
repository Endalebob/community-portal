import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

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
        "flex-col gap-y-10 items-center md:flex-row justify-between md:items-center py-6 px-20 mt-auto bg-zinc-100"
      )}
    >
      <div className="flex items-center gap-4">
        <Image src="/A2SV-Logo.svg" alt="logo" width={90} height={90} />
        <span className="text-sm text-center text-gray-500">
          © 2023 A2SV Foundation. All rights reserved.
        </span>
      </div>
      <div className="flex justify-between items-center space-x-6">
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href="https://t.me/a2svofficial"
          target="_blank"
        >
          <FaTelegram />
        </Link>

        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href="http://www.instagram.com/a2sv_org"
          target="_blank"
        >
          <FaInstagram />
        </Link>
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"https://twitter.com/A2_SV"}
          target="_blank"
        >
          <FaTwitter />
        </Link>
        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"http://www.linkedin.com/company/a2sv"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>

        <Link
          className="text-gray-500 hover:text-primary text-xl"
          href={"/https://www.facebook.com/profile.php?id=100085473798621"}
          target="_blank"
        >
          <FaFacebook />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
