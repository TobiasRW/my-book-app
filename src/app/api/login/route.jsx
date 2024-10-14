import createConnection from "../../lib/db";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    let connection;

    try {
        const { username, password } = await req.json(); // Destructure the username and password from the request body

        if (!username || !password) { // Check if the username and password are provided. If not, return an error
            return NextResponse.json(
                { error: "Username and password are required." }, // error message
                { status: 400 }
            );
        }

        // Create a connection to the database
        connection = await createConnection();

        // Query the database to find the user with the provided username
        const [rows] = await connection.query(
            "SELECT PK_ID AS id, username, password FROM book_users WHERE username = ?",
            [username]
        );

        // Check if the user exists. If not, return an error
        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 }
            );
        }

        // Retrieve the first matching user from the query results
        const user = rows[0];

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords do not match, return an error
        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 }
            );
        }

        // If the passwords match, create a JWT token for the authenticated user
        const token = jwt.sign(
            { userId: user.id, username: user.username }, // Payload containing the user ID and username
        process.env.JWT_SECRET, // Secret key used to sign the token
            { expiresIn: '1h' } // Token expiration time
        );

        // Prepare a successful response to return to the client
        const response = NextResponse.json(
            { status: "success" }, // Send succes status
            { status: 200 } // HTTP 200 OK status
        );

        // Set the token as an HTTP-only cookie in the response
        response.cookies.set('token', token, {
            httpOnly: true, // ENsure the cookie is only accessible via HTTP, not JavaScript
            secure: process.env.NODE_ENV === 'production', // Secure in production, not necessary in development
            maxAge: 60 * 60, // Cookie expiration time in seconds (1 hour)
            path: '/', // Cookie is valid for all paths
            sameSite: 'strict', // Prevent cross-site cookie sharing
        });

        // Return the response with the token cookie set
        return response;
    } catch (error) {
        // console.error("User creation error:", error); 
        // If an error occurs during the process, return an error response
        return NextResponse.json(
            { error: "An unexpected error occurred." }, // error message
            { status: 500 }
        );
    } finally {
        if (connection) await connection.end(); // Close the connection to the database regardless of the outcome
    }
}