export const dynamic = 'force-dynamic'; // <-- Tambahkan ini

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req){
  try {
    const {username, password} = await req.json();
    const user = await prisma.user.findUnique({where: {username}});
    
    if(!user) return Response.json({error: "not found"}, {status: 401});

    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return Response.json({error: "wrong"}, {status: 401});

    return Response.json({role: user.role});
  } catch (error) {
    return Response.json({error: "Internal Server Error"}, {status: 500});
  }
}