"use client";

import Link from "next/link";
import React from "react";
import { House, MagnifyingGlass, Books } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

export default function () {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 z-[200] w-full bg-offwhite/20 pb-2 pt-1 backdrop-blur-lg dark:bg-darkgray/20 sm:mx-auto sm:w-[430px]">
      <nav className="mx-auto flex h-16 w-11/12 items-center justify-between">
        <Link
          href="/home"
          className="flex w-10 flex-col items-center justify-center"
        >
          <House size={24} weight={pathname === "/" ? "fill" : "regular"} />
          <span className="text-2xs">Home</span>
        </Link>
        <Link
          href="/library"
          className="flex w-10 flex-col items-center justify-center"
        >
          <Books
            size={24}
            weight={pathname === "/shelfs" ? "fill" : "regular"}
          />
          <span className="text-2xs">Library</span>
        </Link>
        <Link
          href="/search-books"
          className="flex w-10 flex-col items-center justify-center"
        >
          <MagnifyingGlass
            size={24}
            weight={pathname === "/search-books" ? "fill" : "regular"}
          />
          <span className="text-2xs">Search</span>
        </Link>
      </nav>
    </header>
  );
}
