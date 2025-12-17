import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.jadwal.findMany({
    include: { pelanggan: true, kurir: true },
    orderBy: { tanggal: "asc" },
  });
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const { pelangganId, tanggal, kurirId } = body;

  if (!pelangganId || !tanggal) {
    return Response.json(
      { error: "pelangganId dan tanggal wajib diisi" },
      { status: 400 }
    );
  }

  // ✅ Auto assign kurir kalau tidak dipilih
  let assignedKurirId = kurirId || null;

  if (!assignedKurirId) {
    const firstKurir = await prisma.user.findFirst({
      where: { role: "KURIR" },
      select: { id: true },
      orderBy: { username: "asc" },
    });
    assignedKurirId = firstKurir?.id || null;
  }

  const created = await prisma.jadwal.create({
    data: {
      pelangganId,
      tanggal: new Date(tanggal),
      kurirId: assignedKurirId,
    },
    include: { pelanggan: true, kurir: true },
  });

  // ✅ Buat notifikasi untuk kurir
  if (created.kurirId) {
    await prisma.notification.create({
      data: {
        userId: created.kurirId,
        message: `Jadwal baru: ${created.pelanggan.nama} (${created.pelanggan.notelp})`,
      },
    });
  }

  return Response.json(created);
}
