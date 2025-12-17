import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const username = (body.username || "").trim();
    const password = body.password || "";
    const role = body.role === "ADMIN" ? "ADMIN" : "KURIR"; // default KURIR

    if (!username || !password) {
      return Response.json(
        { error: "username dan password wajib" },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) {
      return Response.json({ error: "username sudah dipakai" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { username, password: hash, role },
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server error" }, { status: 500 });
  }
}
