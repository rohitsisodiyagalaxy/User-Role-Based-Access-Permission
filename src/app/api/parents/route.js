import Parent from "@/models/Parent";
import dbConnect from "@/lib/mongodb";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    // const { id } = params;
    // const parent = await Parent.find();
    const parent = await Parent.countDocuments();

    if (!parent) {
      return new Response(JSON.stringify({ message: "parent not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(parent), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching parent", error }),
      { status: 500 }
    );
  }
}
