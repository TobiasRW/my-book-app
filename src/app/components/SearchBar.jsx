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
    if (author) { // If author is provided, adds it as a query parameter.
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
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full h-10 rounded-xl focus-within:shadow-lg bg-darkgray overflow-hidden"
        >
          <button
            type="submit"
            className="grid place-items-center h-full w-12 text-gray-300"
          ></button>
          <input
            className="h-full w-full outline-none text-sm text-gray-400 bg-darkgray"
            type="text"
            placeholder="Search by title, author or ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
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
          </button>
        </form>
      </div>
      {error && (
        <div className="max-w-md w-11/12 mx-auto bg-red-500 text-white text-sm text-center p-4 rounded mt-10">
          {error}
        </div>
      )}
    </div>
  );
}
