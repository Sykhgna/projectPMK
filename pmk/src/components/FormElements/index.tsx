"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useRouter } from "next/navigation";

// Definisikan tipe data untuk Barang Masuk
interface BarangMasuk {
  id: number;
  nama_barang: string;
  jumlah: number;
  supplier: string;
  tanggal_masuk: string;
}

const FormElements = () => {
  const [barangMasuk, setBarangMasuk] = useState<BarangMasuk[]>([]);
  const router = useRouter();

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/barang_masuk");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: BarangMasuk[] = await response.json();
        setBarangMasuk(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk mengarahkan ke halaman create
  const handleCreate = () => {
    router.push("/forms/form-elements/create");
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

      {/* Tabel Barang Masuk */}
      <div className="overflow-x-auto">
        {barangMasuk.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">No</th>
                <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Nama Barang</th>
                <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Jumlah</th>
                <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Supplier</th>
                <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Tanggal Masuk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {barangMasuk.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-200 px-6 py-4">{index + 1}</td>
                  <td className="border border-gray-200 px-6 py-4">{item.nama_barang}</td>
                  <td className="border border-gray-200 px-6 py-4">{item.jumlah}</td>
                  <td className="border border-gray-200 px-6 py-4">{item.supplier}</td>
                  <td className="border border-gray-200 px-6 py-4">{new Date(item.tanggal_masuk).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">Tidak ada data barang masuk.</p>
        )}
      </div>
    </>
  );
};

export default FormElements;
