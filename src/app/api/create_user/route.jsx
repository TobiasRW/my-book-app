// Import necessary modules
import createConnection from "../../lib/db"; 
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; 

export async function POST(req) {
    let connection;

    try {
        const { username, password } = await req.json(); // Destructure the username and password from the request body

        if (!username || !password) { // Check if the username and password are provided. If not, return an error
            return NextResponse.json(
                { error: "Username and password are required." },
                { status: 400 }
            );
        }

        // Hash the password before storing
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a connection to the database using the createConnection function from db.js
        connection = await createConnection();
        // Call the stored procedure createBookUser with the username and hashed password
        const [result] = await connection.query(
            "CALL createBookUser(?, ?)",
            [username, hashedPassword] // Store the hashed password
        );

        // Access the first row of the first result set
        const firstRow = result[0][0];

        // If the first row contains an error message, return an error response
        if (firstRow?.ErrorMessage) {
            return NextResponse.json(
                { error: firstRow.ErrorMessage },
                { status: 400 }
            );
        } else {
            return NextResponse.json({ status: "success" }, { status: 201 }); // Otherwise, return a success response
        }
    } catch (error) {
        // console.error("User creation error:", error); 
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    } finally {
        if (connection) await connection.end(); // Close the connection to the database regardless of the outcome
    }
}
