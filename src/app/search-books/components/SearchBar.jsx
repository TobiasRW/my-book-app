"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialQuery, initialAuthor }) {
  // Initialize state variables
  const [query, setQuery] = useState(initialQuery || "");
  const [author, setAuthor] = useState(initialAuthor || "");
  const [error, setError] = useState("");

  // Get router for navigation
  const router = useRouter();

  // Function to display error message
  const displayError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent default form submission (page reload)
    e.preventDefault();

    // If query is empty or only whitespace show error message
    if (query.trim() === "") {
      displayError("Please enter a title, author, or ISBN.");
      return;
    }

    // Create URLSearchParams object to build query string
    const params = new URLSearchParams();
    params.append("q", query); // Add q parameter with value of query
    if (author) {
      // If author is provided, adds it as a query parameter.
      params.append("author", author);
    }
    router.push(`/search-books?${params.toString()}`); // Navigate to /search-books + query parameters
  };

  // Function to clear search query
  const clearSearch = () => {
    setQuery("");
    setAuthor("");
    router.push("/search-books"); // Navigate to /search-books
  };

  return (
    <div>
      <div className="mx-auto flex max-w-md items-center gap-3 pt-6">
        <Link
          href="/"
          className="flex items-center justify-center rounded-full bg-offwhite p-1 dark:bg-darkgray"
        >
          <svg
            className="h-6 w-6 text-darkgray dark:text-textgray"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="relative flex h-10 w-full items-center overflow-hidden rounded-xl bg-offwhite focus-within:shadow-lg dark:bg-darkgray"
        >
          <button
            type="submit"
            className="grid h-full w-12 place-items-center text-darkgray dark:text-gray-300"
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
          </button>
          <input
            className="h-full w-full bg-offwhite text-base text-gray-400 outline-none dark:bg-darkgray"
            type="text"
            placeholder="Search by title, author or ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="grid h-full w-12 place-items-center text-darkgray dark:text-gray-300"
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
          </button>
        </form>
      </div>
      {error && (
        <div className="mx-auto mt-10 w-11/12 max-w-md rounded bg-red-500 p-4 text-center text-sm text-white">
          {error}
        </div>
      )}
    </div>
  );
}
