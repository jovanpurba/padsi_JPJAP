import { prisma } from "@/lib/prisma";

export async function GET() {
  // total pengantaran = total jadwal
  const totalPengantaran = await prisma.jadwal.count();

  // total pengantaran berdasarkan status
  const [pickup, proses, antar] = await Promise.all([
    prisma.jadwal.count({ where: { status: "PICKUP" } }),
    prisma.jadwal.count({ where: { status: "PROSES" } }),
    prisma.jadwal.count({ where: { status: "ANTAR" } }),
  ]);

  // total kurir
  const totalKurir = await prisma.user.count({ where: { role: "KURIR" } });

  // Definisi "kurir siap mengantar":
  // kurir yang TIDAK sedang punya jadwal status PICKUP/PROSES (anggap masih aktif)
  const kurirSedangAktif = await prisma.jadwal.findMany({
    where: {
      kurirId: { not: null },
      status: { in: ["PICKUP", "PROSES"] },
    },
    select: { kurirId: true },
    distinct: ["kurirId"],
  });

  const kurirAktifCount = kurirSedangAktif.length;
  const kurirSiap = Math.max(totalKurir - kurirAktifCount, 0);

  return Response.json({
    totalPengantaran,
    totalKurir,
    kurirSiap,
    byStatus: {
      PICKUP: pickup,
      PROSES: proses,
      ANTAR: antar,
    },
  });
}
