import React from "react";
import Link from "next/link";
import { FaStar, FaStarHalf } from "react-icons/fa";

export default function ShelfBookCard({ book, shelfName }) {
  // Slugify function
  const generateSlug = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)/g, ""); // Remove leading or trailing hyphens
  };

  const slug = generateSlug(book.title);

  // Helper function to render star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={i} className="w-4 text-lightgray dark:text-offwhite" />,
      );
    }

    // Add half star
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half" className="w-4" />);
    }

    return stars;
  };

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
              {/* Display rating */}
              {book.rating !== null && book.rating !== undefined && (
                <div className="mt-1 flex items-center gap-1">
                  {renderStars(book.rating)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
