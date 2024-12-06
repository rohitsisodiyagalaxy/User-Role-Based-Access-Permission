// app/dashboard/users/add/page.js
"use client"; 
import UserForm from "@/components/User/UserForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Add_User } from "@/constants/permissionConstant";
import { hasPrivilege } from "@/utils/hasPrivilege";
import NoAccessPage from "@/components/NoAccessPage";
import { logAction } from "@/utils/logger";
import { Audit_Add_User } from "@/constants/auditLogContant";

export default function AddUserPage() {
  const userid = sessionStorage.getItem("userid");

  if (!hasPrivilege(Add_User)) {
    return <NoAccessPage />;
  }
  logAction(Audit_Add_User, userid);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Users" />
      <div>
        <UserForm />
      </div>
    </DefaultLayout>
  );
}
