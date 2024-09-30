'use client';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookList from '../components/show-books/BookList';

export default function SearchBooksPage () {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen">
      <SearchBar setBooks={setBooks} setLoading={setLoading} />
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </div>
      )}
      {books.length > 0 && <BookList books={books} />}
    </div>
  )
}