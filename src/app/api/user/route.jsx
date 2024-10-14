// /app/api/user/route.jsx
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(req) {
  try {
    // acess the cookies in the request using the cookies() method from next/headers
    const cookieStore = cookies();

    // Retrieve the token cookie (if it exists) from the cookies
    const token = cookieStore.get('token')?.value;

    // If no token is found, return an error
    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, return the username from the decoded token payload in the response
    return NextResponse.json({ username: decoded.username });
  } catch (error) {
    // If the token is invalid or an error occurs, return an error response
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
