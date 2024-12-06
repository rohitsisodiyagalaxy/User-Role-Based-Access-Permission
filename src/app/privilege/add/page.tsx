// app/dashboard/users/add/page.js
import PrivilegesForm from "@/components/Privilege/PrivilegesForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function AddRolePage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Privileges" />
      <div>
        <PrivilegesForm />
      </div>
    </DefaultLayout>
  );
}
