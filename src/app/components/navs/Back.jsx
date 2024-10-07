'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Back() {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
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

  const bgClass = scrolled ? 'bg-darkgray/20 backdrop-blur-lg' : '';

  return (
    <motion.div
      className={`fixed top-0 w-full ${bgClass}`}
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <button onClick={() => router.back()} className="mx-2 my-4 text-offwhite flex justify-center items-center">
        <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="15 6 9 12 15 18" /></svg> <p>Back</p>
      </button>
    </motion.div>
  );
}
