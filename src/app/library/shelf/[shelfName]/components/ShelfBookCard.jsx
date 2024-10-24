import React from "react";
import Link from "next/link";

export default function ShelfBookCard({ book, shelfName }) {
  // Slugify function
  const generateSlug = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)/g, ""); // Remove leading or trailing hyphens
  };

  const slug = generateSlug(book.title);

  return (
    <Link
      href={`/library/shelf/${encodeURIComponent(shelfName)}/${encodeURIComponent(book.id)}/${slug}`}
    >
      <div className="flex">
        <div className="flex w-full items-center gap-4">
          <img
            src={book.coverID}
            alt={book.title}
            className="aspect-[2/3] w-16 rounded-lg object-cover"
          />
          <div className="h-full w-full">
            <div className="flex h-full flex-col justify-center border-b border-darkgray">
              <p className="max-w-60 truncate font-semibold text-textgray">
                {book.title}
              </p>
              <p className="font-semibold text-lightgray">{book.author}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
