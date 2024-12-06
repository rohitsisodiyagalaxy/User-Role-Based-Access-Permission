"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserForm({ userId="" }) {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState();
  const [roles, setRoles] = useState([]); // State to hold the roles


  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser((prevUser) => ({
            ...prevUser,
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            role: data.role || "",
            password: data.password || "",
          }));
        } else {
          setError(data.message);
        }
      };
      fetchUser();
    }

    // Fetch roles from API when component mounts
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/roles/rolelist"); // Replace with your actual roles API endpoint
        const data = await res.json();
        if (res.ok) {
          setRoles(data); // Set roles state with fetched data
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("An error occurred while fetching roles:", error);
      }
    };

    fetchRoles();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const method = userId ? "PUT" : "POST";
      const url = userId ? `/api/users/${userId}` : "/api/users";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      if (res.ok) {
        router.push(`/user?success=${userId ? "update" : "create"}`);
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
          {error && 
            <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9 mb-6">
              <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                {/* SVG icon */}
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">Attention needed</h5>
                <p className="leading-relaxed text-[#D0915C]">{error}</p>
              </div>
            </div>
          } 
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            {!userId && ( // Render this block only if userId is not present
                  <div>
                    <label htmlFor="password">Password:</label>
                    <input
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required // Make password required only when adding a new user
                    />
                  </div>
                )}

            <div>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
            <button className="flex mt-5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : userId ? "Update User" : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
