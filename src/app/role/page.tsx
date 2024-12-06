"use client"; // Ensure this is a client component

import { useEffect, useState } from "react"; // Import useState and useEffect
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { Role } from "@/models/Role";
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import DeleteButton from "@/components/DeleteButton"; // Adjust the import path accordingly
import {
  Add_Role,
  Update_Roles,
  Delete_Role,
  Update_User,
  Manage_Roles
} from "@/constants/permissionConstant";
import { hasPrivilege } from "@/utils/hasPrivilege";
import NoAccessPage from "@/components/NoAccessPage";
import { logAction } from "@/utils/logger";
import { Audit_Manage_Roles, Audit_Delete_Role } from "@/constants/auditLogContant";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

async function fetchRoles() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const userid = sessionStorage.getItem("userid");
  if (!hasPrivilege(Manage_Roles)) {
    return <NoAccessPage />;
  }
  // Fetch users when the component mounts
  useEffect(() => {
    const getRoles = async () => {
      const fetchedUsers = await fetchRoles();
      setRoles(fetchedUsers);
    };
    getRoles();
    logAction(Audit_Manage_Roles, userid);

  }, []);

  // Function to handle user deletion
  const handleDelete = async (roleId: string) => {
    logAction(Audit_Delete_Role, userid);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/roles/${roleId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the users state to remove the deleted user
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role._id !== roleId)
        );
      } else {
        console.error("Failed to delete the role");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />
      <div className="flex flex-col gap-3">
        <SuccessMessage />
        {hasPrivilege(Add_Role) && (
          <div className="flex justify-end">
            <Link
              href="/role/add"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
              data-tooltip-id="add-role-tooltip"
              data-tooltip-content="Add a new role" 
            >
              Add Role
            </Link>
            <ReactTooltip id="add-role-tooltip" place="top" effect="solid" />
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
                  Role Name
                </th>
                <th className="p-4 text-center text-sm font-medium uppercase">
                  Status
                </th>
                {(hasPrivilege(Update_Roles) || hasPrivilege(Delete_Role)) && (
                <th className="p-4 text-center text-sm font-medium uppercase">
                  Actions
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr
                  key={role._id}
                  className={`border-b border-stroke dark:border-strokedark`}
                >
                  <td className="p-4 text-center text-black dark:text-white">
                    {index + 1}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {role.role_name}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {role.role_status == 1 ? "Active" : "Deactive"}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {hasPrivilege(Update_User) && (
                      <>
                      <Link
                        href={`/role/edit/${role._id}`}
                        className="text-blue-500 hover:text-blue-700"
                        data-tooltip-id="update-role-tooltip"
                        data-tooltip-content="Update role details" 
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
                      <ReactTooltip id="update-role-tooltip" place="top" effect="solid" />
                      </>
                    )}
                    {hasPrivilege(Delete_Role) && (
                      <DeleteButton
                        userId={role._id}
                        onDelete={() => handleDelete(role._id)}
                      />
                    )}
                    {/* Pass handleDelete */}
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

export default Roles;
