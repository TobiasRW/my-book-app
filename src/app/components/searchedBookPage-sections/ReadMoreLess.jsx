'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ReadMoreLess({ text }) {
    const [isExpanded, setIsExpanded] = useState(false);


    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <div>
            <motion.div
                className='overflow-hidden'
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '180px' }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-base text-offwhite/60 p-4">
                    {text}
                </p>
            </motion.div>
            <button onClick={toggleReadMore} className="font-bold py-4 px-4">
                {isExpanded ? 'Read Less...' : 'Read More...'}
            </button>
        </div>
    );
}
