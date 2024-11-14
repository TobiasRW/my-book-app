"use client";

import Button from "@/app/components/navs/Button";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineError } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import Link from "next/link";

// Variants for the modal
const modalVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

// Variants for the error message
const errorVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

export default function AddToLibraryButton({ bookId, shelves }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Function to open the modal and fetch shelves
  const openModal = async () => {
    setShowModal(true); // Open modal
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  // Function to add book to shelf
  const handleAddToShelf = async (shelfName) => {
    try {
      // Send POST request to add book to shelf
      const res = await fetch(
        `/api/shelves/name/${encodeURIComponent(shelfName)}/books`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookId }),
        },
      );
      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        closeModal();
      }
    } catch (err) {
      // Log error and set error message
      console.error("Error adding book to shelf:", err);
      setError("An error occurred while adding book to shelf.");
    }
  };

  // UseEffect to clear error after 3 seconds
  useEffect(() => {
    if (error) {
      // Remove error after 3 seconds
      const timer = setTimeout(() => {
        setError(""); // Clear the error
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
            className="modal fixed inset-0 z-[1000] flex items-end justify-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
          >
            <motion.div className="no-scrollbar h-5/6 w-full overflow-y-auto rounded-t-3xl bg-background p-6">
              <div className="mb-8 grid grid-cols-3 items-center">
                <p
                  onClick={closeModal}
                  className="justify-self-start font-satoshi font-light"
                >
                  Cancel
                </p>
                <h2 className="col-span-1 text-center font-bold">Add book</h2>
              </div>

              <div className="">
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Select a shelf
                </h2>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="mb-4 grid grid-cols-3 items-center rounded-xl bg-offwhite py-4 text-center italic text-darkgray drop-shadow-xl dark:bg-darkgray dark:text-offwhite dark:drop-shadow-none"
                    >
                      <MdOutlineError className="ml-4 text-2xl" />
                      <p className="col-span-1 justify-self-center text-nowrap">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="rounded-xl bg-offwhite drop-shadow-xl dark:bg-darkgray dark:drop-shadow-none">
                  {!shelves.length ? (
                    <Link
                      href="/library"
                      className="mb-2 flex w-full items-center justify-center rounded bg-darkgray px-5 py-2.5 font-satoshi font-bold text-offwhite dark:bg-offwhite dark:text-darkgray"
                    >
                      Create a shelf in your library
                    </Link>
                  ) : (
                    shelves.map((shelfName) => (
                      <div
                        key={shelfName}
                        className="grid grid-cols-3 items-center border-b border-lightgray last:border-none"
                        onClick={() => handleAddToShelf(shelfName)}
                      >
                        <ImBooks className="ml-4 text-2xl" />
                        <p className="col-span-1 justify-self-center text-nowrap p-4 text-lg font-semibold">
                          {shelfName}
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
