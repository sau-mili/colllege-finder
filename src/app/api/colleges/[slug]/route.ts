import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: { slug: params.slug },
      include: {
        courses: true,
        placements: {
          orderBy: { year: "desc" },
        },
        reviews: {
          include: {
            user: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );
  }
}
