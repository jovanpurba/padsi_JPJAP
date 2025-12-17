import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.pelanggan.findMany({ orderBy: { nama: "asc" } });
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const { nama, alamat, notelp } = body;

  if (!nama || !alamat || !notelp) {
    return Response.json(
      { error: "nama, alamat, notelp wajib diisi" },
      { status: 400 }
    );
  }

  const created = await prisma.pelanggan.create({
    data: { nama, alamat, notelp },
  });

  return Response.json(created);
}
