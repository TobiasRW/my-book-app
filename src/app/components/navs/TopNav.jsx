
import React from "react";
import Link from "next/link";

export default function TopNav() {
  return (
    <>
      <header className="flex justify-between w-11/12 mx-auto mt-4">
        <div className="p-1 bg-offwhite rounded-full flex justify-center items-center">
          <svg
            class="h-5 w-5 text-background"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <Link
          href="/search-books"
          className="p-1 bg-offwhite rounded-full flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-background"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>
      </header>
    </>
  );
}
