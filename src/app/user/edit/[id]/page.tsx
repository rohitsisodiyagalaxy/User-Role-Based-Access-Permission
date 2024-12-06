// app/dashboard/users/add/page.js
"use client"; 
import UserForm from "@/components/User/UserForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Update_User } from "@/constants/permissionConstant";
import { hasPrivilege } from "@/utils/hasPrivilege";
import NoAccessPage from "@/components/NoAccessPage";
import { logAction } from "@/utils/logger";
import { Audit_Update_User } from "@/constants/auditLogContant";

export default function EditUserPage({ params }) {
  const userid = sessionStorage.getItem("userid");

  const { id } = params;
   if (!hasPrivilege(Update_User)) {
    return <NoAccessPage />;
  } 
  logAction(Audit_Update_User, userid);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Users" />
      <div>
        <UserForm userId={id} />
      </div>
    </DefaultLayout>
  );
}
