'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ShelfPage() {
  const { shelfId } = useParams();
  const [books, setBooks] = useState([]);
  const [shelfName, setShelfName] = useState('');
  const [error, setError] = useState('');

  // Slugify function
  const generateSlug = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)/g, ''); // Remove leading or trailing hyphens
  };

  // UseEffect to fetch books on page load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch books in shelf
        const res = await fetch(`/api/shelves/${shelfId}/books`);
        const data = await res.json();
        
        // Check for errors
        if (data.error) {
          setError(data.error);
        } else {
          const bookIds = data.books.map((book) => book.book_id); // Map over books and extract book_id
          setShelfName(data.shelfName); // Set shelf name

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
  }, [shelfId]); // Dependency array with shelfId to re-run when shelfId changes

  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <h1>{shelfName || 'Shelf'}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {books.map((book) => {
          const slug = generateSlug(book.title);
          return (
            <li key={book.id}>
              <img src={book.coverID} alt={book.title} />
              <p>{book.title}</p>
              <p>{book.author}</p>
              <Link href={`/book/${book.id}/${slug}`}>View Details</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
