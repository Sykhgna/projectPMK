import { NextResponse } from "next/server";
import { db } from "../config";

export async function GET() {
    try {
        const penjualan = await db.penjualan.findMany()
        return NextResponse.json({
            status: 200,
            data: penjualan
        },{status: 200})
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            error:error.message
        },{status: 500})
    }
}