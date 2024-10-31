import React from "react";
import ClientLibraryPage from "./components/ClientLibraryPage";
import GuestView from "./components/GuestView";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import createConnection from "../lib/db";

// Server-side component to render the library page and get shelves data
export default async function LibraryPage() {
  let connection;
  try {
    // Retrieve the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, render GuestView
    if (!token) {
      return <GuestView />;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Fetch shelves data from the database
    connection = await createConnection();
    const [rows] = await connection.query("CALL GetShelves(?)", [userId]);
    const shelves = rows[0];

    // Pass shelves data to the client component
    return (
      <div className="mx-auto min-h-[100vh] w-11/12 pb-32">
        <h1 className="mt-8 text-3xl font-bold">Your Library</h1>
        <ClientLibraryPage initialShelves={shelves} />
      </div>
    );
  } catch (error) {
    console.error("Error getting shelves:", error);
    return <p>Error loading shelves</p>;
  } finally {
    if (connection) await connection.end();
  }
}
