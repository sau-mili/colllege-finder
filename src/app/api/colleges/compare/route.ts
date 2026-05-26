import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slugs = searchParams.get("slugs")?.split(",") || [];

    if (slugs.length < 2 || slugs.length > 3) {
      return NextResponse.json(
        { error: "Please provide 2-3 college slugs" },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: { slug: { in: slugs } },
      include: {
        courses: true,
        placements: {
          orderBy: { year: "desc" },
          take: 1,
        },
      },
    });

    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to compare colleges" },
      { status: 500 }
    );
  }
}
