import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "../../components/inputs/InputField";
import Button from "../../components/navs/Button";
import { MdOutlineError } from "react-icons/md";
import { Input } from "@/components/ui/input";

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

export default function ShelfModal({
  showModal,
  closeModal,
  shelfName,
  setShelfName,
  handleCreateShelf,
  shelfError,
}) {
  return (
    <>
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
            <div className="h-[90svh] w-full rounded-t-3xl bg-offwhite p-6 dark:bg-darkgray">
              <div className="mb-8 grid grid-cols-3 items-center">
                <p
                  onClick={closeModal}
                  className="justify-self-start font-satoshi font-light"
                >
                  Cancel
                </p>
                <h2 className="col-span-1 text-center font-bold">
                  Create shelf
                </h2>
              </div>
              <form onSubmit={handleCreateShelf} className="mt-10">
                <Input
                  className="mb-4"
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
                    className="mb-4 grid grid-cols-3 items-center rounded-xl bg-offwhite py-4 text-center italic text-darkgray drop-shadow-xl dark:bg-darkgray dark:text-offwhite dark:drop-shadow-none"
                  >
                    <MdOutlineError className="ml-4 text-2xl" />
                    <p className="col-span-1 justify-self-center text-nowrap">
                      {shelfError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
