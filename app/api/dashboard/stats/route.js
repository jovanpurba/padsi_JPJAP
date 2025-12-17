import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const kurirCount = await prisma.user.count({
      where: { role: "KURIR" },
    });

    // "customer yang ingin diantar" -> jadwal yang belum selesai (PICKUP/PROSES)
    const pendingAntarCount = await prisma.jadwal.count({
      where: { status: { in: ["PICKUP", "PROSES"] } },
    });

    const jadwalByStatus = await prisma.jadwal.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    const userByRole = await prisma.user.groupBy({
      by: ["role"],
      _count: { _all: true },
    });

    const statusMap = { PICKUP: 0, PROSES: 0, ANTAR: 0 };
    for (const row of jadwalByStatus) statusMap[row.status] = row._count._all;

    const roleMap = { ADMIN: 0, KURIR: 0 };
    for (const row of userByRole) roleMap[row.role] = row._count._all;

    return Response.json({
      kurirCount,
      pendingAntarCount,
      statusMap,
      roleMap,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
