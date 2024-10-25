import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import createConnection from "../../../lib/db";

//________________GET REQUEST____________________
// Handles a GET request to retrieve a list of books in the user's library based on the status filter
export async function GET(req) {
  let connection;
  try {
    // Extract status from the URL's search parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    // Decode the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Base SQL query to fetch books for a user
    let query = "SELECT book_id FROM user_books WHERE user_id = ?";
    let params = [userId];

    // If a status filter is provided and it's not "all", add it to the query
    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    // Execute the query to fetch books from user_books table based on the user ID and optional status
    const [books] = await connection.query(query, params);

    // Return the list of books as a JSON response
    return NextResponse.json({ books });
  } catch (error) {
    // Log the error and return an error response
    console.error("Error fetching library books:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  } finally {
    // Close the database connection if it was established
    if (connection) await connection.end();
  }
}
