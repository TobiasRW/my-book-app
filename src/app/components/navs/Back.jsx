"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Back({ color }) {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const bgStyle = scrolled ? { backgroundColor: color } : {};

  return (
    <motion.div
      className="fixed top-0 z-[100] w-full rounded-b-xl"
      style={bgStyle}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <button
        onClick={() => router.back()}
        className="mx-2 my-4 flex items-center justify-center text-offwhite"
      >
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <polyline points="15 6 9 12 15 18" />
        </svg>{" "}
        <p className="text-offwhite">Back</p>
      </button>
    </motion.div>
  );
}
