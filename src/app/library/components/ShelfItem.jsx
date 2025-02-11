import React from "react";
import { TiDelete } from "react-icons/ti";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ShelfItem({ shelf, isEditing, handleDeleteShelf }) {
  return (
    <div className="flex items-center justify-between border-b border-lightgray py-3 last:border-none">
      <Link
        href={`/library/shelf/${encodeURIComponent(shelf.shelf_name)}`}
        className="flex-1"
        onClick={(e) => {
          if (isEditing) {
            e.preventDefault();
          }
        }}
      >
        <div className="mx-auto flex w-11/12 items-center justify-between">
          <div className="flex gap-2">
            {isEditing && (
              <motion.button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when deleting
                  handleDeleteShelf(shelf.shelf_name);
                }}
                className="text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <TiDelete className="text-2xl" />
              </motion.button>
            )}
            <motion.p
              className="truncate text-lg"
              initial={{ x: 0 }}
              animate={{ x: isEditing ? 10 : 0 }}
            >
              {shelf.shelf_name}
            </motion.p>
          </div>
          <p className="flex items-center gap-1 text-sm text-textgray">
            {shelf.book_count} <MdOutlineArrowForwardIos />
          </p>
        </div>
      </Link>
    </div>
  );
}
