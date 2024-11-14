"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { FaStar, FaStarHalf } from "react-icons/fa";

export default function UpdateBookStatusClient({ bookId, initialData }) {
    const router = useRouter();
    const [status, setStatus] = useState(initialData.status || "");
    const [rating, setRating] = useState(initialData.rating || "");
    const [message, setMessage] = useState("");

      // Function to format the rating value
  const formatRating = (value) => {
    if (value && value.endsWith(".0")) {
      return value.slice(0, -2); // Remove the trailing ".0"
    }
    return value;
  };

  // Function to get the appropriate icon based on the status value
  const getStatusIcon = (value) => {
    switch (value) {
      case "currently-reading":
        return <FaBookOpen className="h-4 w-4" />;
      case "to-read":
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
      case "currently-reading":
        return "Reading";
      case "to-read":
        return "To Read";
      case "finished":
        return "Finished";
      case "dnf":
        return "DNF";
      case "wishlist":
        return "Wishlist";
      default:
        return "Status";
    }
  };

    const handleSave = async () => {
        try {
          // Validate inputs
          if (!status) {
            setMessage("Please select a valid status.");
            return;
          }
    
          const ratingValue = rating ? parseFloat(rating) : null;
          if (rating && (ratingValue < 0 || ratingValue > 5)) {
            setMessage("Rating must be between 0 and 5.");
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
              rating: ratingValue,
            }),
          });
    
          const data = await res.json();
          if (data.error) {
            setMessage(data.error);
          } else {
            setMessage("");
            router.refresh();
          }
        } catch (err) {
          console.error("Error saving status and rating:", err);
          setMessage("An error occurred while saving.");
        }
      };
    
      // Call handleSave when status or rating changes
      useEffect(() => {
        if (status) {
          handleSave();
        }
      }, [status, rating]);

    return (
        <div className="my-4 flex gap-10">
        <div className="flex flex-col items-center justify-center">
          <Select value={status} onValueChange={setStatus} className="">
            <SelectTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200/30">
              {getStatusIcon(status)}
            </SelectTrigger>
  
            <SelectContent side="top" align="center" className="w-48 bg-darkgray">
              <SelectItem value="currently-reading">
                <div className="flex items-center gap-4">
                  {getStatusIcon("currently-reading")}
                  <span className="ml-2">Reading</span>
                </div>
              </SelectItem>
              <SelectItem value="to-read">
                <div className="flex items-center gap-4">
                  {getStatusIcon("to-read")}
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
  
        <div className="">
          <Select value={rating} onValueChange={setRating} className="ml-4">
            <SelectTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200/30">
              <SelectValue>{formatRating(rating)}</SelectValue>
              <FaStar />
            </SelectTrigger>
  
            <SelectContent side="bottom" align="center" className="w-48 bg-darkgray">
              <SelectItem value="0.5">
                <div className="flex gap-4">
                  <span className="w-6">0.5</span>
                  <div className="flex items-center gap-1">
                    <FaStarHalf />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="1">
                <div className="flex gap-4">
                  <span className="w-6">1</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="1.5">
                <div className="flex gap-4">
                  <span className="w-6">1.5</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStarHalf />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="2">
                <div className="flex gap-4">
                  <span className="w-6">2</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="2.5">
                <div className="flex gap-4">
                  <span className="w-6">2.5</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="3">
                <div className="flex gap-4">
                  <span className="w-6">3</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="3.5">
                <div className="flex gap-4">
                  <span className="w-6">3.5</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="4">
                <div className="flex gap-4">
                  <span className="w-6">4</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="4.5">
              <div className="flex gap-4">
                <span className="w-6">4.5</span>
                <div className="flex items-center gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>
              </div>
              </SelectItem>
              <SelectItem value="5">
                <div className="flex gap-4">
                  <span className="w-6">5</span>
                  <div className="flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
  
          <div className="mt-2 text-center text-sm">Rating</div>
        </div>
  
        {message && (
          <div className="mt-2 rounded bg-red-100 p-2 text-red-700 dark:bg-red-900 dark:text-red-200">
            {message}
          </div>
        )}
      </div>
    )
}