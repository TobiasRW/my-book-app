"use client";
import React from "react";
import Link from "next/link";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ''); // Remove leading or trailing hyphens
}

export default function MoreookCard({ title, author, pageCount, publishDate, isbn, coverID, rating, id }) {
  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  const slug = generateSlug(title);

  return (
    <Link href={`/book/${id}/${slug}`}>
      <div className=" sm:w-5/6 mx-auto">
        <img
          src={coverID || defaultCover} // Google Books cover URL or default cover
          alt={title}
          className="w-20 rounded-md aspect-[2/3] object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultCover; // Fallback to default cover
          }}
        />

        <div className="flex flex-col w-20 ">
          <p className=" text-sm mb-2 text-darkgray dark:text-white truncate">{title}</p>
        </div>
      </div>
    </Link>
  );
}
