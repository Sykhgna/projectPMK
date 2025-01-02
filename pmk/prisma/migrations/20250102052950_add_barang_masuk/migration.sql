-- CreateTable
CREATE TABLE "BarangMasuk" (
    "id" SERIAL NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "supplier" TEXT NOT NULL,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarangMasuk_pkey" PRIMARY KEY ("id")
);
