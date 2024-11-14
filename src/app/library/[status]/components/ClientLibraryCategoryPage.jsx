"use client";

import React, { useState } from "react";
import LibraryBookCard from "./LibraryBookCard";
import LibraryBookModal from "./LibraryBookModal";
import { RiEdit2Fill } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";

export default function ClientLibraryCategoryPage({
  books: initialBooks,
  error: initialError,
  categoryName,
  status,
}) {
  const [books, setBooks] = useState(initialBooks || []);
  const [error, setError] = useState(initialError || "");
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to delete a book from the library
  const handleDeleteFromLibrary = async () => {
    if (!bookToDelete) return;

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
        closeModal();
      }
    } catch (err) {
      console.error("Error deleting book from library:", err);
      setError("An error occurred while deleting the book.");
    }
  };

  const openDeleteModal = (bookId) => {
    setBookToDelete(bookId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setBookToDelete(null);
  };

  return (
    <div className="mx-auto mt-16 min-h-[100vh] w-11/12">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{categoryName}</h2>
          <div className="flex items-center gap-2">
            <RiEdit2Fill
              className="text-xl text-darkgray dark:text-offwhite"
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>
        </div>
      </div>

      <div className="my-8 flex flex-col gap-4">
        {books.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
            <IoLibrarySharp className="self-center text-6xl" />
            <h3 className="text-center text-2xl font-bold">
              This category is empty
            </h3>
            <p className="w-3/4 text-center text-textgray">
              Add new books or existing ones from your library or shelves.
            </p>
          </div>
        ) : (
          books.map((book, index) => (
            <div
              key={book.id}
              className={index === books.length - 1 ? "mb-20" : ""}
            >
              <LibraryBookCard
                key={book.id}
                book={book}
                isEditing={isEditing}
                openDeleteModal={openDeleteModal}
                status={status}
              />
            </div>
          ))
        )}
      </div>

      <LibraryBookModal
        isOpen={showModal}
        onConfirm={handleDeleteFromLibrary}
        onCancel={closeModal}
      />
    </div>
  );
}
