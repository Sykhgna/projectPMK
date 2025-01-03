import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.barangMasuk.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama_barang, jumlah, supplier, tanggal_masuk } = body;

    const newBarangMasuk = await prisma.barangMasuk.create({
      data: { nama_barang, jumlah, supplier, tanggal_masuk: new Date(tanggal_masuk) },
    });

    return NextResponse.json(newBarangMasuk, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
