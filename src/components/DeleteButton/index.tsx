"use client"; // Ensure this is a client component since it handles UI interactions
import { useState } from "react";
import Link from "next/link";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface DeleteButtonProps {
  userId: string;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  userId,
  onDelete,
  confirmMessage,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    /* try {
      setIsDeleting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) { */
    onDelete();
    /*  } else {
        console.error("Failed to delete the user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    } */
  };

  return (
    <>
      <Link
        href="#"
        onClick={() => setShowConfirmation(true)} // Show the confirmation popup on click
        className="text-red-500 hover:text-red-700"
        data-tooltip-id="delete-user-tooltip"
        data-tooltip-content="Delete record" 
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
            d="M19 7L5 7M10 11v6M14 11v6M6 7h12l-1 13H7L6 7zm5-3h2a1 1 0 011 1v1H10V5a1 1 0 011-1z"
          />
        </svg>
      </Link>
      <ReactTooltip id="delete-user-tooltip" place="top" effect="solid" />

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
            <p className="mb-4 text-black dark:text-white">
              {(() => {
                switch (confirmMessage) {
                  case "delete_permission_confirm":
                    return "Are you sure you want to delete this permission?";
                  case "delete_role_confirm":
                    return "Are you sure you want to delete this role?";
                  case "delete_user_confirm":
                    return "Are you sure you want to delete this user?";
                  default:
                    return "Are you sure you want to delete this user?";
                }
              })()}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
