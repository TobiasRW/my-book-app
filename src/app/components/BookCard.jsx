'use client';
import React from 'react';

export default function BookCard({ title, author, pageCount, publishDate, isbn, coverID }) {
  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  return (
    <div className="flex gap-4 w-11/12 sm:w-5/6 mx-auto ">
      <img
        src={coverID ? `https://covers.openlibrary.org/b/id/${coverID}-M.jpg` : defaultCover}
        alt={title}
        className=" w-1/5 rounded-md aspect-[2/3] object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultCover; // Fallback to default cover
        }}
      />
      
      <div className="flex flex-col w-4/5 border-b border-lightgray">
        <h2 className="text-lg font-bold mb-1 text-white">{title}</h2>
        <p className="text-base mb-1 text-textgray">{author}</p>
        <p className="text-sm mb-1 text-textgray">{pageCount} pages</p>
      </div>
    </div>
  );
}
