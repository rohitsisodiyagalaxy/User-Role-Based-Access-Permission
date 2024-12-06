"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoleForm({ roleId = "" }) {
  const [role, setRole] = useState({
    role_name: "",
    role_status: "1", // Default to "1" for Active
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState();
  const [privileges, setPrivileges] = useState([]);
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);

  useEffect(() => {
    const fetchPrivileges = async () => {
      const res = await fetch("/api/privileges");
      const data = await res.json();
      setPrivileges(data);
    };

    fetchPrivileges();
    if (roleId) {
      const fetchRole = async () => {
        const res = await fetch(`/api/roles/${roleId}`);
        const data = await res.json();
        if (res.ok) {
          setRole({
            role_name: data.role_name || "",
            role_status: data.role_status || "1", // Default to "1" if status is not available
          });
          setSelectedPrivileges(data.privileges || []);
        } else {
          setError(data.message);
        }
      };
      fetchRole();
    }
  }, [roleId]);

  const handleChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };
  const handlePrivilegeChange = (e) => {
    const { value } = e.target;
    setSelectedPrivileges(
      (prev) =>
        prev.includes(value)
          ? prev.filter((priv) => priv !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = roleId ? "PUT" : "POST";
      const url = roleId ? `/api/roles/${roleId}` : "/api/roles";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...role, privileges: selectedPrivileges }),
      });

      if (res.ok) {
        router.push(`/role?success=${roleId ? "update" : "create"}`);
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {error && (
            <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9 mb-6">
              <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                {/* SVG icon */}
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                  Attention needed
                </h5>
                <p className="leading-relaxed text-[#D0915C]">{error}</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="role_name">Role Name:</label>
              <input
                type="text"
                id="role_name"
                name="role_name"
                value={role.role_name}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="active">Status:</label>
              <select
                id="role_status"
                name="role_status"
                value={role.role_status}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div>
              <label>Privileges:</label>
              {privileges.map((privilege) => (
                <div key={privilege._id}>
                  <input
                    type="checkbox"
                    id={privilege._id}
                    value={privilege._id}
                    checked={selectedPrivileges.includes(privilege._id)}
                    onChange={handlePrivilegeChange}
                    className="mr-2"
                  />
                  <label htmlFor={privilege._id}>
                    {privilege.privilege_name}
                  </label>
                </div>
              ))}
            </div>
            <button
              className="flex mt-5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : roleId ? "Update Role" : "Add Role"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
