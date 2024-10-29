"use client";
import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books }) {
  return (
    <ul className="my-4 flex flex-col gap-4">
      {books.map((book, index) => (
        <li key={index} className={index === books.length - 1 ? "mb-20" : ""}>
          <BookCard
            id={book.id}
            title={book.title}
            author={book.author}
            pageCount={book.pageCount}
            coverID={book.coverID}
            publishDate={book.publishDate}
            isbn={book.isbn}
            rating={book.rating}
          />
        </li>
      ))}
    </ul>
  );
}
