import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import createConnection from "../../../../lib/db";


//________________DELETE REQUEST____________________
export async function DELETE(req, { params }) {
  let connection;
  try {

    // Extract the shelfName from the URL parameters
    const { shelfName } = params; // Contains the dynamic route parameters from the URL
    const decodedShelfName = decodeURIComponent(shelfName); // shelfName is extracted and decoded to handle any special characters or spaces in the URL

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

    // Query to book_shelves table to find the shelf with the given shelf_name and user_id
    const [shelves] = await connection.query(
      "SELECT PK_ID FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId]
    );

    // If no shelf is found, return an error
    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    // Extract the shelfId (primary key) from the query result
    const shelfId = shelves[0].PK_ID;

    // Delete any books associated with this shelf
    await connection.query(
      "DELETE FROM books_in_shelves WHERE shelf_id = ?",
      [shelfId]
    );

    // Delete the shelf
    await connection.query(
        "DELETE FROM book_shelves WHERE PK_ID = ? AND user_id = ?",
        [shelfId, userId]
      );

    // Return a success response
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    // Log any errors and return an error response
    console.error("Error deleting shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    // Ensure the database connection
    if (connection) await connection.end();
  }
}

//________________GET REQUEST____________________

export async function GET(req, { params }) {
  let connection;
  try {

    // Extract the shelfName from the URL parameters
    const { shelfName } = params; // Contains the dynamic route parameters from the URL
    const decodedShelfName = decodeURIComponent(shelfName); // shelfName is extracted and decoded to handle any special characters or spaces in the URL

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

    // Query to book_shelves table to find the shelf with the given shelf_name and user_id
    const [shelves] = await connection.query(
      "SELECT PK_ID AS shelf_id, shelf_name FROM book_shelves WHERE shelf_name = ? AND user_id = ?",
      [decodedShelfName, userId]
    );

    // If no shelf is found, return an error
    if (shelves.length === 0) {
      return NextResponse.json({ error: 'Shelf not found or does not belong to user' }, { status: 404 });
    }

    // Extract the the first shelf from the query result
    const shelf = shelves[0];

    // Return the shelf data as a JSON response
    return NextResponse.json({ shelf });
  } catch (error) {
    // Log any errors and return an error response
    console.error("Error getting shelf:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    // Ensure the database connection is closed
    if (connection) await connection.end();
  }
}
