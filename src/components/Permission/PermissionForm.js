"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PermissionForm({ permissionId = "" }) {
  const [permission, setPermission] = useState({
    name: "",
    status: "1", // Default to "1" for Active
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState();

  useEffect(() => {
    if (permissionId) {
      const fetchPermission = async () => {
        const res = await fetch(`/api/permissions/${permissionId}`);
        const data = await res.json();
        if (res.ok) {
          setPermission({
            name: data.name || "",
            status: data.status || "1", // Default to "1" if status is not available
          });
        } else {
          setError(data.message);
        }
      };
      fetchPermission();
    }
  }, [permissionId]);

  const handleChange = (e) => {
    setPermission({ ...permission, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = permissionId ? "PUT" : "POST";
      const url = permissionId
        ? `/api/permissions/${permissionId}`
        : "/api/permissions";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(permission),
      });

      if (res.ok) {
        router.push(
          `/permission?success=${
            permissionId ? "update_permission" : "create_permission"
          }`
        );
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={permission.name}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="active">Status:</label>
              <select
                id="status"
                name="status"
                value={permission.status}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <button
              className="flex mt-5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : permissionId
                ? "Update Permission"
                : "Add Permission"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
