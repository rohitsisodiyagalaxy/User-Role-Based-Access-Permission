 "use client"; // Ensure this is a client component
import { logAction } from "@/utils/logger";
import { Audit_Student_Report } from "@/constants/auditLogContant";
import ProgressReport from "@/components/Progress-Report/ProgressReport";


const ProgressStudentsReport = () => {
    const userid = sessionStorage.getItem("userid");
    logAction(Audit_Student_Report, userid);


    return (
        <>
           <ProgressReport />
           {/* <StudentReport /> */}
        </>
            
        
    );
};

export default ProgressStudentsReport;


