import Back from "@/app/components/navs/Back";
import Button from "@/app/components/navs/Button";
import ReadMoreLess from "@/app/book/[id]/[slug]/components/ReadMoreLess";
import BookFacts from "@/app/book/[id]/[slug]/components/BookFacts";
import Link from "next/link";
import React from "react";
import sharp from "sharp";
import MoreBooks from "@/app/book/[id]/[slug]/components/MoreBooks";
import AddToLibraryButton from "./components/AddToLibraryButton";
import Image from "next/image";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import createConnection from "@/app/lib/db";

// Revalidate on every request
export const revalidate = 0;

export default async function BookDetailPage({ params }) {
  const { id } = params;

  let book = null;
  let error = "";
  let averageColor = "#2a4b9a"; // Default background color

  let avgR = 42;
  let avgG = 75;
  let avgB = 154;

  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  const API_KEY = process.env.GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`,
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    // Parse the response JSON data
    const data = await response.json();

    // Create a book object with the required details
    book = {
      id: data.id,
      title: data.volumeInfo.title || "No Title",
      author: data.volumeInfo.authors?.join(", ") || "Unknown Author",
      pageCount: data.volumeInfo.pageCount || "N/A",
      publishDate: data.volumeInfo.publishedDate || "N/A",
      publisher: data.volumeInfo.publisher?.replace("Publishing", "") || "N/A",
      isbn: data.volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A",
      coverID: data.volumeInfo.imageLinks?.thumbnail,
      rating: data.volumeInfo.averageRating || "No Rating",
      description: data.volumeInfo.description || "No Description Available",
    };

    // Fetch and process the cover image to get the average color
    if (book.coverID) {
      const imageResponse = await fetch(book.coverID); // Fetch the cover image

      // Check if the response is successful
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch cover image");
      }

      // Convert the image response to an ArrayBuffer
      const imageBuffer = await imageResponse.arrayBuffer();

      // Resize the image to 50x50 pixels and extract the raw pixel data
      const image = sharp(Buffer.from(imageBuffer)).resize(50, 50, {
        fit: "inside",
      });
      const { data: rawData, info } = await image
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Proess pixel data to get the average color
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let count = 0;

      for (let i = 0; i < rawData.length; i += info.channels) {
        const r = rawData[i];
        const g = rawData[i + 1];
        const b = rawData[i + 2];

        // Exclude pixels that are close to white or black
        if (
          !(r > 240 && g > 240 && b > 240) && // Exclude white pixels
          !(r < 15 && g < 15 && b < 15) // Exclude black pixels
        ) {
          totalR += r;
          totalG += g;
          totalB += b;
          count++;
        }
      }

      // Calculate the average color
      if (count > 0) {
        avgR = Math.round(totalR / count);
        avgG = Math.round(totalG / count);
        avgB = Math.round(totalB / count);
        averageColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
      }

      // format publish date to year only
      if (book.publishDate.length > 4) {
        book.publishDate = book.publishDate.slice(0, 4);
      }

      //remove word 'publishing' from publisher
      if (book.publisher.includes("Publishing")) {
        book.publisher = book.publisher.replace("Publishing", "");
      }
    }
  } catch (err) {
    console.error("Error fetching book details:", err);
    error =
      "An error occurred while fetching the book details. Please try again later.";
  }

    // Fetch shelves data on the server
    let shelves = [];
    try {
      // Get the token from the cookies
      const cookieStore = cookies();
      const token = cookieStore.get("token")?.value;
  
      if (token) {
        // Decode the token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
  
        // Create a connection to the database
        const connection = await createConnection();
  
        // Fetch the user's shelves
        const [shelvesRows] = await connection.query(
          "SELECT shelf_name FROM book_shelves WHERE user_id = ?",
          [userId]
        );
  
        shelves = shelvesRows.map((row) => row.shelf_name);
  
        // Close the database connection
        await connection.end();
      } else {
        // Handle unauthenticated case if necessary
      }
    } catch (err) {
      console.error("Error fetching shelves:", err);
      // Handle error if necessary
    }
  

  // Format the description by replacing HTML tags
  const formattedDescription = book?.description
    .replace(/<\/?p>/g, "\n\n") // Replace <p> and </p> with two line breaks
    .replace(/<\/?br>/g, "\n") // Replace <br> with a line break
    .replace(/<\/?[^>]+(>|$)/g, ""); // Remove any other remaining HTML tags

  // Extract primary author
  const primaryAuthor = book?.author.split(",")[0].trim();

  return (
    <div className="min-h-[100svh] pb-32">
      {error && (
        <div className="mx-auto mt-10 w-11/12 max-w-md rounded bg-red-500 p-4 text-center text-sm text-white">
          {error}
        </div>
      )}
      <Back color={averageColor} />
      <section
        className="flex flex-col items-center justify-center gap-2 pb-10 pt-20"
        style={{
          background: `linear-gradient(to bottom, ${averageColor} 70%, rgba(${avgR + 30}, ${avgG + 30}, ${avgB + 30}, 1) 100%)`,
        }}
      >
        <Image
          width={64}
          height={96}
          src={book?.coverID || defaultCover}
          className="aspect-[2/3] w-2/6 rounded-md object-cover drop-shadow-xl"
          alt={`${book?.title} cover`}
        />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{book?.title}</h1>
          <p className="mb-1 text-base text-offwhite/60">{book?.author}</p>
        </div>

        {/* <Button content="+ Add to library" btnType="primary" /> */}
        <AddToLibraryButton bookId={book.id} shelves={shelves}/>
      </section>
      <section className="-mt-5 w-full rounded-t-[1.75rem] bg-background">
        <div className="mx-auto flex w-10/12 flex-col gap-4 pt-10">
          <h2 className="truncate text-lg font-bold">About: {book?.title}</h2>
          <div className="rounded-2xl bg-offwhite drop-shadow-xl dark:bg-darkgray dark:drop-shadow-none">
            <ReadMoreLess text={formattedDescription} />
            <BookFacts book={book} />
          </div>
          <MoreBooks
            primaryAuthor={primaryAuthor}
            currentBookId={book.id}
            currentTitle={book.title}
          />
        </div>
      </section>
      <Link
        href={`https://www.amazon.com/s?k=${book.title + " " + primaryAuthor}`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 flex items-center justify-center"
      >
        <Button content="Buy on Amazon" btnType="secondary" />
      </Link>
    </div>
  );
}
