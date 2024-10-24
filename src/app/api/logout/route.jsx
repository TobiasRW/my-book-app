import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: "success" }, { status: 200 });

  // Clear the 'token' cookie by setting its expiration date to a past date
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire the cookie immediately
    path: "/",
    sameSite: "strict",
  });

  return response;
}
