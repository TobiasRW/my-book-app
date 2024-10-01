"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchBar({ setBooks, setLoading }) {
  // State to store the search query (title, author or ISBN)
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // Function to display an error message for 5 seconds
  const displayError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  // Function to search for books using the Google Books API
  const searchBooks = async () => {
    // If there's no query, display an error message
    if (!query) {
      displayError("Please enter a title, author or ISBN.");
      return;
    }

    // Clear the books state and set loading to true
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

      // If there are no items in the response, display error message
      if (!data.items || data.items.length === 0) {
        displayError("No books found.");
        return;
      }

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
      displayError(
        "An error occurred while fetching books. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to clear the search query and results
  const clearSearch = () => {
    setQuery("");
    setAuthor("");
    setBooks([]);
  };

  return (
    <div className="">
      <div className="max-w-md mx-auto flex gap-3 items-center pt-6">
        <Link
          href="/"
          className="bg-darkgray rounded-full flex justify-center items-center p-1"
        >
          <svg
            class="h-6 w-6 text-textgray"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </Link>
        <div className="relative flex items-center w-full h-10 rounded-xl focus-within:shadow-lg bg-darkgray overflow-hidden">
          <div
            className="grid place-items-center h-full w-12 text-gray-300"
            onClick={searchBooks}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
              className="h-5 w-5"
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
      {error && (
        <div className="max-w-md w-11/12 mx-auto bg-red-500 text-white text-sm text-center p-4 rounded mt-10">
          {error}
        </div>
      )}
    </div>
  );
}
