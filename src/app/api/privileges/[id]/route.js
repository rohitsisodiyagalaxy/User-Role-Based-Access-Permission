import Privilege from "@/models/Privilege";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fetch a user by ID, or update an existing user
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const privilege = await Privilege.findById(id);
    if (!privilege) {
      return NextResponse.json(
        { message: "privilege not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(privilege, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching privilege", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const body = await req.json();
    const privilege = await Privilege.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!privilege) {
      return NextResponse.json(
        { message: "Privilege not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(privilege, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating privilege", error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const privilege = await Privilege.findByIdAndDelete(id);

    if (!privilege) {
      return NextResponse.json(
        { message: "Privilege not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(privilege, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating privilege", error: error.message },
      { status: 400 }
    );
  }
}
