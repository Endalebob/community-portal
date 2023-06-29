import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useAppSelector } from "./store/hooks";
const baseUrl = "https://t-web-project.vercel.app";
=======
const baseUrl = "http://localhost:3001";
>>>>>>> 85b8f12 (add apply)

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");
  let role = req.cookies.get("role");
  let url = req.url;

  if (
    !verify &&
    (url.includes("/admin/announcements") ||
      url.includes("/admin/waitlist") ||
      url.includes("/admin/groups") ||
      url.includes("/journey") ||
      url.includes("/profile") ||
      url.includes("/profile/edit") ||
      url.includes("/resources"))
  ) {
    return NextResponse.redirect(baseUrl + "/auth/signin");
  }

  if (role && role.value === "Student" && url.includes("/admin")) {
    return NextResponse.redirect(baseUrl + "/journey");
  }

  if (role && role.value === "HeadOfEducation" && url.includes("/journey")) {
    return NextResponse.redirect(baseUrl + "/admin/groups");
  }

  if (
    verify &&
    (url.includes("/auth/signin") ||
      url.includes("/auth/signup") ||
      url === baseUrl + "/")
  ) {
    return NextResponse.redirect(baseUrl + "/journey");
  }
}
