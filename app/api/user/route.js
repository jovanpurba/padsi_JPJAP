import { prisma } from "@/lib/prisma";

export async function GET() {
  return Response.json(
    await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    })
  );
}
