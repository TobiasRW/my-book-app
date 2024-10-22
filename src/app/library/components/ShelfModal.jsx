import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputField from '../../components/inputs/InputField';
import Button from '../../components/navs/Button';
import { MdOutlineError } from 'react-icons/md';

const modalVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' }
};

// Variants for the error message
const errorVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
};


export default function ShelfModal({ showModal, closeModal, shelfName, setShelfName, handleCreateShelf, shelfError }) {
    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="modal fixed inset-0 flex items-end justify-center z-[1000]"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                    >
                        <div className="bg-offwhite dark:bg-darkgray p-6 rounded-t-3xl w-full h-[90vh]">
                            <div className="grid grid-cols-3 items-center mb-8">
                                <p onClick={closeModal} className="justify-self-start font-satoshi font-light">Cancel</p>
                                <h2 className="col-span-1 text-center font-bold">Create shelf</h2>
                            </div>
                            <form onSubmit={handleCreateShelf} className="mt-10">
                                <InputField
                                    inputType="secondary"
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
                                        className="grid grid-cols-3 items-center text-darkgray dark:text-offwhite bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-xl mb-4 py-4 text-center italic"
                                    >
                                        <MdOutlineError className="text-2xl ml-4" />
                                        <p className="col-span-1 text-nowrap justify-self-center">{shelfError}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}