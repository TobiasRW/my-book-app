"use client";
import React from "react";
import StarRating from "./StarRating";
import Link from "next/link";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ""); // Remove leading or trailing hyphens
}

export default function BookCard({
  title,
  author,
  pageCount,
  publishDate,
  isbn,
  coverID,
  rating,
  id,
}) {
  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  const slug = generateSlug(title);

  return (
    <Link href={`/book/${id}/${slug}`}>
      <div className="mx-auto flex gap-4 sm:w-5/6">
        <img
          src={coverID || defaultCover} // Google Books cover URL or default cover
          alt={title}
          className="aspect-[2/3] w-1/5 rounded-md object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultCover; // Fallback to default cover
          }}
        />

        <div className="flex w-4/5 flex-col overflow-hidden border-b border-lightgray">
          <h2 className="mb-2 truncate text-lg font-bold text-darkgray dark:text-white">
            {title}
          </h2>
          <p className="mb-1 truncate text-base text-lightgray dark:text-textgray">
            {author}
          </p>
          <p className="mb-1 text-sm text-lightgray dark:text-textgray">
            {pageCount} pages
          </p>
          <div className="mb-1 flex gap-1 text-sm text-lightgray dark:text-textgray">
            {rating > 0 ? <StarRating rating={rating} /> : "No Rating"}
          </div>
        </div>
      </div>
    </Link>
  );
}
