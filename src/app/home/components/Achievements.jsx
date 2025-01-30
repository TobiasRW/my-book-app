"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import Button from "@/app/components/navs/Button";

// Import achievement icons (replace with actual paths)
import ach1 from "/public/assets/svg/achv1.svg";
import ach1Gray from "/public/assets/svg/achv1-gray.svg";
import ach5 from "/public/assets/svg/achv5.svg";
import ach5Gray from "/public/assets/svg/achv5-gray.svg";
import ach10 from "/public/assets/svg/achv10.svg";
import ach10Gray from "/public/assets/svg/achv10-gray.svg";
import ach20 from "/public/assets/svg/achv20.svg";
import ach20Gray from "/public/assets/svg/achv20-gray.svg";
import ach50 from "/public/assets/svg/achv50.svg";
import ach50Gray from "/public/assets/svg/achv50-gray.svg";
import ach100 from "/public/assets/svg/achv100.svg";
import ach100Gray from "/public/assets/svg/achv100-gray.svg";

// Modal animation
const modalVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

export default function Achievements() {
  const { user } = useContext(UserContext);
  const [finishedBooks, setFinishedBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Achievement levels
  const achievementLevels = [
    { count: 1, icon: ach1, grayIcon: ach1Gray },
    { count: 5, icon: ach5, grayIcon: ach5Gray },
    { count: 10, icon: ach10, grayIcon: ach10Gray },
    { count: 20, icon: ach20, grayIcon: ach20Gray },
    { count: 50, icon: ach50, grayIcon: ach50Gray },
    { count: 100, icon: ach100, grayIcon: ach100Gray },
  ];

  // Fetch books with status "finished"
  useEffect(() => {
    if (user === "Guest") {
      setLoading(false);
      return;
    }

    const fetchFinishedBooks = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "/api/user_books/library?status=finished",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) throw new Error("Failed to fetch achievements");

        const data = await response.json();
        setFinishedBooks(data.books.length); // Get the count of finished books
      } catch (err) {
        setError("Failed to load achievements.");
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedBooks();
  }, [user]);

  if (user === "Guest") {
    return (
      <div className="mt-4 text-center">
        <p className="mx-auto flex min-h-20 w-11/12 items-center justify-center rounded-lg bg-[#f5f5f5] p-4 text-center font-light italic leading-normal shadow-lg dark:bg-[#121212]">
          Log in to see your achievements!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg bg-[#f5f5f5] p-4 shadow-lg dark:bg-[#121212]">
      {loading ? (
        <p className="text-center text-lg">Loading achievements...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Display only the first 3 achievements */}
          <div className="flex justify-between gap-6 pb-4">
            {achievementLevels.slice(0, 3).map((achievement) => (
              <div
                key={achievement.count}
                className="flex flex-col items-center"
              >
                <Image
                  src={
                    finishedBooks >= achievement.count
                      ? achievement.icon
                      : achievement.grayIcon
                  }
                  alt={`Achievement for ${achievement.count} books`}
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <p className="mt-2 text-sm font-medium">
                  {achievement.count} Books
                </p>
              </div>
            ))}
          </div>

          {/* Show All Button */}
          <div className="mt-4 flex justify-between border-t border-gray-300 pt-4">
            {/* x amount of 6 achievements unlocked */}
            <p className="italic">
              {
                achievementLevels.filter((ach) => finishedBooks >= ach.count)
                  .length
              }{" "}
              out of 6
            </p>
            <p className="font-semibold" onClick={() => setShowModal(true)}>
              Show all{" "}
            </p>
          </div>

          {/* Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                className="modal fixed inset-0 z-[1000] flex items-end justify-center sm:mx-auto sm:w-[430px]"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
              >
                {/* Modal Content */}
                <div className="h-[90svh] w-full rounded-t-3xl bg-offwhite p-6 dark:bg-darkgray">
                  <div className="mb-8 grid grid-cols-3 items-center">
                    <p
                      onClick={() => setShowModal(false)}
                      className="justify-self-start font-satoshi font-light"
                    >
                      Close
                    </p>
                    <h2 className="col-span-1 text-center font-bold">
                      All Achievements
                    </h2>
                  </div>

                  {/* Display all achievements in modal */}
                  <div className="grid grid-cols-3 gap-x-6 gap-y-12 pt-10">
                    {achievementLevels.map((achievement) => (
                      <div
                        key={achievement.count}
                        className="flex flex-col items-center"
                      >
                        <Image
                          src={
                            finishedBooks >= achievement.count
                              ? achievement.icon
                              : achievement.grayIcon
                          }
                          alt={`Achievement for ${achievement.count} books`}
                          width={64}
                          height={64}
                          className="h-16 w-16"
                        />
                        <p className="mt-2 text-sm font-medium">
                          {achievement.count} Books
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="font- pt-10 text-center font-semibold">
                    You have finished{" "}
                    <span className="text-green-400">{finishedBooks}</span>{" "}
                    books. Keep going to unlock more achievements!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
