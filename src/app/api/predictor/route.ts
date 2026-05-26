import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { examId, rank } = await request.json();

  // Find colleges where the cutoff rank is greater than or equal to user's rank
  const matches = await prisma.cutoff.findMany({
    where: {
      examId,
      rank: { gte: rank }, // Logic: If cutoff is 5000, and user is 4000, they are in
    },
    include: { college: true },
    orderBy: { rank: "desc" },
    take: 10,
  });

  return NextResponse.json(matches);
}