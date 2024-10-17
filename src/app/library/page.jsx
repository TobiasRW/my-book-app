'use client';

import React, { useEffect, useState } from 'react';
import { IoLibrarySharp } from "react-icons/io5";
import { MdOutlineError, MdOutlineArrowForwardIos} from "react-icons/md";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import InputField from '../components/inputs/InputField';
import Button from '../components/navs/Button';


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


export default function LibraryPage() {
  const [shelves, setShelves] = useState([]);
  const [shelfName, setShelfName] = useState('');
  const [error, setError] = useState('');
  const [shelfError, setShelfError] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect to fetch shelves on page load
  useEffect(() => {
    const fetchShelves = async () => {
      try {
        // Fetch shelves
        const res = await fetch('/api/shelves');
        // Check for unauthorized (guest) status
        if (res.status === 401) {
          setIsGuest(true);
          return;
        }
        const data = await res.json();

        // Check for errors
        if (data.error) {
          setError(data.error);
        } else {
          setShelves(data.shelves); // Set shelves
          console.log('Shelves:', data.shelves);
        }
      } catch (err) {
        // Log error and set error message
        console.error('Error fetching shelves:', err);
        setError('An error occurred while fetching shelves.');
      }
    };

    fetchShelves(); // Call fetchShelves function
  }, []); // Empty dependency array to only run once on page load

  // Function to create a new shelf
  const handleCreateShelf = async (e) => {
    e.preventDefault(); // Prevent default (page refresh)

    // Client-side check for duplicate shelf names
    if (shelves.some(shelf => shelf.shelf_name.toLowerCase() === shelfName.toLowerCase())) {
      setShelfError('A shelf with this name already exists.');
      return;
    }

    try {
      // Send POST request to create shelf
      const res = await fetch('/api/shelves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shelfName }),
      });
      // Check for unauthorized (guest) status
      if (res.status === 401) {
        setIsGuest(true);
        return;
      }
      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        setShelves([...shelves, { shelf_id: data.shelfId, shelf_name: shelfName }]); // Add new shelf to shelves
        setShelfName(''); // Clear the input after creation
      }
    } catch (err) {
      // Log error and set error message
      console.error('Error creating shelf:', err);
      setError('An error occurred while creating shelf.');
    }
  };

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  }

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // UseEffect to clear error after 3 seconds
  useEffect(() => {
    if (error || shelfError) {
      const timer = setTimeout(() => {
        setError(''); // Clear the page-level error
        setShelfError(''); // Clear the modal-specific error
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error, shelfError]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="mt-8 text-3xl font-bold">Your Library</h1>

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

      {isGuest ? (
        <div className="mt-10">
          <div className="flex flex-col gap-2">
            <p className="text-xl italic">Welcome to the Library!</p>
            <p className="text-lg font-light">To save and organize your books, please create an account or log in. Your personal library is just a click away!</p>
          </div>
          <div className="flex flex-col gap-8 mt-10">
            <Link href="/" className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2">Log in</Link>
            <Link href="/sign-up" className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2">Sign up</Link>
          </div>
          <div className="mt-14 flex flex-col gap-8">
            <IoLibrarySharp className="text-6xl self-center" />
            <p className="text-lg font-light">With your account, you can create custom shelves, organize your books, and track your reading progress. Start building your personal library today!</p>
          </div>
        </div>

      ) : (

        <>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-10 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Shelves</h2>
              <p className="text-3xl mr-4" onClick={openModal} > + </p>
            </div>
          </div>



          <div className="bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-xl">
            {shelves.map((shelf) => (
              <div key={shelf.shelf_id}
                className="py-3 border-b border-lightgray last:border-none"
              >
                <Link
                  href={`/library/shelf/${shelf.shelf_id}/${shelf.shelf_name}`}
                  className=""
                >
                  <div className="flex justify-between items-center w-11/12 mx-auto">
                    <p className="truncate text-lg">{shelf.shelf_name}</p>
                    <p className="text-textgray text-sm flex items-center gap-1">{shelf.book_count} <MdOutlineArrowForwardIos /></p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </>
      )}

    </div>
  );
}
