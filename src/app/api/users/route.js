// app/api/users/route.js
import bcrypt from "bcrypt";
import User from "@/models/User";
import Role from "@/models/Role";
import Privilege from "@/models/Privilege";

import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await dbConnect();
    const { first_name, last_name, email, password, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 409,
      });
    }
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      /* created_date: new Date(),
      update_date: new Date(), */
    });
    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating user", error }),
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { role_name } = params;

  await dbConnect();
  try {
    const users = await User.find( { role: { $ne: "671fad3ebfa746b672561c49" } } ) // Replace "AdminRoleId" with the actual ID of the Admin role
  .populate({
    path: "role",
    select: "role_name",
    populate: {
      path: "privileges",
      select: "privilege_name",
    },
  });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users with roles:", error);
    return new Response("Failed to fetch users with roles", { status: 500 });
  }
}
