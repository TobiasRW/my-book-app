"use client";

import React, { useState, useEffect } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import ShelfList from "./ShelfList";
import ShelfModal from "./ShelfModal";
import LibraryCategoryList from "./LibraryCategoryList";

// Slient side component to create interactive library page
export default function ClientLibraryPage({ initialShelves }) {
  const [shelves, setShelves] = useState(initialShelves || []);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shelfName, setShelfName] = useState("");
  const [error, setError] = useState("");
  const [shelfError, setShelfError] = useState("");

  // Function to create a new shelf
  const handleCreateShelf = async (e) => {
    e.preventDefault();

    // Client-side check for duplicate shelf names
    if (
      shelves.some(
        (shelf) => shelf.shelf_name.toLowerCase() === shelfName.toLowerCase(),
      )
    ) {
      setShelfError("A shelf with this name already exists.");
      return;
    }

    try {
      // Send POST request to create shelf
      const res = await fetch("/api/shelves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shelfName }),
      });

      // Check for unauthorized (guest) status
      if (res.status === 401) {
        setError("You must be logged in to create shelves.");
        return;
      }

      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        setShelves([...shelves, { shelf_name: shelfName, book_count: 0 }]); // Update shelves state
        setShelfName(""); // Clear input field after successful creation
        closeModal(); // Close the modal
      }
    } catch (err) {
      // Log and display error message
      console.error("Error creating shelf:", err);
      setError("An error occurred while creating shelf.");
    }
  };

  // Function to delete a shelf
  const handleDeleteShelf = async (shelfName) => {
    try {
      const res = await fetch(
        `/api/shelves/name/${encodeURIComponent(shelfName)}`,
        {
          method: "DELETE",
        },
      );

      // Check for unauthorized (guest) status
      if (res.status === 401) {
        setError("You must be logged in to delete shelves.");
        return;
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShelves(shelves.filter((shelf) => shelf.shelf_name !== shelfName)); // Remove the deleted shelf from the state
      }
    } catch (err) {
      console.error("Error deleting shelf:", err);
      setError("An error occurred while deleting the shelf.");
    }
  };

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setShelfName("");
    setShelfError("");
  };

  // UseEffect to clear error messages after 3 seconds
  useEffect(() => {
    if (error || shelfError) {
      const timer = setTimeout(() => {
        setError("");
        setShelfError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, shelfError]);

  return (
    <>
      <ShelfModal
        showModal={showModal}
        closeModal={closeModal}
        shelfName={shelfName}
        setShelfName={setShelfName}
        handleCreateShelf={handleCreateShelf}
        shelfError={shelfError}
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Shelves</h2>
          <div className="flex items-center gap-2">
            <p className="mr-4 cursor-pointer text-3xl" onClick={openModal}>
              +
            </p>
            <RiEdit2Fill
              className="text-xl text-darkgray dark:text-offwhite"
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>
        </div>
      </div>

      <ShelfList
        shelves={shelves}
        isEditing={isEditing}
        handleDeleteShelf={handleDeleteShelf}
      />

      <div className="mb-4 mt-10">
        <h2 className="text-2xl font-bold">Library Categories</h2>
      </div>
      <LibraryCategoryList />
    </>
  );
}
