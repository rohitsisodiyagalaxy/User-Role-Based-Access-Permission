// app/api/users/route.js
import bcrypt from "bcrypt";
import User from "@/models/User";
import Role from "@/models/Role";
import Privilege from "@/models/Privilege";

import dbConnect from "@/lib/mongodb";

export async function GET(req, { params }) {
  const { role_name } = params;

  await dbConnect();
  try {
    let users ="";
    if(role_name!=="Admin"){
      users = await User.find( { role: { $ne: "671fad3ebfa746b672561c49" } } ) // Replace "AdminRoleId" with the actual ID of the Admin role
  .populate({
    path: "role",
    select: "role_name",
    populate: {
      path: "privileges",
      select: "privilege_name",
    },
  });
}
else{
     users = await User.find() // Replace "AdminRoleId" with the actual ID of the Admin role
  .populate({
    path: "role",
    select: "role_name",
    populate: {
      path: "privileges",
      select: "privilege_name",
    },
  });
}

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users with roles:", error);
    return new Response("Failed to fetch users with roles", { status: 500 });
  }
}
