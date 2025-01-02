"use client";

import React, { useState } from "react";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useRouter } from 'next/navigation';

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "",
        full_name: "",
        email: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error creating user");
            }

            // Handle successful response
            alert("User created successfully!");
            router.push('/user');
        } catch (err) {
            setError("Failed to create user. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <DefaultLayout>

            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create User</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="PEGAWAI">Pegawai</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="full_name" className="block text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className={`w-full p-2 text-white rounded-md mt-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default CreateUserForm;
