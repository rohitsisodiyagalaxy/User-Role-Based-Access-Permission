// app/dashboard/users/add/page.js
// import PermissionForm from "@/components/Permission/PermissionForm";
import StudentReport from "@/components/Report/StudentReport";

export default function StudentReportPage({params}) {
    const { id } = params;

  return (
    <>
        Student Report Page
        <StudentReport studentId={id} />
      {/* <PermissionForm permissionId={id} /> */}
    </>
  );
}
