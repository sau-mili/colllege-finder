import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId: (session.user as any).id },
      include: {
        college: {
          include: {
            placements: {
              orderBy: { year: "desc" },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(saved.map((s) => s.college));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch saved colleges" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { collegeId } = await request.json();
    const userId = (session.user as any).id;

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });

    if (existing) {
      await prisma.savedCollege.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false });
    }

    await prisma.savedCollege.create({
      data: { userId, collegeId },
    });

    return NextResponse.json({ saved: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save college" },
      { status: 500 }
    );
  }
}
