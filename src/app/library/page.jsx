'use client';

import React, { useEffect, useState } from 'react';
import { IoLibrarySharp } from "react-icons/io5";
import { MdOutlineError, MdOutlineArrowForwardIos, MdDelete } from "react-icons/md"; // Added MdDelete
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import InputField from '../components/inputs/InputField';
import Button from '../components/navs/Button';

const modalVariants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
  exit: { y: '100%' }
};

// Variants for the error message
const errorVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 }
};

export default function LibraryPage() {
  const [shelves, setShelves] = useState([]);
  const [shelfName, setShelfName] = useState('');
  const [error, setError] = useState('');
  const [shelfError, setShelfError] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect to fetch shelves on page load
  useEffect(() => {
    const fetchShelves = async () => {
      try {
        // Fetch shelves
        const res = await fetch('/api/shelves');
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
          console.log('Shelves:', data.shelves);
        }
      } catch (err) {
        // Log error and set error message
        console.error('Error fetching shelves:', err);
        setError('An error occurred while fetching shelves.');
      }
    };

    fetchShelves(); // Call fetchShelves function
  }, []); // Empty dependency array to only run once on page load

  // Function to create a new shelf
  const handleCreateShelf = async (e) => {
    e.preventDefault(); // Prevent default (page refresh)

    // Client-side check for duplicate shelf names
    if (shelves.some(shelf => shelf.shelf_name.toLowerCase() === shelfName.toLowerCase())) {
      setShelfError('A shelf with this name already exists.');
      return;
    }

    try {
      // Send POST request to create shelf
      const res = await fetch('/api/shelves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setShelfName(''); // Clear the input after creation
      }
    } catch (err) {
      // Log error and set error message
      console.error('Error creating shelf:', err);
      setError('An error occurred while creating shelf.');
    }
  };

  // Function to delete a shelf
  const handleDeleteShelf = async (shelfName) => {
    if (!window.confirm(`Are you sure you want to delete the shelf "${shelfName}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/shelves/name/${encodeURIComponent(shelfName)}`, {
        method: 'DELETE',
      });
      if (res.status === 401) {
        setIsGuest(true);
        return;
      }
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShelves(shelves.filter(shelf => shelf.shelf_name !== shelfName)); // Remove the deleted shelf
      }
    } catch (err) {
      console.error('Error deleting shelf:', err);
      setError('An error occurred while deleting the shelf.');
    }
  };

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  }

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // UseEffect to clear error after 3 seconds
  useEffect(() => {
    if (error || shelfError) {
      const timer = setTimeout(() => {
        setError(''); // Clear the page-level error
        setShelfError(''); // Clear the modal-specific error
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error, shelfError]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="mt-8 text-3xl font-bold">Your Library</h1>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal fixed inset-0 flex items-end justify-center z-[1000]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            <div className="bg-offwhite dark:bg-darkgray p-6 rounded-t-3xl w-full h-[90vh]">
              <div className="grid grid-cols-3 items-center mb-8">
                <p onClick={closeModal} className="justify-self-start font-satoshi font-light">Cancel</p>
                <h2 className="col-span-1 text-center font-bold">Create shelf</h2>
              </div>
              <form onSubmit={handleCreateShelf} className="mt-10">
                <InputField
                  inputType="secondary"
                  type="text"
                  value={shelfName}
                  onChange={(e) => setShelfName(e.target.value)}
                  placeholder="Enter Shelf Name"
                />
                <Button btnType="third" content="Create Shelf" type="submit" />
              </form>
              <AnimatePresence>
                {shelfError && (
                  <motion.div
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-3 items-center text-darkgray dark:text-offwhite bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-xl mb-4 py-4 text-center italic"
                  >
                    <MdOutlineError className="text-2xl ml-4" />
                    <p className="col-span-1 text-nowrap justify-self-center">{shelfError}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isGuest ? (
        // ... existing code for guest users ...
        <div className="mt-10">
          {/* ... */}
        </div>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-10 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Shelves</h2>
              <p className="text-3xl mr-4 cursor-pointer" onClick={openModal}> + </p>
            </div>
          </div>

          <div className="bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-xl">
            {shelves.map((shelf) => (
              <div key={shelf.shelf_name} // Changed key to shelf_name
                className="py-3 border-b border-lightgray last:border-none flex items-center justify-between"
              >
                <Link
                  href={`/library/shelf/${encodeURIComponent(shelf.shelf_name)}`}
                  className="flex-1"
                >
                  <div className="flex justify-between items-center w-11/12 mx-auto">
                    <p className="truncate text-lg">{shelf.shelf_name}</p>
                    <p className="text-textgray text-sm flex items-center gap-1">
                      {shelf.book_count} <MdOutlineArrowForwardIos />
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => handleDeleteShelf(shelf.shelf_name)}
                  className="text-red-500 ml-4"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
