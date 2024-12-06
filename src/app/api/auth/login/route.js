import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import Privilege from "@/models/Privilege";
import Role from "@/models/Role";

export async function POST(req) {
  try {
    await dbConnect(); // Connect to MongoDB
    const { email, password } = await req.json();
    console.log(password);
    // Check if the user exists
    const user = await User.findOne({ email }).populate({
      path: "role",
      select: "role_name",
      populate: {
        path: "privileges", // Populate privileges within each role
        select: "privilege_name", // Select specific fields in privileges if needed
      }, // Only select necessary fields for clarity
    });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        username: `${user.first_name} ${user.last_name}`,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the token in a cookie
    const response = new Response(
      JSON.stringify({
        message: "Login successful",
        username: `${user.first_name} ${user.last_name}`,
        userid: `${user._id}`,
        privileges: user.role.privileges.map((p) => p.privilege_name),
        role: user.role,
        student:user.student
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=${
            30 * 24 * 60 * 60
          };`, // 30 days
        },
      }
    );

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
