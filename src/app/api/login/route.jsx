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
                { error: "Username and password are required." },
                { status: 400 }
            );
        }

        connection = await createConnection();

        const [rows] = await connection.query(
            "SELECT * FROM book_users WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 }
            );
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const response = NextResponse.json(
            { status: "success" },
            { status: 200 }
        );

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            path: '/',
            sameSite: 'strict',
        });

        return response;
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