"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ReadMoreLess({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: isExpanded ? "auto" : "180px" }}
        transition={{ duration: 0.3 }}
      >
        <p className="p-4 text-base dark:text-offwhite/60">{text}</p>
      </motion.div>
      <button onClick={toggleReadMore} className="px-4 py-4 font-bold">
        {isExpanded ? "Read Less..." : "Read More..."}
      </button>
    </div>
  );
}
