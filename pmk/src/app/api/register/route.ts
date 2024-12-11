import { NextRequest, NextResponse } from "next/server";
import { db } from "../config";

export async function POST(request:NextRequest) {
    try {
        const {email, username, password} = await request.json();

        if(!!email ||!username ||!password) return NextResponse.json({
            success: false,
            msg: "Isi semua field"
        },{status:400});

        const user = await db.user.create({
            data:{email, password, username}
        })

        return NextResponse.json({
            success: true,
            msg: "Berhasil register.",
            data: user
        },{status: 201});
    } catch (error:any) {
        return NextResponse.json({
            success: true,
            msg: "Internal server error.",
            error: error.message
        },{status: 500});
    }
}