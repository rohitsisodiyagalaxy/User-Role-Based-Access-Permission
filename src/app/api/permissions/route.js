import Permission from "@/models/Permission";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, status } = await req.json();

    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return new Response(JSON.stringify({ message: "Permission name already exists" }), { status: 409 });
    }
    const newPermission = new Permission({
      name,
      status
    });
    await newPermission.save();

    return new Response(JSON.stringify(newPermission), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating permission", error }), { status: 500 });
  }
}

  export async function GET(req, { params }) {
    try {
      await dbConnect();
     // const { id } = params;
      const permission = await Permission.find();
  
      if (!permission) {
        return new Response(JSON.stringify({ message: "Permission not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(permission), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: "Error fetching permission", error }), { status: 500 });
    }
  }
