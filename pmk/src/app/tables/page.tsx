import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/Tables/TableUser";
import TableProduct from "@/components/Tables/TableSale";
import TableSale from "@/components/Tables/TableProduct";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableUser />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
