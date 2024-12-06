import dbConnect from '@/lib/mongodb';
import AuditLog from '@/models//AuditLog';
import User from "@/models/User";
export async function POST(request) {
  await dbConnect();
  try {
    const { action, userid/* , details */ } = await request.json();
     // Convert details to a JSON string if it's an object or array
/*      const detailsString = typeof details === 'object' ? JSON.stringify(details) : details;
 */
     const logEntry = new AuditLog({ action, userid/* , details: detailsString */ }); await logEntry.save();
    return new Response(JSON.stringify({ message: 'Log entry created' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create log entry' }), { status: 500 });
  }
}

export async function GET(request) {
    await dbConnect();
    // Parse URL and get `userId` query parameter if provided
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

    // Fetch logs, optionally filtering by userId
    const query = userId ? { userid: userId } : {}; // Filter if `userId` exists
    try {
      //const logs = await AuditLog.find({}).sort({ timestamp: -1 });
      const logs = await AuditLog.find(query)
      .populate({
        path: "userid",  // Reference to the User model
        select: "first_name last_name ",  // Fields to include from the User model
      });
      return new Response(JSON.stringify({ logs }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch logs' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
