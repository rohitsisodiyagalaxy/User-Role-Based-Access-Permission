import Permission from "@/models/Permission";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fetch a user by ID, or update an existing user
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const permission = await Permission.findById(id);
    if (!permission) {
      return NextResponse.json({ message: "Permission not found" }, { status: 404 });
    }
     
    return NextResponse.json(permission, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching permission", error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const body = await req.json();
    const permission = await Permission.findByIdAndUpdate(id, body, { new: true });

    if (!permission) {
      return NextResponse.json({ message: "Permission not found" }, { status: 404 });
    }

    return NextResponse.json(permission, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating permission", error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
    const { id } = params;
  
    try {
      await dbConnect();
      const permission = await Permission.findByIdAndDelete(id);
  
      if (!permission) {
        return NextResponse.json({ message: "Permission not found" }, { status: 404 });
      }
  
      return NextResponse.json(permission, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error updating Permission", error: error.message }, { status: 400 });
    }
  }
