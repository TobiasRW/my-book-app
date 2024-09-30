'use client'

import React, { useEffect, useState } from 'react';
import ReccommendedBook from './ReccommendedBook';

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
    <div>
      {reccomendedBooks.map((book) => (
        <ReccommendedBook
          coverID={book.coverID}
        />
      ))}
    </div>
  );
}
