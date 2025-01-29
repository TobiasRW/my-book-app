// LibraryBookModal.js
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/app/components/navs/Button";

const modalVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

export default function LibraryBookModal({ isOpen, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal fixed inset-0 z-[1000] flex items-end justify-center sm:mx-auto sm:w-[430px]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
        >
          <div className="h-[90svh] w-full rounded-t-3xl bg-offwhite p-6 dark:bg-darkgray">
            <div className="mb-8 grid grid-cols-3 items-center">
              <p
                onClick={onCancel}
                className="cursor-pointer justify-self-start font-satoshi font-light"
              >
                Cancel
              </p>
              <h2 className="col-span-1 justify-self-center text-nowrap text-center font-bold">
                Confirm Delete
              </h2>
            </div>
            <div className="mb-4 text-center">
              <p>Are you sure you want to delete this book?</p>
            </div>
            <Button btnType="third" content="Yes, Delete" click={onConfirm} />
            <div className="mt-10 text-center">
              <p>
                This will delete the book from your library and all of your
                shelves. This action cannot be undone.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
