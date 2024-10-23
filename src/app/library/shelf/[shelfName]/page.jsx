'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ShelfBookCard from './components/ShelfBookCard';
import Link from 'next/link';

export default function ShelfPage() {
  const { shelfName } = useParams(); // Changed to use shelfName
  const [books, setBooks] = useState([]);
  const [retrievedShelfName, setRetrievedShelfName] = useState('');
  const [error, setError] = useState('');



  // UseEffect to fetch books on page load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch books in shelf using shelfName
        const res = await fetch(`/api/shelves/name/${encodeURIComponent(shelfName)}/books`);
        const data = await res.json();

        // Check for errors
        if (data.error) {
          setError(data.error);
        } else {
          const bookIds = data.books.map((book) => book.book_id); // Map over books and extract book_id
          setRetrievedShelfName(data.shelfName); // Set shelf name

          // Fetch book details
          const booksData = await Promise.all(
            bookIds.map(async (id) => { // Map over bookIds and fetch book details
              const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${id}`
              );
              const data = await response.json();
              return {
                id: data.id,
                title: data.volumeInfo.title || 'No Title',
                author: data.volumeInfo.authors?.join(', ') || 'Unknown Author',
                coverID: data.volumeInfo.imageLinks?.thumbnail,
              };
            })
          );
          setBooks(booksData); // Set books
        }
      } catch (err) {
        // Log error and set error message
        console.error('Error fetching books in shelf:', err);
        setError('An error occurred while fetching books in shelf.');
      }
    };

    fetchBooks(); // Call fetchBooks function
  }, [shelfName]); // Dependency array with shelfName

  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <h1 className="mt-8 text-3xl font-bold">{retrievedShelfName || 'Shelf'}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <div className="flex justify-between items-center py-4">
          <p className="text-textgray font-bold text-sm">{books.length} {books.length === 1 ? 'BOOK' : 'BOOKS'}</p>
          <p>sort by</p>
        </div>

        <div className="flex flex-col gap-6 my-4">
          {books.map((book) => (
            <ShelfBookCard key={book.id} book={book} shelfName={shelfName}/>
          ))}
        </div>

      </div>
    </div>
  );
}
