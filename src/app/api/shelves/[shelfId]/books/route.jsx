// /app/api/shelves/[shelfId]/books/route.jsx
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import createConnection from "../../../../lib/db";

// Handler for GET requests to /api/shelves/[shelfId]/books endpoint
export async function GET(req, { params }) {
  let connection;
  try {
    // Extract the shelfId from the request parameters
    const { shelfId } = params;

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    // Verify (decode) the token and extract the payload (userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Query to verify that the shelf exists and belongs to the user
    const [shelves] = await connection.query(
      "SELECT PK_ID AS shelf_id, shelf_name FROM book_shelves WHERE PK_ID = ? AND user_id = ?",
      [shelfId, userId]
    );

    // If no shelves are found, return an error
    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    // Get the shelf name from the query result
    const shelfName = shelves[0].shelf_name;

    // Query to get the books in the shelf
    const [books] = await connection.query(
      "SELECT book_id FROM books_in_shelves WHERE shelf_id = ?",
      [shelfId]
    );

    // Return the list of books and the shelf name as a JSON response
    return NextResponse.json({ books, shelfName });
  } catch (error) {
    // Log any errors and return an error response
    console.error("Error getting books in shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    // Ensure the database connection is closed
    if (connection) await connection.end();
  }
}

// Handler for POST requests to /api/shelves/[shelfId]/books endpoint
export async function POST(req, { params }) {
  let connection;
  try {
    // Extract the shelfId from the request parameters
    const { shelfId } = params;

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    // Verify (decode) the token and extract the payload (userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Parse the request body to get the book ID
    const { bookId } = await req.json();

    // If no book ID is provided, return an error
    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Create a connection to the database
    connection = await createConnection();

    // Query to verify that the shelf exists and belongs to the user
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE PK_ID = ? AND user_id = ?",
      [shelfId, userId]
    );

    // If no shelves are found, return an error
    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    // Query to add the book to the shelf
    await connection.query(
      "INSERT INTO books_in_shelves (shelf_id, book_id) VALUES (?, ?)",
      [shelfId, bookId] // (shelf_id, book_id) is the PRIMARY KEY (unique). prevents duplicate entries
    );

    // Return a success response
    return NextResponse.json({ status: 'success' });
  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Book already in shelf' }, { status: 400 });
    }
    // Log any errors and return an error response
    console.error("Error adding book to shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    // Ensure the database connection is closed
    if (connection) await connection.end();
  }
}
