import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET: list kurir
export async function GET() {
  const data = await prisma.user.findMany({
    where: { role: "KURIR" },
    select: { id: true, username: true, role: true },
    orderBy: { username: "asc" },
  });
  return Response.json(data);
}

// POST: tambah kurir (manual)
export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return Response.json(
      { error: "username dan password wajib diisi" },
      { status: 400 }
    );
  }

  const exist = await prisma.user.findUnique({ where: { username } });
  if (exist) {
    return Response.json({ error: "username sudah dipakai" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const created = await prisma.user.create({
    data: { username, password: hashed, role: "KURIR" },
    select: { id: true, username: true, role: true },
  });

  return Response.json(created);
}
