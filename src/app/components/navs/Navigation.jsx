"use client";

import Link from "next/link";
import React from "react";
import { House, MagnifyingGlass, Books } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function () {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 w-full bg-offwhite/20 dark:bg-darkgray/20 backdrop-blur-lg pb-2 pt-1 z-[200]">
      <nav className="flex justify-between w-11/12 mx-auto items-center h-16">
        <Link href="/home" className=" w-10 flex flex-col justify-center items-center">
          <House size={24} weight={pathname === "/" ? "fill" : "regular"}  />
          <span className="text-2xs">Home</span>
        </Link>
        <Link href="/library" className=" w-10 flex flex-col justify-center items-center">
          <Books size={24} weight={pathname === "/shelfs" ? "fill" : "regular"}  />
          <span className="text-2xs">Library</span>
        </Link>
        <Link href="/search-books" className=" w-10 flex flex-col justify-center items-center">
          <MagnifyingGlass size={24} weight={pathname === "/search-books" ? "fill" : "regular"}  />
          <span className="text-2xs">Search</span>
        </Link>
      </nav>
    </header>
  );
}
