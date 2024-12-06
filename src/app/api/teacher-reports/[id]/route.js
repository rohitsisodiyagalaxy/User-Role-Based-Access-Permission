import Teacher from "@/models/Teacher";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fetch a user by ID, or update an existing user
export async function GET(req, { params }) {
  const { id } = params;
  console.log("id"+id);

  try {
    await dbConnect();
    const teacher = await Teacher.findById(id);
     console.log("Teacher"+Teacher);
    if (!teacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }
     
    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching teacher", error: error.message }, { status: 500 });
  }
}