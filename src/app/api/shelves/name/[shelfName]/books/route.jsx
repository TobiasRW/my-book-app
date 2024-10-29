import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import createConnection from "../../../../../lib/db";

//________________GET REQUEST____________________
// Handles a GET request to retrieve the books in a specific user's shelf
export async function GET(req, { params }) {
  let connection;
  try {
    const { shelfName } = params;
    const decodedShelfName = decodeURIComponent(shelfName); // Decode the shelf name from the URL params

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Query to get the shelf ID for the given shelf name and user ID
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId],
    );

    // If no shelf is found, return a 404 error
    if (shelves.length === 0) {
      return NextResponse.json(
        { error: "Shelf not found or does not belong to user" },
        { status: 404 },
      );
    }

    // Get the shelf ID from the query result
    const shelfId = shelves[0].PK_ID;

    // Query to get the books in the shelf along with their ratings and status
    const [books] = await connection.query(
    "CALL GetShelfBookRatingAndStatus(?, ?)",
      [userId, shelfId]
    );

      // The result of CALL is an array with the first element being the actual result
      const booksData = books[0];


    // Return the list of books and the shelf name as a JSON response
    return NextResponse.json({ books: booksData, shelfName: decodedShelfName });
  } catch (error) {
    // Log the error and return an error response
    console.error("Error getting books in shelf:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  } finally {
    // Close the database connection if it was established
    if (connection) await connection.end();
  }
}

//________________POST REQUEST____________________
// Handles a POST request to add a book to a specific user's shelf
export async function POST(req, { params }) {
  let connection;
  try {
    const { shelfName } = params;
    const decodedShelfName = decodeURIComponent(shelfName); // Decode the shelf name from the URL params

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Parse the request body to get the book ID
    const { bookId } = await req.json();

    // If no book ID is provided, return a 400 error
    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Create a connection to the database
    connection = await createConnection();

    // Query to get the shelf ID for the specified shelf name and user ID
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId]
    );

    // If no shelf is found, return a 404 error
    if (shelves.length === 0) {
      return NextResponse.json(
        { error: "Shelf not found or does not belong to user" },
        { status: 404 }
      );
    }

    // Get the shelf ID from the query result
    const shelfId = shelves[0].PK_ID;

    // Start a database transaction
    await connection.beginTransaction();

    try {
      // Add the book to the shelf
      await connection.query(
        "INSERT INTO books_in_shelves (shelf_id, book_id) VALUES (?, ?)",
        [shelfId, bookId]
      );

       // Add the book to the user_books table if it isn't already present
      await connection.query(
        "INSERT IGNORE INTO user_books (user_id, book_id) VALUES (?, ?)",
        [userId, bookId]
      );

      // Commit the transaction if successful
      await connection.commit();

      // Return a success response
      return NextResponse.json({ status: "success" });
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();

      // Handle duplicate entry errors specifically
      if (error.code === "ER_DUP_ENTRY") {
        return NextResponse.json(
          { error: "Book already in shelf" },
          { status: 400 }
        );
      }

      // Log the error and return a generic error response
      console.error("Error adding book to shelf:", error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } catch (error) {
    // Log the error and return a generic error response
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  } finally {
    // Close the database connection if it was established
    if (connection) await connection.end();
  }
}


//________________DELETE REQUEST____________________
// Handles a DELETE request to remove a book from a specific user's shelf
export async function DELETE(req, { params }) {
  let connection;
  try {
    const { shelfName } = params;
    const decodedShelfName = decodeURIComponent(shelfName); // Decode the shelf name from the URL params

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Parse the request body to get the book ID
    const { bookId } = await req.json();

    // If no book ID is provided, return a 400 error
    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 },
      );
    }

    // Create a connection to the database
    connection = await createConnection();

    // Query to get the shelf ID for the specified shelf name and user ID
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId],
    );

    // If no shelf is found, return a 404 error
    if (shelves.length === 0) {
      return NextResponse.json(
        { error: "Shelf not found or does not belong to user" },
        { status: 404 },
      );
    }

    // Get the shelf ID from the query result
    const shelfId = shelves[0].PK_ID;

    // Query to remove the book from the shelf
    await connection.query(
      "DELETE FROM books_in_shelves WHERE shelf_id = ? AND book_id = ?",
      [shelfId, bookId],
    );

    // Return a success response
    return NextResponse.json({ status: "success" });
  } catch (error) {
    // Log the error and return an error response
    console.error("Error removing book from shelf:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  } finally {
    // Close the database connection if it was established
    if (connection) await connection.end();
  }
}
