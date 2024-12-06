import Teacher from "@/models/Teacher";
import dbConnect from "@/lib/mongodb";


  export async function GET(req, { params }) {
    
    try {
      console.log("teacher");
      await dbConnect();
     // const { id } = params;
      const teacher = await Teacher.find();
      // const teacher= await Teacher.countDocuments();
      console.log(teacher);
  
      if (!teacher) {
        return new Response(JSON.stringify({ message: "teacher not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(teacher), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Error fetching teacher", error }), { status: 500 });
    }
  }


export async function POST(req) {
  try {
    await dbConnect();
    const { name, class_name, grades, attendance, remarks } = await req.json();
    console.log(name,);
    const newTeacher = new Teacher({
      name, class_name, grades, attendance, remarks
    });
    console.log("newTeacher"+newTeacher);
    await newTeacher.save();

    return new Response(JSON.stringify(newTeacher), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating Teacher", error }), { status: 500 });
  }
}
