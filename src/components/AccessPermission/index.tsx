"use client";
import React from 'react';

function Index() {
    const storedPrivileges = sessionStorage.getItem("privileges");
    const userPrivilegesArray = storedPrivileges ? storedPrivileges.split(",") : [];

    return (
            <div className="mt-4 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Your Account Privileges
                </h1>
                <p className="text-gray-600 mb-6">
                    The permissions assigned to your account are as follows:
                </p>
                
                <div className="space-y-4">
                    {userPrivilegesArray.length > 0 ? (
                        userPrivilegesArray.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg bg-blue-100 text-blue-800 font-medium shadow-sm flex items-center space-x-3"
                            >
                                <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.293-7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p>{item}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No privileges assigned.</p>
                    )}
                </div>
            </div>
        
    );
}

export default Index;
