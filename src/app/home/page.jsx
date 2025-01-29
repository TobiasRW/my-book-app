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
        <h2 className="font-satoshi text-2xl font-light">Reading Now</h2>
        <ReadingNow />
      </div>
      <div className=" ">
        <h2 className="mb-4 font-satoshi text-2xl font-light">Recommended</h2>
        {/* <Reccomended /> */}
      </div>
      {/* <div className="flex justify-center mt-10">
        <div className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem]">
          <LogoAnimation width="100%" />
        </div>
      </div> */}
      <div className=""></div>
    </div>
  );
}
