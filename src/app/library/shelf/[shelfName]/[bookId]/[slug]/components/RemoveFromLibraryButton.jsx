"use client";

import Button from "@/app/components/navs/Button";
import React, { useState, useEffect } from "react";
import { MdOutlineError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Variants for the error message
const errorVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

// Variants for the modal
const modalVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

export default function RemoveFromLibraryButton({ bookId, shelfName }) {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Function to open modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to delete book from shelf
  const handleRemoveFromShelf = async () => {
    // Make sure shelfName is available before proceeding
    if (!shelfName) {
      setError("Shelf name is missing.");
      return;
    }

    try {
      // Send DELETE request to remove book from shelf
      const res = await fetch(
        `/api/shelves/name/${encodeURIComponent(shelfName)}/books`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId }), // Pass bookId correctly
        },
      );
      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        // Redirect to the previous page or show a success message
        router.back();
      }
    } catch (err) {
      console.error("Error removing book from shelf:", err);
      setError("Couldn't remove book from shelf");
    }
  };

  // UseEffect to clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <>
      <Button btnType="primary" content="Remove from shelf" click={openModal} />
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
                <h2 className="col-span-1 text-center font-bold">
                  Remove book
                </h2>
              </div>

              <div className="">
                <h2 className="mb-4 text-center text-2xl font-bold">
                  Are you sure?
                </h2>
                <p className="mb-8 text-center">
                  This will delete the book from the shelf.
                </p>
                <Button
                  btnType="third"
                  content="Remove"
                  click={handleRemoveFromShelf}
                />
                <AnimatePresence>
                  {error && (
                    <motion.div
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="my-4 grid grid-cols-3 items-center rounded-xl bg-offwhite py-4 text-center italic text-darkgray drop-shadow-xl dark:bg-darkgray dark:text-offwhite dark:drop-shadow-none"
                    >
                      <MdOutlineError className="ml-4 text-2xl" />
                      <p className="col-span-1 justify-self-center text-nowrap">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
