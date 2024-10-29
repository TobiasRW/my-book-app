"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ShelfBookCard from "./components/ShelfBookCard";

export default function ShelfPage() {
  const { shelfName } = useParams(); // Changed to use shelfName
  const [books, setBooks] = useState([]);
  const [retrievedShelfName, setRetrievedShelfName] = useState("");
  const [error, setError] = useState("");

  // UseEffect to fetch books on page load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch books in shelf using shelfName
        const res = await fetch(
          `/api/shelves/name/${encodeURIComponent(shelfName)}/books`,
        );
        const data = await res.json();

        // Check for errors
        if (data.error) {
          setError(data.error);
        } else {
          const booksData = await Promise.all(
            data.books.map(async (book) => {
              // Fetch book details from Google Books API
              const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${book.book_id}`,
              );
              const bookData = await response.json();
              return {
                id: bookData.id,
                title: bookData.volumeInfo.title || "No Title",
                author:
                  bookData.volumeInfo.authors?.join(", ") || "Unknown Author",
                coverID:
                  bookData.volumeInfo.imageLinks?.thumbnail ||
                  "/placeholder.png",
                rating: book.rating, // Include rating
                status: book.status, // Include status if needed
              };
            }),
          );
          setRetrievedShelfName(data.shelfName); // Set shelf name
          setBooks(booksData); // Set books with rating
        }
      } catch (err) {
        // Log error and set error message
        console.error("Error fetching books in shelf:", err);
        setError("An error occurred while fetching books in shelf.");
      }
    };

    fetchBooks(); // Call fetchBooks function
  }, [shelfName]); // Dependency array with shelfName

  return (
    <div className="mx-auto min-h-[100svh] w-11/12">
      <h1 className="mt-8 text-3xl font-bold">
        {retrievedShelfName || "Shelf"}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <div className="flex items-center justify-between py-4">
          <p className="text-sm font-bold text-textgray">
            {books.length} {books.length === 1 ? "BOOK" : "BOOKS"}
          </p>
          <p>sort by</p>
        </div>

        <div className="my-4 flex flex-col gap-6">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={index === books.length - 1 ? "mb-20" : ""}
            >
              <ShelfBookCard key={book.id} book={book} shelfName={shelfName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
