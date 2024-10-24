"use client";

import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
import ShelfModal from "./components/ShelfModal";
import ShelfList from "./components/ShelfList";
import GuestView from "./components/GuestView";

export default function LibraryPage() {
  const [shelves, setShelves] = useState([]);
  const [shelfName, setShelfName] = useState("");
  const [error, setError] = useState("");
  const [shelfError, setShelfError] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect to fetch shelves on page load
  useEffect(() => {
    const fetchShelves = async () => {
      try {
        // Fetch shelves
        const res = await fetch("/api/shelves");
        // Check for unauthorized (guest) status
        if (res.status === 401) {
          setIsGuest(true);
          return;
        }
        const data = await res.json();

        // Check for errors
        if (data.error) {
          setError(data.error);
        } else {
          setShelves(data.shelves); // Set shelves
          console.log("Shelves:", data.shelves);
        }
      } catch (err) {
        // Log error and set error message
        console.error("Error fetching shelves:", err);
        setError("An error occurred while fetching shelves.");
      }
    };

    fetchShelves(); // Call fetchShelves function
  }, []); // Empty dependency array to only run once on page load

  // Function to create a new shelf
  const handleCreateShelf = async (e) => {
    e.preventDefault(); // Prevent default (page refresh)

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
        setIsGuest(true);
        return;
      }
      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        setShelves([...shelves, { shelf_name: shelfName }]); // Updated to remove shelf_id
        setShelfName(""); // Clear the input after creation
        closeModal(); // Close the modal
      }
    } catch (err) {
      // Log error and set error message
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
      if (res.status === 401) {
        setIsGuest(true);
        return;
      }
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShelves(shelves.filter((shelf) => shelf.shelf_name !== shelfName)); // Remove the deleted shelf
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
  };

  // UseEffect to clear error after 3 seconds
  useEffect(() => {
    if (error || shelfError) {
      const timer = setTimeout(() => {
        setError(""); // Clear the page-level error
        setShelfError(""); // Clear the modal-specific error
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error, shelfError]);

  return (
    <div className="mx-auto w-11/12">
      <h1 className="mt-8 text-3xl font-bold">Your Library</h1>

      <ShelfModal
        showModal={showModal}
        closeModal={closeModal}
        shelfName={shelfName}
        setShelfName={setShelfName}
        handleCreateShelf={handleCreateShelf}
        shelfError={shelfError}
      />

      {isGuest ? (
        <GuestView />
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4 mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Shelves</h2>
              <div className="flex items-center gap-2">
                <p className="mr-4 cursor-pointer text-3xl" onClick={openModal}>
                  {" "}
                  +{" "}
                </p>
                <RiEdit2Fill
                  className="text-xl text-darkgray dark:text-offwhite"
                  onClick={() => setIsEditing(!isEditing)}
                />
              </div>
            </div>
          </div>

          {/* List of user shelfs */}
          <ShelfList
            shelves={shelves}
            isEditing={isEditing}
            handleDeleteShelf={handleDeleteShelf}
          />
        </>
      )}
    </div>
  );
}
