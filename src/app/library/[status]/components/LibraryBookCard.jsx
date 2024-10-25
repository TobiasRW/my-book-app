"use client";

import React from "react";
import Link from "next/link";
import { RiDeleteBinLine } from "react-icons/ri";

export default function LibraryBookCard({ book, handleDeleteFromLibrary }) {
  return (
    <Link href={`/book/${book.id}/${encodeURIComponent(book.title)}`}>
      <div className="flex">
        <div className="flex w-full items-center gap-4">
          <img
            src={book.coverID}
            alt={book.title}
            className="aspect-[2/3] w-16 rounded-lg object-cover"
          />
          <div className="h-full w-full">
            <div className="flex h-full border-b border-darkgray justify-between items-center">
              <div className="flex flex-col justify-center ">
                <p className="max-w-60 truncate font-semibold text-textgray">
                  {book.title}
                </p>
                <p className="font-semibold text-lightgray">{book.author}</p>
              </div>
              <div className="">
                <RiDeleteBinLine
                  className="cursor-pointer text-xl text-red-500 mr-4"
                  onClick={() => handleDeleteFromLibrary(book.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
