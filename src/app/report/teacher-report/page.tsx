 "use client"; // Ensure this is a client component
// import {Student} from "@/models/Student";
// import { useEffect, useState } from "react"; // Import useState and useEffect
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import Link from "next/link";
// import {Student} from "@/models/Student";
// import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
// import DeleteButton from "@/components/DeleteButton"; // Adjust the import path accordingly
import TeachersList from "@/components/Report/TeachersList";
// import StudentReport from "@/components/Report/StudentReport";
// import exportToCsv from '@/lib/exportToCsv';
import { logAction } from "@/utils/logger";
import { Audit_Teacher_Report } from "@/constants/auditLogContant";



const TeachersListPage = () => {
    const userid = sessionStorage.getItem("userid");
    logAction(Audit_Teacher_Report, userid);
    return (
        <>
           <TeachersList />
           {/* <StudentReport /> */}
        </>
            
        
    );
};

export default TeachersListPage;


