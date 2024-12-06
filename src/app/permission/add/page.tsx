// app/dashboard/users/add/page.js
import PermissionForm from "@/components/Permission/PermissionForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function AddPermissionPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Permission" />
    <div>
      <PermissionForm />
    </div>
    </DefaultLayout>
  );
}
