"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/router";

const FormElements = () => {
  const router = useRouter();

  const handleCreate = () => {
    // Mengarahkan ke halaman create barang masuk
    router.push("/create/barang_masuk");
  };

  return (
    <>
      <Breadcrumb pageName="Barang Masuk" />
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Barang Masuk</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">No</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Nama Barang</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Jumlah</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Supplier</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Tanggal Masuk</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="border border-gray-200 px-6 py-4">1</td>
              <td className="border border-gray-200 px-6 py-4">Makanan Kucing A</td>
              <td className="border border-gray-200 px-6 py-4">50</td>
              <td className="border border-gray-200 px-6 py-4">Supplier XYZ</td>
              <td className="border border-gray-200 px-6 py-4">2024-12-10</td>
              <td className="border border-gray-200 px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="ml-2 text-red-600 hover:text-red-800">Hapus</button>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-6 py-4">2</td>
              <td className="border border-gray-200 px-6 py-4">Makanan Kucing B</td>
              <td className="border border-gray-200 px-6 py-4">30</td>
              <td className="border border-gray-200 px-6 py-4">Supplier ABC</td>
              <td className="border border-gray-200 px-6 py-4">2024-12-09</td>
              <td className="border border-gray-200 px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                <button className="ml-2 text-red-600 hover:text-red-800">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormElements;
