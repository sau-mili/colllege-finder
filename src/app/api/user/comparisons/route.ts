import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;

    // Fetch comparisons and include the college details
    const comparisons = await prisma.comparison.findMany({
      where: { userId },
      include: { colleges: true }, 
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comparisons);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comparisons" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { comparisonId } = await request.json();
    const userId = (session.user as any).id;

    // Ensure the comparison belongs to the user before deleting
    await prisma.comparison.deleteMany({
      where: {
        id: comparisonId,
        userId: userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete comparison" }, { status: 500 });
  }
}