"use client"; // Ensure this is a client component

import { useEffect, useState } from "react"; // Import useState and useEffect
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { Privileges } from "@/models/Privilege";
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import DeleteButton from "@/components/DeleteButton"; // Adjust the import path accordingly
import { Manage_Permission } from "@/constants/permissionConstant";
import NoAccessPage from "@/components/NoAccessPage";
import { hasPrivilege } from "@/utils/hasPrivilege";
import { logAction } from "@/utils/logger";
import { View_Permission } from "@/constants/auditLogContant";

async function fetchPrivileges() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/privileges`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

const Privileges = () => {
  const [privileges, setPrivileges] = useState<Privileges[]>([]);
  const userid = sessionStorage.getItem("userid");

  if (!hasPrivilege(Manage_Permission)) {
    return <NoAccessPage />;
  }
  // Fetch users when the component mounts
  useEffect(() => {
    const getPrivileges = async () => {
      const fetchedPrivileges = await fetchPrivileges();
      setPrivileges(fetchedPrivileges);
    };
    getPrivileges();
    logAction(View_Permission, userid);
  }, []);

  // Function to handle user deletion
  const handleDelete = async (PrivilegesId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/privileges/${PrivilegesId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the users state to remove the deleted user
        setPrivileges((prevPrivileges) =>
          prevPrivileges.filter((privileges) => privileges._id !== PrivilegesId)
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
      <Breadcrumb pageName="Permission" />
      <div className="flex flex-col gap-3">
        <SuccessMessage />
        <div className="flex justify-end">
          {/*  <Link
            href="/privilege/add"
            className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add Permission
          </Link>   */}
        </div>
        <div className="overflow-x-auto rounded-sm border ...">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <th className="p-4 text-center text-sm font-medium uppercase">
                  No.
                </th>
                <th className="p-4 text-center text-sm font-medium uppercase">
                  Privileges Name
                </th>
                <th className="p-4 text-center text-sm font-medium uppercase">
                  Privileges Description
                </th>
              </tr>
            </thead>
            <tbody>
              {privileges.map((privilege, index) => (
                <tr
                  key={privilege._id}
                  className={`border-b border-stroke dark:border-strokedark`}
                >
                  <td className="p-4 text-center text-black dark:text-white">
                    {index + 1}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {privilege.privilege_name}
                  </td>
                  <td className="p-4 text-center dark:text-white">
                    {privilege.privilege_description}
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

export default Privileges;
