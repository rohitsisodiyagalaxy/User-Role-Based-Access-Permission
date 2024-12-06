// app/api/users/route.js
import bcrypt from "bcrypt";
import Role from "@/models/Role";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await dbConnect();
    const { role_name, role_status, privileges } = await req.json();
    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      return new Response(
        JSON.stringify({ message: "Role name already exists" }),
        { status: 409 }
      );
    }
    const newRole = new Role({
      role_name,
      role_status,
      privileges,
    });
    await newRole.save();

    return new Response(JSON.stringify(newRole), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating role", error }),
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    await dbConnect();
    // const { id } = params;
    const role = await Role.find({ role_name: { $ne: "Admin" } });

    if (!role) {
      return new Response(JSON.stringify({ message: "Role not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(role), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching user", error }),
      { status: 500 }
    );
  }
}
