// app/dashboard/users/add/page.js
"use client";
import RoleForm from "@/components/Role/RoleForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Update_Roles } from "@/constants/permissionConstant";
import  {hasPrivilege}  from "@/utils/hasPrivilege";
import NoAccessPage from "@/components/NoAccessPage";
import { logAction } from "@/utils/logger";
import { Audit_Update_Roles } from "@/constants/auditLogContant";

export default function EditUserPage({ params }) {

  /*  if (!hasPrivilege(Update_Roles)) {
    return <NoAccessPage />;
    
  }  */
    const userid = sessionStorage.getItem("userid");
    logAction(Audit_Update_Roles, userid);
  
  const { id } = params;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Users" />
      <div>
        <RoleForm roleId={id} />
      </div>
    </DefaultLayout>
  );
}
