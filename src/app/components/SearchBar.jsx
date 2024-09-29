"use client";
import React, { useState } from "react";

export default function SearchBar({ setBooks, setLoading }) {
  // State to store the search query (title, author or ISBN)
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const searchBooks = async () => {
    // If there's no query, do nothing
    if (!query) return;

    setBooks([]);
    setLoading(true);

    try {

      let searchQuery;

      const isbnRegex = /^(?:\d{10}|\d{13})$/;
      if (isbnRegex.test(query)) {
        searchQuery = `isbn:${encodeURIComponent(query)}`;
      } else {
        // If it's not an ISBN, search by title and author
        searchQuery = `intitle:${encodeURIComponent(query)}`;
        if (author) {
          searchQuery += `+inauthor:${encodeURIComponent(author)}`;
        }
      }
      

      const response = await fetch(
       `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${API_KEY}&maxResults=10&orderBy=relevance`
      );

      // Parse the response as JSON
      const data = await response.json();

      // Simplify the book data to only include the necessary fields
      const simplifiedBooks = data.items.map((item) => ({
        title: item.volumeInfo.title || "No Title",
        author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        pageCount: item.volumeInfo.pageCount || "N/A",
        publishDate: item.volumeInfo.publishedDate || "N/A",
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A",
        coverID: item.volumeInfo.imageLinks?.thumbnail,
        rating: item.volumeInfo.averageRating || "No Rating",
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
    setAuthor("");
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
