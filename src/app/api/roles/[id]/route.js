import Role from "@/models/Role";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fetch a user by ID, or update an existing user
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const role = await Role.findById(id);
    if (!role) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const body = await req.json();
    const role = await Role.findByIdAndUpdate(id, body, { new: true });

    if (!role) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 400 }
    );
  }
}
