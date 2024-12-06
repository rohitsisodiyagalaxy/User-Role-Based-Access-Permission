"use client"; // Ensure this is a client component

import { useEffect, useState } from "react"; // Import useState and useEffect
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { User } from "@/models/User";
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import DeleteButton from "@/components/DeleteButton"; // Adjust the import path accordingly
import NoAccessPage from "@/components/NoAccessPage";
import {
  Add_User,
  Update_User,
  Delete_User,
  Manage_Users
} from "@/constants/permissionConstant";
import { hasPrivilege } from "@/utils/hasPrivilege";
import { logAction } from "@/utils/logger";
import { Audit_Manage_Users, Audit_Delete_User } from "@/constants/auditLogContant";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

async function fetchUsers() {
  const role_name = sessionStorage.getItem("role_name");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/rolewise/${role_name}`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const userid = sessionStorage.getItem("userid");
  if (!hasPrivilege(Manage_Users)) {
    return <NoAccessPage />;
  }
  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
    logAction(Audit_Manage_Users, userid);

  }, []);

  // Function to handle user deletion
  const handleDelete = async (userId: string) => {
    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the users state to remove the deleted user
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        logAction(Audit_Delete_User, userid);

      } else {
        console.error("Failed to delete the user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    

    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col gap-3">
        <SuccessMessage />
        {hasPrivilege(Add_User) && (
          <div className="flex justify-end">
            <Link
              href="/user/add"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
              data-tooltip-id="add-user-tooltip"
              data-tooltip-content="Add a new user"            >
              Add User
            </Link>
            <ReactTooltip id="add-user-tooltip" place="top" effect="solid" />
          </div>
        )}
        <div className="overflow-x-auto rounded-sm border ...">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="p-4 text-center text-sm font-medium uppercase">
                  No.
                </th>
                <th className="p-4 text-center text-sm font-medium uppercase">
                  First Name
                </th>
                <th className="p-4 text-center text-sm font-medium uppercase">
                  Last Name
                </th>
                <th className="hidden p-4 text-center text-sm font-medium uppercase sm:table-cell">
                  Email
                </th>
                <th className="hidden p-4 text-center text-sm font-medium uppercase sm:table-cell">
                  Role
                </th>
                {(hasPrivilege(Update_User) || hasPrivilege(Delete_User)) && (
                <th className="p-4 text-center text-sm font-medium uppercase">
                  Actions
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b border-stroke dark:border-strokedark`}
                >
                  <td className="p-4 text-center text-black dark:text-white">
                    {index + 1}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {user.first_name}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {user.last_name}
                  </td>
                  <td className="hidden p-4 text-center dark:text-white sm:table-cell">
                    {user.email}
                  </td>
                  <td className="hidden p-4 text-center dark:text-white sm:table-cell">
                    {" "}
                    {user.role?.role_name || "N/A"}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {hasPrivilege(Update_User) && (
                      <>
                      <Link
                        href={`/user/edit/${user._id}`}
                        className="text-blue-500 hover:text-blue-700"
                        data-tooltip-id="update-user-tooltip"
                        data-tooltip-content="Update user details" 
                      >
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
                    <ReactTooltip id="update-user-tooltip" place="top" effect="solid" />
                    </>
                      
                    )}
                    {hasPrivilege(Delete_User) && (
                      <DeleteButton
                        userId={user._id}
                        onDelete={() => handleDelete(user._id)}
                      />
                    )}
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

export default Users;
