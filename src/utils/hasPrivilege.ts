export const hasPrivilege = (privilege: string) => {
  // Check if we're running in the browser (client-side)
  if (typeof window !== "undefined") {
    const storedPrivileges = sessionStorage.getItem("privileges");
    const userPrivilegesArray = storedPrivileges ? storedPrivileges.split(",") : [];
    console.log("permission", userPrivilegesArray, "permission");
    return userPrivilegesArray.includes(privilege);
  }
  
  // Return false if not running in the browser (server-side)
  return false;
};
