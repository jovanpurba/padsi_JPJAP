import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const kurirId = searchParams.get("kurirId");

  if (!kurirId) {
    return Response.json({ error: "kurirId wajib" }, { status: 400 });
  }

  // Notifikasi = jadwal yang belum selesai antar
  const data = await prisma.jadwal.findMany({
    where: {
      kurirId,
      status: { in: ["PICKUP", "PROSES"] }, // yang belum selesai antar
    },
    include: { pelanggan: true, kurir: true },
    orderBy: { tanggal: "desc" },
  });

  // bikin format "notifikasi"
  const notif = data.map((j) => ({
    id: j.id,
    message: `Harus diantar: ${j.pelanggan.nama} (${j.pelanggan.notelp}) - ${j.pelanggan.alamat}`,
    status: j.status,
    tanggal: j.tanggal,
  }));

  return Response.json(notif);
}
