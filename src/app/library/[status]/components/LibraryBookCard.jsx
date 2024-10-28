"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";


export default function LibraryBookCard({ book, isEditing, openDeleteModal }) {

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
              {/* Show delete button only when isEditing is true */}
              <AnimatePresence>

              {isEditing && (
                <motion.div
               initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                >
                  <TiDelete className="text-2xl text-red-500"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation on click
                      openDeleteModal(book.id); // Trigger modal to confirm deletion
                    }}
                    />
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
