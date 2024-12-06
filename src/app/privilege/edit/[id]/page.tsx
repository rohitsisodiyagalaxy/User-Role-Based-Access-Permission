// app/dashboard/users/add/page.js
import PrivilegesForm from "@/components/Privilege/PrivilegesForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function EditUserPage({ params }) {
  const { id } = params;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Users" />
      <div>
        <PrivilegesForm privilegesId={id} />
      </div>
    </DefaultLayout>
  );
}
