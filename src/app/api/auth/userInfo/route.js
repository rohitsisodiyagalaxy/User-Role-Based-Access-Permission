import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const authToken = req.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ error: "Token not found" }, { status: 401 });
  }

  try {
    // Decode the token (replace 'your_secret_key' with your actual JWT secret)
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
