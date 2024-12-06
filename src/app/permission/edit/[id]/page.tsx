// app/dashboard/users/add/page.js
import PermissionForm from "@/components/Permission/PermissionForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function EditPermissionPage({params}) {
    const { id } = params;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Permission" />
    <div>
      <PermissionForm permissionId={id} />
    </div>
    </DefaultLayout>
  );
}
