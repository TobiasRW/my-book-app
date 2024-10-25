import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import createConnection from "../../lib/db";

//________________POST REQUEST____________________
// Handles a POST request to update or add a book to the user's library
export async function POST(req) {
  let connection;
  try {
    // Extract the book ID, status, and rating from the request body
    const { bookId, status, rating } = await req.json();

    // Validate if bookId and status are provided
    if (!bookId || !status) {
      return NextResponse.json(
        { error: "Book ID and valid status are required." },
        { status: 400 }
      );
    }

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Determine start_date and finish_date based on status of the book
    let startDate = null;
    let finishDate = null;
    if (status === "currently reading") {
      startDate = new Date();
    } else if (status === "finished") {
      finishDate = new Date();
    }

    // Call the stored procedure to add or update the user book
    await connection.query(
      "CALL AddOrUpdateUserBook(?, ?, ?, ?, ?, ?)",
      [userId, bookId, rating, status, startDate, finishDate]
    );

    // Return a success response
    return NextResponse.json({ status: "success" });
  } catch (error) {

    // Log the error and return an error response
    console.error("Error updating user book:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  } finally {
    // Close the connection
    if (connection) await connection.end();
  }
}

//________________GET REQUEST____________________
// Handles a GET request to retrieve the status and rating for a specific book in the user's library
export async function GET(req) {
  let connection;
  try {

    // Extract the book ID from the query parameters
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    // Validate if bookId is provided
    if (!bookId) {
      return NextResponse.json({ error: "Book ID is required." }, { status: 400 });
    }

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Fetch the user's status and rating for the book
    const [rows] = await connection.query(
      "SELECT status, rating FROM user_books WHERE user_id = ? AND book_id = ?",
      [userId, bookId]
    );

    // If no results are found, return null
    if (rows.length === 0) {
      return NextResponse.json({ status: null, rating: null });
    }

    // Return the status and rating
    return NextResponse.json(rows[0]);
  } catch (error) {
    // Log the error and return an error response
    console.error("Error fetching user book data:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  } finally {
    // Close the connection
    if (connection) await connection.end();
  }
}


//________________DELETE REQUEST____________________
// Handles a DELETE request to remove a book from the user's library and all user's shelves
export async function DELETE(req) {
  let connection;
  try {
    // Extract the book ID from the request body
    const { bookId } = await req.json();

    // Validate if bookId is provided
    if (!bookId) {
      return NextResponse.json({ error: "Book ID is required." }, { status: 400 });
    }

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Start a database transaction to ensure data integrity
    await connection.beginTransaction();

    try {
      // Delete the book from user_books
      await connection.query(
        "DELETE FROM user_books WHERE user_id = ? AND book_id = ?",
        [userId, bookId]
      );

      // Delete the book from all shelves the user has created
      await connection.query(
        `
        DELETE bis FROM books_in_shelves bis
        INNER JOIN book_shelves bs ON bis.shelf_id = bs.PK_ID
        WHERE bs.user_id = ? AND bis.book_id = ?
        `,
        [userId, bookId]
      );

      // Commit the transaction if no errors occurred
      await connection.commit();

      // Return a success response
      return NextResponse.json({ status: "success" });
    } catch (error) {
      // Rollback the transaction on error
      await connection.rollback();

      // Log the error and return an error response
      console.error("Error deleting book from library:", error);
      return NextResponse.json({ error: "An error occurred." }, { status: 500 });
    }
  } catch (error) {
    // Log the error and return an error
    console.error("Error in DELETE handler:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  } finally {
    // Close the connection
    if (connection) await connection.end();
  }
}