import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import createConnection from "../../../../../lib/db";

//________________GET REQUEST____________________
export async function GET(req, { params }) {
  let connection;
  try {
    const { shelfName } = params;
    const decodedShelfName = decodeURIComponent(shelfName);

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    connection = await createConnection();

    // Query to get the shelf ID
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId]
    );

    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    const shelfId = shelves[0].PK_ID;

    // Query to get the books in the shelf
    const [books] = await connection.query(
      "SELECT book_id FROM books_in_shelves WHERE shelf_id = ?",
      [shelfId]
    );

    // Return the list of books and the shelf name as a JSON response
    return NextResponse.json({ books, shelfName: decodedShelfName });
  } catch (error) {
    console.error("Error getting books in shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

//________________POST REQUEST____________________
export async function POST(req, { params }) {
  let connection;
  try {
    const { shelfName } = params;
    const decodedShelfName = decodeURIComponent(shelfName);

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Parse the request body to get the book ID
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    connection = await createConnection();

    // Query to get the shelf ID
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId]
    );

    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    const shelfId = shelves[0].PK_ID;

    // Query to add the book to the shelf
    await connection.query(
      "INSERT INTO books_in_shelves (shelf_id, book_id) VALUES (?, ?)",
      [shelfId, bookId]
    );

    // Return a success response
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Book already in shelf' }, { status: 400 });
    }
    console.error("Error adding book to shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

//________________DELETE REQUEST____________________
export async function DELETE(req, { params }) {
  let connection;
  try {
    const { shelfName } = params;
    const decodedShelfName = decodeURIComponent(shelfName);

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Parse the request body to get the book ID
    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    connection = await createConnection();

    // Query to get the shelf ID
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId]
    );

    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    const shelfId = shelves[0].PK_ID;

    // Query to remove the book from the shelf
    await connection.query(
      "DELETE FROM books_in_shelves WHERE shelf_id = ? AND book_id = ?",
      [shelfId, bookId]
    );

    // Return a success response
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error("Error removing book from shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}
