"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../../context/UserContext"; // Import UserContext

export default function ReadingNow() {
  const { user } = useContext(UserContext); // Access user context
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultCover = "/assets/img/default-cover.webp";

  // Fetch books with status "currently-reading"
  const handleGetReadingNow = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/user_books/library?status=currently-reading",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      const userBooks = data.books;

      const enrichedBooks = await Promise.all(
        userBooks.map(async (book) => {
          try {
            const bookResponse = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${book.book_id}`,
            );
            const bookData = await bookResponse.json();

            return {
              id: bookData.id,
              title: bookData.volumeInfo?.title || "No Title",
              author:
                bookData.volumeInfo?.authors?.join(", ") || "Unknown Author",
              coverImage:
                bookData.volumeInfo?.imageLinks?.thumbnail || defaultCover,
              rating: book.rating || "No rating",
              status: book.status,
            };
          } catch (err) {
            console.error("Error fetching book details:", err);
            return null;
          }
        }),
      );

      setBooks(enrichedBooks.filter((book) => book !== null));
    } catch (error) {
      console.error("Error fetching reading now books:", error);
      setError("An error occurred while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user !== "Guest") {
      handleGetReadingNow();
    }
  }, [user]);

  if (user === "Guest") {
    return (
      <div className="mr-4 mt-4">
        <p className="mx-auto flex min-h-20 w-full items-center justify-center rounded-lg bg-[#f5f5f5] p-4 text-center font-light italic leading-normal shadow-lg dark:bg-[#121212]">
          You must be logged in to see your reading progress.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-4 flex items-center">
      {loading && (
        <p className="mt-4 w-full rounded-lg bg-[#f5f5f5] p-4 text-center text-lg shadow-lg dark:bg-[#121212]">
          Loading books...
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <div className="hide-scroll-bar flex gap-6 overflow-x-auto whitespace-nowrap px-4 pb-6 pt-2">
        {books.length > 0
          ? books.map((book) => (
              <Link
                href={`/library/currently-reading/${book.id}/${book.title}`}
                key={book.id}
                className="flex w-[250px] flex-shrink-0 items-center gap-4 rounded-lg bg-[#f5f5f5] p-4 shadow-lg dark:bg-[#121212]"
              >
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={64}
                  height={96}
                  className="aspect-[2/3] w-14 rounded-lg object-cover"
                />
                <div className="mt-2 overflow-hidden">
                  <h3 className="truncate text-lg font-medium">{book.title}</h3>
                  <p className="font-semibold text-textgray dark:text-lightgray">
                    by {book.author}
                  </p>
                </div>
              </Link>
            ))
          : !loading && (
              <p className="flex min-h-20 w-screen items-center justify-center rounded-lg bg-[#f5f5f5] p-4 font-light italic leading-normal shadow-lg dark:bg-[#121212]">
                Start reading your next book!
              </p>
            )}
      </div>
    </div>
  );
}
