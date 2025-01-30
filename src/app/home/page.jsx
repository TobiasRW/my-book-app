"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Reccomended from "./components/Recommended";
import TopNav from "../components/navs/Back";
import { IoIosSettings } from "react-icons/io";
import { PiSignInFill } from "react-icons/pi";
import ReadingNow from "./components/ReadingNow";
import { FaBookOpen, FaCheck, FaHeart } from "react-icons/fa";
import { TbTrophyFilled } from "react-icons/tb";
import Achievements from "./components/Achievements";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-4">
      <div className="mt-8 flex items-center justify-between">
        <h1 className="font-satoshi text-3xl font-bold">Book Buddy</h1>
        {user !== "Guest" && (
          <Link
            href="/settings"
            className="rounded-full bg-offwhite p-1 text-xl text-darkgray dark:bg-darkgray dark:text-offwhite"
          >
            <IoIosSettings />
          </Link>
        )}
        {user === "Guest" && (
          <Link
            href="/"
            className="rounded-full bg-offwhite p-1 text-xl text-darkgray dark:bg-darkgray dark:text-offwhite"
          >
            <PiSignInFill />
          </Link>
        )}
      </div>
      <div className="pt-5">
        <div className="rounded-lg bg-[#f5f5f5] p-4 shadow-lg dark:bg-[#121212]">
          <p className="text-lg font-semibold">Hi there {user}! 👋</p>
          <p className="mt-4 line-clamp-3 font-light italic leading-normal">
            Welcome to Book Buddy, the best app to track your reading. Explore
            our large collection of books and start tracking your reading
            progress today!
          </p>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex items-center gap-4">
          <h2 className="font-satoshi text-2xl font-light">Reading Now</h2>
          <FaBookOpen className="h-5 w-5" />
        </div>
        <ReadingNow />
      </div>
      <div className="pb-20 pt-5">
        <div className="flex items-center gap-4">
          <h2 className="font-satoshi text-2xl font-light">Achievements</h2>
          <TbTrophyFilled className="h-6 w-6" />
        </div>
        <Achievements />
      </div>

      <div className=""></div>
    </div>
  );
}
