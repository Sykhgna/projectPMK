import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

// CREATE - Menambahkan barang keluar baru
export async function POST(req: NextRequest) {
  try {
    const { nama_barang, jumlah, harga, penerima, tanggal_keluar } = await req.json();

    const newBarangKeluar = await prisma.barangKeluar.create({
      data: {
        nama_barang,
        jumlah,
        harga,
        penerima,
        tanggal_keluar: new Date(tanggal_keluar),
      },
    });

    return new Response(JSON.stringify(newBarangKeluar), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating barang keluar:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to create barang keluar' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// READ - Mengambil semua barang keluar
export async function GET() {
  try {
    const barangKeluar = await prisma.barangKeluar.findMany();
    return new Response(JSON.stringify(barangKeluar), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching barang keluar:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch barang keluar' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// UPDATE - Memperbarui data barang keluar berdasarkan ID
export async function PUT(req: NextRequest) {
    // Ambil ID dari URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
  
    if (!id || isNaN(Number(id))) {
      return new Response(
        JSON.stringify({ message: 'Invalid ID provided' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  
    try {
      // Cari barang keluar berdasarkan ID di database
      const barangKeluar = await prisma.barangKeluar.findUnique({
        where: { id: parseInt(id) },
      });
  
      // Jika barang keluar tidak ditemukan, return 404
      if (!barangKeluar) {
        return new Response(
          JSON.stringify({ message: 'Barang keluar not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Ambil data dari body request
      const { nama_barang, jumlah, harga, penerima, tanggal_keluar } = await req.json();
  
      // Perbarui barang keluar di database
      const updatedBarangKeluar = await prisma.barangKeluar.update({
        where: { id: parseInt(id) },
        data: {
          nama_barang: nama_barang || barangKeluar.nama_barang, // Jika nama_barang kosong, tetap gunakan yang lama
          jumlah: jumlah || barangKeluar.jumlah,
          harga: harga || barangKeluar.harga,
          penerima: penerima || barangKeluar.penerima,
          tanggal_keluar: tanggal_keluar ? new Date(tanggal_keluar) : barangKeluar.tanggal_keluar,
        },
      });
  
      return new Response(JSON.stringify(updatedBarangKeluar), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error updating barang keluar:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to update barang keluar' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

// DELETE - Menghapus data barang keluar berdasarkan ID
export async function DELETE(req: NextRequest) {
    // Ambil ID dari URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
  
    // Validasi ID
    if (!id || isNaN(Number(id))) {
      return new Response(
        JSON.stringify({ message: 'Invalid or missing ID provided' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  
    try {
      // Mencari barang keluar berdasarkan ID yang ada di database
      const barangKeluar = await prisma.barangKeluar.findUnique({
        where: { id: parseInt(id) },
      });
  
      // Jika barang keluar tidak ditemukan, kembalikan 404
      if (!barangKeluar) {
        return new Response(
          JSON.stringify({ message: 'Barang keluar not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Menghapus barang keluar berdasarkan ID
      const deletedBarangKeluar = await prisma.barangKeluar.delete({
        where: { id: parseInt(id) },
      });
  
      return new Response(JSON.stringify(deletedBarangKeluar), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error deleting barang keluar:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to delete barang keluar' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }