import { NextResponse } from "next/server";

export async function GET() {
    // Hapus cookie token JWT
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0, // Menghapus cookie
        path: "/",
    });

    return response;
}