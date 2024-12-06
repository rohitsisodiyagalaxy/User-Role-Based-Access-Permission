// app/api/users/route.js
import bcrypt from "bcrypt";
import Privilege from "@/models/Privilege";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await dbConnect();
    const { privilege_name, privilege_description } = await req.json();
    const existingPrivilege = await Privilege.findOne({ privilege_name });
    if (existingPrivilege) {
      return new Response(
        JSON.stringify({ message: "Privilege  name  already exists" }),
        { status: 409 }
      );
    }
    const newPrivilege = new Privilege({
      privilege_name,
      privilege_description,
    });
    await newPrivilege.save();

    return new Response(JSON.stringify(newPrivilege), { status: 201 });
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
    const privilege = await Privilege.find();

    if (!privilege) {
      return new Response(JSON.stringify({ message: "Privilege not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(privilege), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching privilege", error }),
      { status: 500 }
    );
  }
}
