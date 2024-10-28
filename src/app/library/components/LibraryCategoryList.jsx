"use client";

import React from "react";
import Link from "next/link";
import { FaBookOpen, FaCheck, FaHeart } from "react-icons/fa";
import { PiArrowFatRightFill } from "react-icons/pi";
import { IoTrashBin, IoLibrary } from "react-icons/io5";

export default function LibraryCategoryList({}) {
  // Array of categories with name, status, and icon
  const categories = [
    { name: "Library", status: "all", icon: <IoLibrary className="h-4 w-4" /> },
    { name: "Currently Reading", status: "currently-reading", icon: <FaBookOpen className="h-4 w-4" /> },
    { name: "To Read", status: "to read", icon: <PiArrowFatRightFill className="h-4 w-4" /> },
    { name: "Finished", status: "finished", icon: <FaCheck className="h-4 w-4" /> },
    { name: "Did Not Finish", status: "dnf", icon: <IoTrashBin className="h-4 w-4" /> },
    { name: "Wishlist", status: "wishlist", icon: <FaHeart className="h-4 w-4" /> },
  ];

  return (
    <div className="rounded-xl bg-offwhite drop-shadow-xl dark:bg-darkgray dark:drop-shadow-none">
      {categories.map((category) => (
        <div
          key={category.status} // Moved key here
          className="flex items-center justify-between border-b border-lightgray py-3 last:border-none"
        >
          <Link
            href={`/library/${encodeURIComponent(category.status)}`}
            className="w-11/12 mx-auto"
          >
            <div className="flex justify-between items-center">
              <p className="truncate text-lg">{category.name}</p>
              <span className="mr-3 text-xl text-primary">{category.icon}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
