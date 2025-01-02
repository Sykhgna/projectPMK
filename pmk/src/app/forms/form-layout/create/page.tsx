"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlah, setJumlah] = useState<number | "">("");
  const [harga, setHarga] = useState("");
  const [penerima, setPenerima] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newBarangKeluar = {
      nama_barang: namaBarang,
      jumlah: Number(jumlah),
      harga,
      penerima,
      tanggal_keluar: tanggalKeluar,
    };

    try {
      const response = await fetch("/api/barang_keluar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBarangKeluar),
      });

      if (response.ok) {
        alert("Barang Keluar berhasil ditambahkan!");
        router.push("/barang_keluar");
      } else {
        alert("Gagal menambahkan Barang Keluar");
      }
    } catch (error) {
      console.error("Error creating Barang Keluar:", error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Barang Keluar" />
      <h1 className="text-xl font-bold mb-6">Tambah Barang Keluar</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
          <input
            type="text"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Jumlah</label>
          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(Number(e.target.value))}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Harga</label>
          <input
            type="text"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Penerima</label>
          <input
            type="text"
            value={penerima}
            onChange={(e) => setPenerima(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tanggal Keluar</label>
          <input
            type="date"
            value={tanggalKeluar}
            onChange={(e) => setTanggalKeluar(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {loading ? "Loading..." : "Simpan"}
        </button>
      </form>
    </DefaultLayout>
  );
};

export default CreateForm;
