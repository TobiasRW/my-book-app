'use client';
import React from 'react';
import BookCard from './BookCard'; 

export default function BookList({ books }) {
  return (
    <ul className="flex flex-col gap-4 my-4">
      {books.map((book, index) => (
        <li key={index} className="">
          <BookCard
            title={book.title}
            author={book.author}
            pageCount={book.pageCount}
            coverID={book.coverID}
          />
        </li>
      ))}
    </ul>
  );
}
