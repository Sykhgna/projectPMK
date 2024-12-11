import { NextRequest, NextResponse } from "next/server";
import { db } from "../config";

export async function POST(request:NextRequest) {
    try {
        const {email, password}=await request.json()

        const user = await db.user.findFirst({where: {email}})

        if(!user) return NextResponse.json({
            success: false,
            msg: 'user belum terdaftar'
        },{status: 400});

        if(user.password !== password) return NextResponse.json({
            success: false,
            msg: 'invalid crendential'
        },{status: 400});
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            msg: error.message
        },{status: 500});
    }
}