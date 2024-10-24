// components/moreBooks/MoreBooks.jsx

import React from "react";
import MoreBookList from "@/app/book/[id]/[slug]/components/MoreBookList";

export default async function MoreBooks({
  primaryAuthor,
  currentBookId,
  currentTitle,
}) {
  const API_KEY = process.env.GOOGLE_API_KEY;
  let moreBooks = []; // Empty array to store more books by the author
  let moreBooksError = ""; // Empty string to store error messages

  const searchQuery = `inauthor:${encodeURIComponent(primaryAuthor)}`;

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${API_KEY}&maxResults=40&orderBy=relevance&langRestrict=en&printType=books`,
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch more books by the author");
    }

    // Parse the response JSON data
    const data = await response.json();

    // Create an array of simplified book objects
    moreBooks = (data.items || [])
      // Filter out unwanted books
      .filter(
        (item) =>
          item.id !== currentBookId &&
          item.volumeInfo.industryIdentifiers &&
          item.volumeInfo.industryIdentifiers.length > 0 &&
          item.volumeInfo.pageCount > 0 &&
          item.volumeInfo.title !== currentTitle &&
          !item.volumeInfo.title.includes(primaryAuthor) &&
          item.volumeInfo.language === "en" &&
          item.volumeInfo.authors.length === 1,
      )
      // Map over the filtered items to create simplified book objects
      .map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "No Title",
        author: item.volumeInfo.authors.join(", "),
        pageCount: item.volumeInfo.pageCount,
        publishDate: item.volumeInfo.publishedDate || "N/A",
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A",
        coverID: item.volumeInfo.imageLinks?.thumbnail,
        language: item.volumeInfo.language || "N/A",
      }))
      .slice(0, 10);

    if (moreBooks.length === 0) {
      moreBooksError = "We don't have more books by " + primaryAuthor;
    }
  } catch (error) {
    console.error("Error fetching more books:", error);
    moreBooksError = "No more books by " + primaryAuthor + " found.";
  }

  return (
    <div className="">
      <h2 className="mt-4 truncate text-lg font-bold">
        More by {primaryAuthor}
      </h2>
      <div className="no-scrollbar flex gap-5 overflow-x-scroll">
        {moreBooksError && (
          <div className="my-4 w-full rounded-xl bg-darkgray p-4 text-center text-offwhite">
            {moreBooksError}
          </div>
        )}
        {moreBooks.length > 0 && <MoreBookList books={moreBooks} />}
      </div>
    </div>
  );
}
