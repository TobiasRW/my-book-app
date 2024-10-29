"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LibraryBookCard from "./components/LibraryBookCard";
import LibraryBookModal from "./components/LibraryBookModal";
import Back from "@/app/components/navs/Back";
import { RiEdit2Fill } from "react-icons/ri";

export default function LibraryCategoryPage() {
  const { status } = useParams(); // Get the status from the URL
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
          case "currently-reading":
            setCategoryName("Currently Reading");
            queryParam = "?status=currently-reading";
            break;
          case "to read":
            setCategoryName("To Read");
            queryParam = "?status=to-read";
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
          // data.books is an array of { book_id, status, rating }
          const booksData = await Promise.all(
            data.books.map(async (book) => {
              const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes/${book.book_id}`
              );
              const data = await response.json();
              return {
                id: data.id,
                title: data.volumeInfo.title || "No Title",
                author: data.volumeInfo.authors?.join(", ") || "Unknown Author",
                coverID: data.volumeInfo.imageLinks?.thumbnail,
                rating: book.rating, // Include rating
                status: book.status, // Include status if needed
              };
            })
          );
          setBooks(booksData); // Set books with rating
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("An error occurred while fetching books.");
      }
    };

    fetchBooks(); // Call fetchBooks function
  }, [status]);

  // Function to delete a book from the library
  const handleDeleteFromLibrary = async () => {
    if (!bookToDelete) return; // Ensure there's a book to delete

    try {
      const res = await fetch("/api/user_books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: bookToDelete }),
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
        setBooks(books.filter((book) => book.id !== bookToDelete));
        closeModal(); // Close the modal after successful deletion
      }
    } catch (err) {
      console.error("Error deleting book from library:", err);
      setError("An error occurred while deleting the book.");
    }
  };

  const openDeleteModal = (bookId) => {
    setBookToDelete(bookId); // Set the book to delete
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setBookToDelete(null); // Clear the book to delete when modal closes
  };

  return (
    <>
      <Back />

      <div className="mx-auto min-h-screen w-11/12 pb-32">
        <h1 className="mt-8 text-center text-3xl font-bold">{categoryName}</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Books in {categoryName}</h2>
            <div className="flex items-center gap-2">
              <RiEdit2Fill
                className="text-xl text-darkgray dark:text-offwhite"
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-col gap-6">
          {books.length === 0 ? (
            <p className="text-center">No books in this category.</p>
          ) : (
            books.map((book) => (
              <LibraryBookCard
                key={book.id}
                book={book}
                isEditing={isEditing}
                openDeleteModal={openDeleteModal} 
                status={status}
              />
            ))
          )}
        </div>
      </div>

      <LibraryBookModal
        isOpen={showModal}
        onConfirm={handleDeleteFromLibrary} 
        onCancel={closeModal}
      />
    </>
  );
}
