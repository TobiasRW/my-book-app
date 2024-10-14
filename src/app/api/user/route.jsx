// /app/api/user/route.jsx
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ username: decoded.username });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
