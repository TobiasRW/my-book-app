"use client";
import React, { useState } from "react";

export default function SearchBar({ setBooks, setLoading }) {
  // State to store the search query (title, author or ISBN)
  const [query, setQuery] = useState("");

  const searchBooks = async () => {
    // If there's no query, do nothing
    if (!query) return;

    setBooks([]);
    setLoading(true);

    try {
      // Remove any dashes in the query to normalize ISBN input
      const cleanQuery = query.replace(/-/g, "");

      // Check if the query is a valid ISBN (10 or 13 digits)
      const isISBN = /^\d{10}(\d{3})?$/.test(cleanQuery);

      // If it's an ISBN, search by ISBN, otherwise search by title
      const searchType = isISBN ? "isbn" : "title";

      // Fetch books from the Open Library API
      const response = await fetch(
        `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(
          query
        )}&limit=5`
      );

      // Parse the response as JSON
      const data = await response.json();

      // Simplify the book data to only include the necessary fields
      const simplifiedBooks = data.docs.map((book) => ({
        title: book.title || "No Title",
        author: book.author_name?.join(", ") || "Unknown Author",
        pageCount: book.number_of_pages_median || "N/A",
        publishDate: book.first_publish_year || "N/A",
        isbn: book.isbn ? book.isbn[0] : "N/A",
        coverID: book.cover_i || null,
      }));

      // Update the books state with the simplified book data
      setBooks(simplifiedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear the search query and results
  const clearSearch = () => {
    setQuery("");
    setBooks([]);
  }

  return (
    <div className="max-w-md w-11/12 mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-darkgray overflow-hidden">
        <div
          className="grid place-items-center h-full w-12 text-gray-300"
          onClick={searchBooks}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="h-full w-full outline-none text-sm text-gray-400 bg-darkgray"
          type="text"
          placeholder="Search by title, author or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchBooks();
          }}
        />
        <div
          className="grid place-items-center h-full w-12 text-gray-300"
          onClick={clearSearch}
        >
          <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>
    </div>
  );
}
