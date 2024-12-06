// src/app/api/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // Create a new response object to clear the cookie
  const response = NextResponse.json({ message: "Logout successful" });

  // Clear the authToken by setting it to an empty string and maxAge to 0
  response.cookies.set("authToken", "", {
    maxAge: 0,
    path: "/", // Ensure this matches your app's cookie path
  });

  return response;
}
