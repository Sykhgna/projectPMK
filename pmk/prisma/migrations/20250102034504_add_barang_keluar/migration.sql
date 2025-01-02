-- CreateTable
CREATE TABLE "BarangKeluar" (
    "id" SERIAL NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "penerima" TEXT NOT NULL,
    "tanggal_keluar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BarangKeluar_pkey" PRIMARY KEY ("id")
);
