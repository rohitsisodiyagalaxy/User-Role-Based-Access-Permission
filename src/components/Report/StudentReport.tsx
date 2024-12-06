"use client";
import  Student  from "@/models/Student";
import { useEffect, useState } from "react"; // Import useState and useEffect

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";

import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import DeleteButton from "@/components/DeleteButton"; // Adjust the import path accordingly
// import MasterStudentReport from "@/components/Report/MasterStudentReport";
import exportToCsv from '@/lib/exportToCsv';

async function fetchStudents({studentId}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student-reports/${studentId}`, {
        method: "GET",
        cache: "no-cache",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch student");
    }

    return response.json();
}

export default function StudentReport(studentId) {
    const [students, setStudents] = useState<Student[]>([]);

    // Fetch users when the component mounts
    useEffect(() => {
        
    
        const getStudents = async () => {
            const fetchedStudents = await fetchStudents({studentId});
            setStudents(fetchedStudents);
        };
        getStudents();
    }, []);

    const handleExport = () => {
        console.log(students);return false;
        exportToCsv('student_progress_report.csv', students);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Student Records" />
        <div className="flex flex-col gap-3">
            <SuccessMessage />
            <div className="flex justify-end">
            <button 
        className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={handleExport}
        >
        Export Students Reports &nbsp;&nbsp;
        <svg className="w-5 h-5 inline-block"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z" fill=""></path>
                                    <path d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z" fill=""></path>
                                    </svg>
        </button>                </div>
            <div className="overflow-x-auto rounded-sm border ...">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 dark:bg-meta-4">
                            <th className="p-4 text-left text-sm font-medium uppercase">No.</th>
                            <th className="p-4 text-left text-sm font-medium uppercase">Student Name</th>
                            <th className="p-4 text-left text-sm font-medium uppercase">Class</th>
                            <th className="p-4 text-left text-sm font-medium uppercase">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id} className={`border-b border-stroke dark:border-strokedark`}>
                                <td className="p-4 text-center text-black dark:text-white">{index + 1}</td>
                                <td className="p-4 text-black dark:text-white">{student.name}</td>
                                <td className="p-4 text-black dark:text-white">{student.class}</td>
                                <td className="p-4 text-black dark:text-white">{student.grade}</td>                                    
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </DefaultLayout>
        )}