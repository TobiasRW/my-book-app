"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalf } from "react-icons/fa"; // Import additional icons


// Slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, '');   // Remove leading and trailing hyphens
}

export default function LibraryBookCard({ book, isEditing, openDeleteModal, status }) {

  const slug = slugify(book.title); // Generate slug from book title
  
  // Helper function to render star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-4 text-lightgray dark:text-offwhite" />);
    }

    // Add half star
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="w-4" />);
    }

    return stars;
  };

  return (
    <Link href={`/library/${encodeURIComponent(status)}/${encodeURIComponent(book.id)}/${slug}`}>
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
                <p className="max-w-60 truncate font-semibold">
                  {book.title}
                </p>
                <p className="font-semibold text-textgray dark:text-lightgray">{book.author}</p>
                
                {/* Display rating */}
                {book.rating !== null && book.rating !== undefined && (
                  <div className="flex items-center mt-1 gap-1">
                    {renderStars(book.rating)}
                  </div>
                )}
              </div>
              
              {/* Show delete button only when isEditing is true */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <TiDelete
                      className="text-2xl text-red-500 cursor-pointer"
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
