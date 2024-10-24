"use client";
import React from "react";
import MoreBookCard from "./MoreBookCard";

export default function MoreBookList({ books }) {
  return (
    <ul className="my-4 flex gap-4">
      {books.map((book, index) => (
        <li key={index} className="">
          <MoreBookCard
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
