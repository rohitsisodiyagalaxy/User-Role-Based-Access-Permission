import Teacher from "@/models/Teacher";
import dbConnect from "@/lib/mongodb";


  export async function GET(req, { params }) {
    try {
      await dbConnect();
     // const { id } = params;
      // const teacher = await Teacher.find();
      const teacher= await Teacher.countDocuments();
  
      if (!teacher) {
        return new Response(JSON.stringify({ message: "teacher not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(teacher), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Error fetching teacher", error }), { status: 500 });
    }
  }
