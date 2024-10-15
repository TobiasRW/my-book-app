'use client';

import Button from '@/app/components/navs/Button';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineError } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import Link from 'next/link';

// Variants for the modal
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

export default function AddToLibraryButton({ bookId }) {
  const [showModal, setShowModal] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [error, setError] = useState('');

  // Function to open the modal and fetch shelves
  const openModal = async () => {
    setShowModal(true); // Open modal
    try {
      // Fetch shelves
      const res = await fetch('/api/shelves');
      const data = await res.json();
      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        setShelves(data.shelves); // Set shelves
      }
    } catch (err) {
      // Log error and set error message
      console.error('Error fetching shelves:', err);
      setError('An error occurred while fetching shelves.');
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setError('');
  };

  // Function to add book to shelf
  const handleAddToShelf = async (shelfId) => {
    // console.log('Adding to shelf:', shelfId); // Debugging line
    try {
      // Send POST request to add book to shelf
      const res = await fetch(`/api/shelves/${shelfId}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        closeModal();
      }
    } catch (err) {
      // Log error and set error message
      console.error('Error adding book to shelf:', err);
      setError('An error occurred while adding book to shelf.');
    }
  };

  // UseEffect to clear error after 3 seconds
  useEffect(() => {
    if (error) {
      // Remove error after 3 seconds
      const timer = setTimeout(() => {
        setError(''); // Clear the error
      }, 3000);

      // Cleanup timer on unmount or when error changes
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return (
    <>
      <Button btnType="primary" content="+ Add to library" click={openModal} />
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
          <motion.div className="bg-background p-6 rounded-t-3xl w-full h-5/6 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-3 items-center mb-8">
              <p onClick={closeModal} className="justify-self-start font-satoshi font-light">Cancel</p>
              <h2 className="col-span-1 text-center font-bold">Add book</h2>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold mb-4 text-center">Select a shelf</h2>
              <AnimatePresence>
                {error && (
                  <motion.div
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-3 items-center text-darkgray dark:text-offwhite bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-xl mb-4 py-4 text-center italic"
                  >
                    <MdOutlineError className="text-2xl ml-4" />
                    <p className="col-span-1 text-nowrap justify-self-center">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-xl">
                {!shelves.length ? (
                  <Link
                    href="/library"
                    className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2">
                    Create a shelf in your library
                  </Link>
                ) : (
                  shelves.map((shelf) => (
                    <div
                      key={shelf.shelf_id}
                      className="grid grid-cols-3 items-center border-b border-lightgray last:border-none"
                      onClick={() => handleAddToShelf(shelf.shelf_id)}
                    >
                      <ImBooks className="text-2xl ml-4" />
                      <p className="p-4 font-semibold text-lg col-span-1 text-nowrap justify-self-center">
                        {shelf.shelf_name}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
