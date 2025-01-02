import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nama_barang, jumlah, supplier, tanggal_masuk } = req.body;

    try {
      const newBarangMasuk = await prisma.barangMasuk.create({
        data: {
          nama_barang,
          jumlah,
          supplier,
          tanggal_masuk: new Date(tanggal_masuk), // Convert tanggal_masuk to Date object
        },
      });
      return res.status(201).json(newBarangMasuk);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create barang masuk' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
