"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function SuccessMessage() {
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);

      // Hide the message after 2 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);

      // Clear timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
    {showSuccessMessage && (
      <div className="p-4 mb-4 text-green-800 bg-green-200 rounded">
        {(() => {
          switch (success) {
            case "create":
              return "User created successfully!";
            case "update":
              return "User updated successfully!";
            case "create_permission":
              return "Permission created successfully!";
            case "update_permission":
              return "Permission updated successfully!";
            default:
              return "Something went wrong.";
          }
        })()}
      </div>
    )}
    </>
  );
}

export default SuccessMessage;
