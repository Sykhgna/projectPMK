"use client";

import { useState, useEffect } from 'react';
import { User } from '@prisma/client'; // Mengimpor tipe User dari Prisma
import DefaultLayout from '@/components/Layouts/DefaultLayout'; // Layout untuk halaman
import { useRouter } from 'next/navigation'; // Router untuk navigasi halaman

export default function LaporanStockPage() {
    // State untuk menyimpan data pengguna, pengguna yang sedang diedit, dan status modal
    const [users, setUsers] = useState<User[]>([]); // Menyimpan daftar pengguna
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Pengguna yang sedang diedit
    const [isModalOpen, setIsModalOpen] = useState(false); // Status apakah modal terbuka atau tidak
    const [formData, setFormData] = useState<{
        username: string | null;
        full_name: string | null;
        email: string | null;
        role: string | null;
        password: string | null; // Menambahkan password
    }>({
        username: null,
        full_name: null,
        email: null,
        role: null,
        password: null, // Menambahkan password
    });

    const [error, setError] = useState<string>(""); // Untuk menyimpan pesan error
    const [isSubmitting, setIsSubmitting] = useState(false); // Status pengiriman data
    const router = useRouter(); // Hook untuk navigasi halaman

    // Fungsi untuk mengarahkan ke halaman pembuatan pengguna baru
    const handleCreateUser = () => {
        router.push('/user/create'); // Pindah ke halaman pembuatan pengguna
    };

    // Fungsi untuk membuka modal dan mengisi data pengguna yang dipilih
    const handleEditClick = (user: User) => {
        setSelectedUser(user); // Set pengguna yang sedang diedit
        setFormData({
            username: user.username,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            password: user.password,
        });
        setIsModalOpen(true); // Menampilkan modal edit
    };

    // Fungsi untuk mengelola perubahan nilai input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || "", // Menghindari nilai kosong
        });
    };

    // Fungsi untuk mengirimkan data yang sudah diedit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Menghindari form submit default
        setIsSubmitting(true); // Mengatur status sedang memproses
        setError(""); // Reset error

        try {
            const response = await fetch(`/api/users/${selectedUser?.user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error updating user");
            }

            // Jika berhasil, tutup modal dan perbarui daftar pengguna
            alert("User updated successfully!");
            setIsModalOpen(false);
            fetchUsers(); // Menarik ulang data pengguna
        } catch (err) {
            setError("Failed to update user. Please try again."); // Menampilkan error
        } finally {
            setIsSubmitting(false); // Menyelesaikan proses pengiriman
        }
    };

    // Fungsi untuk mengambil daftar pengguna dari API
    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data); // Menyimpan data pengguna ke state
    };

    const handleDelete = async (userId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "DELETE",
            });
            console.log('Response:', response);

            if (!response.ok) {
                throw new Error("Failed to delete user.");
            }

            alert("User deleted successfully!");
            fetchUsers(); // Refresh the users list
        } catch (error) {
            alert("Error deleting user: " + error);
        }
    };

    // Menarik data pengguna saat komponen pertama kali dimuat
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <DefaultLayout>
            <div className="overflow-x-auto">
                <div className="mb-4">
                    <button
                        onClick={handleCreateUser}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </div>
                {/* Tabel Daftar Pengguna */}
                <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">No</th>
                            <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Username</th>
                            <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Nama Panjang</th>
                            <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Email</th>
                            <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Role</th>
                            <th className="border border-gray-200 px-6 py-3 font-medium text-gray-900">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users.map((user, index) => (
                            <tr key={user.user_id}>
                                <td className="border border-gray-200 px-6 py-4">{index + 1}</td>
                                <td className="border border-gray-200 px-6 py-4">{user.username}</td>
                                <td className="border border-gray-200 px-6 py-4">{user.full_name}</td>
                                <td className="border border-gray-200 px-6 py-4">{user.email}</td>
                                <td className="border border-gray-200 px-6 py-4">{user.role}</td>
                                <td className="border border-gray-200 px-6 py-4">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(String(user.user_id))}
                                        className="ml-2 text-red-600 hover:text-red-800">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal untuk Edit Pengguna */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 mt-20">
                        <div
                            className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
                        >
                            <h2 className="text-2xl font-bold mb-3">Edit User</h2>
                            {error && <p className="text-red-500 mb-3">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                {/* Input untuk Username */}
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-gray-700">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username || ""}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                        required
                                    />
                                </div>

                                {/* Input untuk Full Name */}
                                <div className="mb-4">
                                    <label htmlFor="full_name" className="block text-gray-700">Full Name:</label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name || ""}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                        required
                                    />
                                </div>

                                {/* Input untuk Email */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                        required
                                    />
                                </div>

                                {/* Select untuk Role */}
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-gray-700">Role:</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role || ""}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="PEGAWAI">Pegawai</option>
                                    </select>
                                </div>

                                {/* Input untuk Password */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password || ""}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                    />
                                </div>

                                {/* Tombol untuk mengirimkan form atau membatalkan */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mr-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${isSubmitting ? 'bg-gray-400' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}
