// app/api/users/route.js
import bcrypt from "bcrypt";
import Role from "@/models/Role";
import dbConnect from "@/lib/mongodb";


export async function GET(req, { params }) {
  try {
    await dbConnect();
    // const { id } = params;
    const role = await Role.find();

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
