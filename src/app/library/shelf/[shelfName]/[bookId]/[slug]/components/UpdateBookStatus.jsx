"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaBookOpen, FaCheck, FaHeart } from "react-icons/fa6";
import { PiArrowFatRightFill } from "react-icons/pi";
import { IoTrashBin } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

export default function UpdateBookStatus({ bookId }) {
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  // Function to get the appropriate icon based on the status value
  const getStatusIcon = (value) => {
    switch (value) {
      case "currently reading":
        return <FaBookOpen className="h-4 w-4" />;
      case "to read":
        return <PiArrowFatRightFill className="h-4 w-4" />;
      case "finished":
        return <FaCheck className="h-4 w-4" />;
      case "dnf":
        return <IoTrashBin className="h-4 w-4" />;
      case "wishlist":
        return <FaHeart className="h-4 w-4" />;
      default:
        return <BsThreeDots className="h-4 w-4" />;
    }
  };

  // Function to display the selected status text
  const displaySelectedText = (value) => {
    switch (value) {
      case "currently reading":
        return "Reading";
      case "to read":
        return "To Read";
      case "finished":
        return "Finished";
      case "dnf":
        return "Did Not Finish";
      case "wishlist":
        return "Wishlist";
      default:
        return "Status";
    }
  };

  // useEffect to fetch the current book status and rating when the component mounts
  useEffect(() => {
    const fetchUserBookData = async () => {
      try {
        const res = await fetch(`/api/user_books?bookId=${bookId}`);
        const data = await res.json();
        if (data.error) {
          setMessage(data.error);
        } else {
          setStatus(data.status || ""); // Set status
          setRating(data.rating !== null ? data.rating : ""); // Set rating if not null
        }
      } catch (err) {
        console.error("Error fetching user book data:", err);
        setMessage("An error occurred while fetching book data.");
      }
    };

    fetchUserBookData();
  }, [bookId]);

   // Function to handle saving the status and rating
  const handleSave = async () => {
    try {
      // Validate the status and rating inputs before proceeding
      if (!status) {
        setMessage("Please select a valid status.");
        return;
      }

      // Check if rating is provided and is between 1 and 5
      if (rating && (rating < 1 || rating > 5)) {
        setMessage("Rating must be between 1 and 5.");
        return;
      }

      // Send a POST request to save the status and rating
      const res = await fetch("/api/user_books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: bookId,
          status,
          rating: rating ? parseInt(rating) : null,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Status and rating saved successfully.");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      }
    } catch (err) {
      console.error("Error saving status and rating:", err);
      setMessage("An error occurred while saving.");
    }
  };

  return (
    <div className="my-4">
      <div className="flex flex-col justify-center items-center">
        <Select value={status} onValueChange={setStatus} className="">
          <SelectTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200/30">
            {getStatusIcon(status)}
          </SelectTrigger>

          <SelectContent
               side="top"
               align="center"
               className="bg-darkgray w-48"
               
          >
            <SelectItem value="currently reading">
              <div className="flex items-center gap-4">
                {getStatusIcon("currently reading")}
                <span className="ml-2">Reading</span>
              </div>
            </SelectItem>
            <SelectItem value="to read">
              <div className="flex items-center gap-4">
                {getStatusIcon("to read")}
                <span className="ml-2">To Read</span>
              </div>
            </SelectItem>
            <SelectItem value="finished">
              <div className="flex items-center gap-4">
                {getStatusIcon("finished")}
                <span className="ml-2">Finished</span>
              </div>
            </SelectItem>
            <SelectItem value="dnf">
              <div className="flex items-center gap-4">
                {getStatusIcon("dnf")}
                <span className="ml-2">Did Not Finish</span>
              </div>
            </SelectItem>
            <SelectItem value="wishlist">
              <div className="flex items-center gap-4">
                {getStatusIcon("wishlist")}
                <span className="ml-2">Wishlist</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Display the selected status text beneath the trigger */}
        <div className="mt-2 text-center text-sm">
          {displaySelectedText(status)}
        </div>
      </div>

      <div className="my-4">
        <label htmlFor="rating" className="block text-sm font-medium">
          Rating (1-5):
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-darkgray dark:text-offwhite"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Save
      </button>

      {message && (
        <div className="mt-2 rounded bg-green-100 p-2 text-green-700 dark:bg-green-900 dark:text-green-200">
          {message}
        </div>
      )}
    </div>
  );
}
