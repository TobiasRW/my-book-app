import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import LogOutBtn from "./components/LogOutBtn";
import ToggleTheme from "./components/ToggleTheme";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
export default function SettingsPage() {
  const cookieStore = cookies(); // Access cookies form the request using the cookies() method from Next.js
  const token = cookieStore.get("token")?.value; // Retrieve the token cookie value from the cookies, if available

  if (!token) {
    // If no token is present, redirect to the sign-in page
    redirect("/");
  } else {
    try {
      // Verify the token using the JWT secret key
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // If the token is invalid, redirect to the sign-in page
      redirect("/");
    }
  }

  return (
    <div className="mx-auto mt-4 w-11/12">
      <Link href="/home" className="flex">
        <svg
          className="h-6 w-6 text-darkgray dark:text-offwhite"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p>home</p>
      </Link>
      <div className="mt-4">
        <h1 className="mb-4 text-2xl font-bold">Settings</h1>
      </div>
      <section className="mt-4 rounded-2xl bg-offwhite drop-shadow-xl dark:bg-darkgray dark:drop-shadow-none">
        <div className="border-b border-lightgray p-4">
          <LogOutBtn />
        </div>
        <div className="flex items-center justify-between p-4">
          <p>Toggle Theme</p>
          <ToggleTheme />
        </div>
      </section>
    </div>
  );
}
