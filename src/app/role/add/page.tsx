// app/dashboard/users/add/page.js
"use client"; 
import RoleForm from "@/components/Role/RoleForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Add_Role } from "@/constants/permissionConstant";
import { hasPrivilege } from "@/utils/hasPrivilege";
import NoAccessPage from "@/components/NoAccessPage";
import { logAction } from "@/utils/logger";
import { Audit_Add_Role } from "@/constants/auditLogContant";

export default function AddRolePage() {
  const userid = sessionStorage.getItem("userid");
  logAction(Audit_Add_Role, userid);

  if (!hasPrivilege(Add_Role)) {
    return <NoAccessPage />;
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Role" />
      <div>
        <RoleForm />
      </div>
    </DefaultLayout>
  );
}
