// app/dashboard/no-access/page.js
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function NoAccessPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Access Denied" />
      <div className="flex justify-center items-center h-full">
        <p className="text-xl font-semibold text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    </DefaultLayout>
  );
}
