import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Fetch a user by ID, or update an existing user
export async function GET(req, { params }) {
  const { id } = params;
  console.log("id"+id);

  try {
    await dbConnect();
    const student = await Student.findById(id);
     console.log("Student"+Student);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
     
    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching student", error: error.message }, { status: 500 });
  }
}