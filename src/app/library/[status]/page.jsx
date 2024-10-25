"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LibraryBookCard from "./components/LibraryBookCard";
import Back from "@/app/components/navs/Back";

export default function LibraryCategoryPage() {
  const { status } = useParams(); // Get the status from the URL
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let apiEndpoint = "/api/user_books/library";
        let queryParam = "";

        // Decode the status parameter
        const decodedStatus = decodeURIComponent(status);

        // Set the category name based on decodedStatus
        switch (decodedStatus) {
          case "all":
            setCategoryName("Library");
            break;
          case "currently reading":
            setCategoryName("Currently Reading");
            queryParam = "?status=currently reading";
            break;
          case "to read":
            setCategoryName("To Read");
            queryParam = "?status=to read";
            break;
          case "finished":
            setCategoryName("Finished");
            queryParam = "?status=finished";
            break;
          case "dnf":
            setCategoryName("Did Not Finish");
            queryParam = "?status=dnf";
            break;
          case "wishlist":
            setCategoryName("Wishlist");
            queryParam = "?status=wishlist";
            break;
          default:
            setCategoryName("Library");
        }

        const res = await fetch(`${apiEndpoint}${queryParam}`);
        if (res.status === 401) {
          setError("You must be logged in to view this page.");
          return;
        }
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          // data.books is an array of book IDs
          const bookIds = data.books.map((book) => book.book_id);

          // Fetch book details from external API
          const booksData = await Promise.all(
            bookIds.map(async (id) => {
              const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${id}`,
              );
              const data = await response.json();
              return {
                id: data.id,
                title: data.volumeInfo.title || "No Title",
                author: data.volumeInfo.authors?.join(", ") || "Unknown Author",
                coverID: data.volumeInfo.imageLinks?.thumbnail,
              };
            }),
          );
          setBooks(booksData); // Set books
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("An error occurred while fetching books.");
      }
    };

    fetchBooks(); // Call fetchBooks function
  }, [status]);

  // Function to delete a book from the library
  const handleDeleteFromLibrary = async (bookId) => {
    try {
      const res = await fetch("/api/user_books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      if (res.status === 401) {
        setError("You must be logged in to perform this action.");
        return;
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Remove the deleted book from state
        setBooks(books.filter((book) => book.id !== bookId));
      }
    } catch (err) {
      console.error("Error deleting book from library:", err);
      setError("An error occurred while deleting the book.");
    }
  };

  return (
    <>
      <Back />
      <div className="mx-auto min-h-screen w-11/12 pb-32">
        <h1 className="mt-8 text-center text-3xl font-bold">{categoryName}</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="my-4 flex flex-col gap-6">
          {books.length === 0 ? (
            <p className="text-center">No books in this category.</p>
          ) : (
            books.map((book) => (
              <LibraryBookCard
                key={book.id}
                book={book}
                handleDeleteFromLibrary={handleDeleteFromLibrary}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
