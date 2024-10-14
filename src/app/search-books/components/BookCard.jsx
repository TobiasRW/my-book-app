"use client";
import React from "react";
import StarRating from "./StarRating";
import Link from "next/link";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ''); // Remove leading or trailing hyphens
}

export default function BookCard({ title, author, pageCount, publishDate, isbn, coverID, rating, id }) {
  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  const slug = generateSlug(title);

  return (
    <Link href={`/book/${id}/${slug}`}>
      <div className="flex gap-4 sm:w-5/6 mx-auto">
        <img
          src={coverID || defaultCover} // Google Books cover URL or default cover
          alt={title}
          className="w-1/5 rounded-md aspect-[2/3] object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultCover; // Fallback to default cover
          }}
        />

        <div className="flex flex-col w-4/5 border-b border-lightgray overflow-hidden">
          <h2 className="text-lg font-bold mb-2 text-darkgray dark:text-white truncate">{title}</h2>
          <p className="text-base mb-1 text-lightgray dark:text-textgray truncate">{author}</p>
          <p className="text-sm mb-1 text-lightgray dark:text-textgray">{pageCount} pages</p>
          <div className="text-sm mb-1 text-lightgray dark:text-textgray flex gap-1">
            {rating > 0 ? <StarRating rating={rating} /> : "No Rating"}
          </div>
        </div>
      </div>
    </Link>
  );
}
