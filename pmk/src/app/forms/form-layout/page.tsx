"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";

interface BarangKeluar {
  id: number;
  nama_barang: string;
  jumlah: number;
  harga: string;
  penerima: string;
  tanggal_keluar: string;
}

const FormLayout = () => {
  const [barangKeluar, setBarangKeluar] = useState<BarangKeluar[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/barang_keluar"); // Ganti dengan path API Anda
        const data = await response.json();
        setBarangKeluar(data);
      } catch (error) {
        console.error("Error fetching barang keluar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteBarangKeluar = async (id: number) => {
    // Implementasi delete
    try {
      await fetch(`/api/barang_keluar/${id}`, { method: "DELETE" });
      setBarangKeluar(barangKeluar.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting barang keluar:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Barang Keluar" />
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Barang Keluar</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => (window.location.href = "/forms/form-layout/create")}
        >
          Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">No</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Nama</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Jumlah</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Harga</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Penerima</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Tanggal Keluar</th>
              <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {barangKeluar.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-200 px-6 py-4">{index + 1}</td>
                <td className="border border-gray-200 px-6 py-4">{item.nama_barang}</td>
                <td className="border border-gray-200 px-6 py-4">{item.jumlah}</td>
                <td className="border border-gray-200 px-6 py-4">{item.harga}</td>
                <td className="border border-gray-200 px-6 py-4">{item.penerima}</td>
                <td className="border border-gray-200 px-6 py-4">{item.tanggal_keluar}</td>
                <td className="border border-gray-200 px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={() => deleteBarangKeluar(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
