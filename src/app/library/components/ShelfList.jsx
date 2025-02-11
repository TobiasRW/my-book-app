import React from "react";
import ShelfItem from "./ShelfItem";
import { AnimatePresence } from "framer-motion";

export default function ShelfList({ shelves, isEditing, handleDeleteShelf }) {
  return (
    <AnimatePresence>
      <div className="rounded-xl bg-offwhite drop-shadow-xl dark:bg-darkgray dark:drop-shadow-none">
        {shelves.map((shelf) => (
          <ShelfItem
            key={shelf.shelf_name}
            shelf={shelf}
            isEditing={isEditing}
            handleDeleteShelf={handleDeleteShelf}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
