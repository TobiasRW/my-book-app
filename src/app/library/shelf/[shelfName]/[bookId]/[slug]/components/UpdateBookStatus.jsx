import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import createConnection from "@/app/lib/db";
import UpdateBookStatusClient from "./UpdateBookStatusClient";


export default async function UpdateBookStatus({ bookId }) {
  // Get the token from the cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // Handle unauthenticated case
    return null; // or render a message or redirect as needed
  }

  // Decode the token to get the user ID
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  // Fetch data from the database
  let connection;
  try {
    connection = await createConnection();

    // Fetch the user's status and rating for the book
    const [rows] = await connection.query(
      "SELECT status, rating FROM user_books WHERE user_id = ? AND book_id = ?",
      [userId, bookId]
    );

    const userBookData = rows.length > 0 ? rows[0] : { status: "", rating: "" };

    // Close the database connection
    await connection.end();

    // Pass the data to the client component
    return (
      <UpdateBookStatusClient bookId={bookId} initialData={userBookData} />
    );
  } catch (error) {
    console.error("Error fetching user book data:", error);
    return null; // Or handle the error as needed
  } finally {
    if (connection) await connection.end();
  }
}
