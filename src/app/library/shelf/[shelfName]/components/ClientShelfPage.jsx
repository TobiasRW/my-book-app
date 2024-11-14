'use client';

import React, { useState } from 'react';
import ShelfBookCard from './ShelfBookCard';

export default function ClientShelfPage({ books: initialBooks, shelfName }) {
  const [books, setBooks] = useState(initialBooks);

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <p className="text-sm font-bold text-textgray">
          {books.length} {books.length === 1 ? 'BOOK' : 'BOOKS'}
        </p>
        <p>Sort by</p>
      </div>

      <div className="my-4 flex flex-col gap-4">
        {books.map((book, index) => (
          <div
            key={book.id}
            className={index === books.length - 1 ? 'mb-20' : ''}
          >
            <ShelfBookCard key={book.id} book={book} shelfName={shelfName} />
          </div>
        ))}
      </div>
    </div>
  );
}
