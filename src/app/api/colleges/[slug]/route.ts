import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The context parameter MUST be defined exactly like this for the build to pass
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // 1. You MUST await the params object
    const { slug } = await context.params;

    // 2. Now you can use the slug to query your database
    const college = await prisma.college.findUnique({
      where: { slug: slug },
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
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );
  }
}