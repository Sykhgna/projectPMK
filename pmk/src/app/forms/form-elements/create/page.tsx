"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CreateBarangMasuk = () => {
    const [formData, setFormData] = useState({
        nama_barang: "",
        jumlah: 0,
        supplier: "",
        tanggal_masuk: "",
    });

    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "jumlah" ? parseInt(value) || 0 : value,
        });
    };
    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/barang_masuk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Data berhasil ditambahkan!");
                router.push("/"); // Kembali ke halaman utama
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <DefaultLayout>

            <div>
                <h1 className="text-xl font-bold mb-4">Create Barang Masuk</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Nama Barang:</label>
                        <input
                            type="text"
                            name="nama_barang"
                            value={formData.nama_barang}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Jumlah:</label>
                        <input
                            type="number"
                            name="jumlah"
                            value={formData.jumlah}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Supplier:</label>
                        <input
                            type="text"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Tanggal Masuk:</label>
                        <input
                            type="date"
                            name="tanggal_masuk"
                            value={formData.tanggal_masuk}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CreateBarangMasuk;
