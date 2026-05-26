import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { collegeIds } = await request.json(); // Array of college IDs

  console.log("DEBUG: Creating comparison with userId:", (session.user as any).id);
  
  const comparison = await prisma.comparison.create({
    data: {
      userId: (session.user as any).id,
      colleges: {
        connect: collegeIds.map((id: string) => ({ id }))
      }
    }
  });

  

  return NextResponse.json(comparison);
}