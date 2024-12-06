import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";


  export async function GET(req, { params }) {
    try {
      await dbConnect();
     // const { id } = params;
      // const student = await Student.find();
      const student= await Student.countDocuments();
  
      if (!student) {
        return new Response(JSON.stringify({ message: "student not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(student), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Error fetching student", error }), { status: 500 });
    }
  }


export async function POST(req) {
  try {
    await dbConnect();
    const { name, class_name, grades, attendance, remarks } = await req.json();
    console.log(name,);
    const newStudent = new Student({
      name, class_name, grades, attendance, remarks
    });
    console.log("newStudent"+newStudent);
    await newStudent.save();

    return new Response(JSON.stringify(newStudent), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating Student", error }), { status: 500 });
  }
}
