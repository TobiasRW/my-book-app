'use client'

import React, { useEffect, useState } from 'react';
import ReccomendedBook from '../show-books/ReccomendedBook';

export default function Reccomended() {
  const [reccomendedBooks, setReccomendedBooks] = useState([]);

  const recBookIDs = [
    "oCpYuc1dfPAC", // Wool Hugh Howey
    "OHclhBVv-X4C", // The way of kings Brandon Sanderson
    "nPF9n0SwstMC"  // Red Rising Pierce Brown
  ];

  useEffect(() => {
    const fetchBookIDs = async () => {
      try {
        const books = await Promise.all(
          recBookIDs.map(async (id) => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = await response.json();
            return data;
          })
        );
        setReccomendedBooks(books);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookIDs();
  }, []);

  return (
    <div className='flex gap-5 overflow-x-scroll no-scrollbar'>
      {reccomendedBooks.map((book) => (
        <ReccomendedBook
          key={book.id}
          coverID={book.volumeInfo.imageLinks?.thumbnail} // Corrected: Access the thumbnail correctly
          title={book.volumeInfo.title} // Accessing title from volumeInfo
        />
      ))}
    </div>
  );
}
