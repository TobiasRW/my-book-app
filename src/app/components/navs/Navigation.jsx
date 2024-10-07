"use client";

import Link from "next/link";
import React from "react";
import { House, MagnifyingGlass, Books } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function () {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 w-full bg-darkgray/20 backdrop-blur-lg pb-2 pt-1">
      <nav className="flex justify-between w-11/12 mx-auto items-center h-16">
        <Link href="/" className=" w-10 flex flex-col justify-center items-center">
          <House size={28} weight={pathname === "/" ? "fill" : "regular"}  />
          <span className="text-xs">Home</span>
        </Link>
        <Link href="/shelfs" className=" w-10 flex flex-col justify-center items-center">
          <Books size={28} weight={pathname === "/shelfs" ? "fill" : "regular"}  />
          <span className="text-xs">Shelfs</span>
        </Link>
        <Link href="/search-books" className=" w-10 flex flex-col justify-center items-center">
          <MagnifyingGlass size={26} weight={pathname === "/search-books" ? "fill" : "regular"}  />
          <span className="text-xs">Search</span>
        </Link>
      </nav>
    </header>
  );
}