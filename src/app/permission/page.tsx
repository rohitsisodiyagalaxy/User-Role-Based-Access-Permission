"use client"; // Ensure this is a client component

import { useEffect, useState } from "react"; // Import useState and useEffect
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import {Permission} from "@/models/Permission";
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import DeleteButton from "@/components/DeleteButton"; // Adjust the import path accordingly

async function fetchPermissions() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions`, {
        method: "GET",
        cache: "no-cache",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch permission");
    }

    return response.json();
}

const Permissions = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);

    // Fetch users when the component mounts
    useEffect(() => {
        const getPermissions = async () => {
            const fetchedUsers = await fetchPermissions();
            setPermissions(fetchedUsers);
        };
        getPermissions();
    }, []);

    // Function to handle user deletion
    const handleDelete = async (permissionId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/${permissionId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Update the users state to remove the deleted user
                setPermissions(prevPermissions => prevPermissions.filter(permission => permission._id !== permissionId));
            } else {
                console.error("Failed to delete the permission");
            }
        } catch (error) {
            console.error("Error deleting permission:", error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Permission" />
            <div className="flex flex-col gap-3">
                <SuccessMessage />
                <div className="flex justify-end">
                <Link
            href="/permission/add"
            className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add Permission
          </Link>                </div>
                <div className="overflow-x-auto rounded-sm border ...">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 dark:bg-meta-4">
                                <th className="p-4 text-left text-sm font-medium uppercase">No.</th>
                                <th className="p-4 text-left text-sm font-medium uppercase">Permission Name</th>
                                <th className="p-4 text-left text-sm font-medium uppercase">Status</th>
                               
                                <th className="p-4 text-left text-sm font-medium uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((permission, index) => (
                                <tr key={permission._id} className={`border-b border-stroke dark:border-strokedark`}>
                                    <td className="p-4 text-center text-black dark:text-white">{index + 1}</td>
                                    <td className="p-4 text-black dark:text-white">{permission.name}</td>
                                    <td className="p-4 text-black dark:text-white">{permission.status==1? "Active" :"Deactive"}</td>
                                    <td><Link href={`/permission/edit/${permission._id}`} className="text-blue-500 hover:text-blue-700">
                      <svg
                        className="w-5 h-5 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 4l4 4-12 12H4v-4L16 4z"
                        />
                      </svg>
                    </Link>
                                        <DeleteButton userId={permission._id} onDelete={() => handleDelete(permission._id)} confirmMessage= "delete_permission_confirm" /> {/* Pass handleDelete */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Permissions;
