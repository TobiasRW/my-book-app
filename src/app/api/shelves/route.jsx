import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import createConnection from "../../lib/db";

//________________GET REQUEST____________________
export async function GET(req) {
  let connection;
  try {
    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // Verify (decode) the token and extract the payload (userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Query the database to get the shelves associated with the user
    const [rows] = await connection.query("CALL GetShelves(?)", [userId]);

    // Stored procedure returns multiple result sets. Access the first one.
    const shelves = rows[0];

    // Return the shelves data as a JSON response
    return NextResponse.json({ shelves });
  } catch (error) {
    // Log any errors and return an error response
    console.error("Error getting shelves:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  } finally {
    // Ensure the database connection is closed
    if (connection) await connection.end();
  }
}

//________________POST REQUEST____________________
export async function POST(req) {
  let connection;
  try {
    // Retrieve the token from the request cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // Verify (decode) the token and extract the payload (userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Parse the request body to get the shelf name
    const { shelfName } = await req.json();

    // If no shelf name is provided, return an error
    if (!shelfName) {
      return NextResponse.json(
        { error: "Shelf name is required" },
        { status: 400 },
      );
    }

    // Create a connection to the database
    connection = await createConnection();

    // Check if a shelf with the same name already exists for the user
    const [existingShelf] = await connection.query(
      "SELECT * FROM book_shelves WHERE user_id = ? AND shelf_name = ?",
      [userId, shelfName],
    );

    // If the shelf already exists, return an error
    if (existingShelf.length > 0) {
      return NextResponse.json(
        { error: "A shelf with this name already exists." },
        { status: 400 },
      );
    }

    // Insert the new shelf into the database for the user
    await connection.query(
      "INSERT INTO book_shelves (user_id, shelf_name) VALUES (?, ?)",
      [userId, shelfName],
    );

    // Return a success response without shelfId
    return NextResponse.json({ status: "success" });
  } catch (error) {
    // Log any errors and return an error response
    console.error("Error creating shelf:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  } finally {
    // Ensure the database connection is closed
    if (connection) await connection.end();
  }
}
