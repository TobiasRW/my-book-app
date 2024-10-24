"use client";

import React, { useEffect, useState } from "react";
import ReccomendedBook from "./RecommendedBook";

export default function Reccomended() {
  const [reccomendedBooks, setReccomendedBooks] = useState([]);

  const recBookIDs = [
    "MyIukohIVRwC", // Wool Hugh Howey
    "OHclhBVv-X4C", // The way of kings Brandon Sanderson
    "nPF9n0SwstMC", // Red Rising Pierce Brown
    "6PqGDwAAQBAJ", // The Rage of Dragons Evan Winter
  ];

  useEffect(() => {
    const fetchBookIDs = async () => {
      try {
        const books = await Promise.all(
          recBookIDs.map(async (id) => {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${id}`,
            );
            const data = await response.json();
            return data;
          }),
        );
        setReccomendedBooks(books);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookIDs();
  }, []);

  return (
    <div className="no-scrollbar flex gap-5 overflow-x-scroll">
      {reccomendedBooks.map((book) => (
        <ReccomendedBook
          key={book.id}
          coverID={book.volumeInfo.imageLinks?.thumbnail}
          title={book.volumeInfo.title}
        />
      ))}
    </div>
  );
}
