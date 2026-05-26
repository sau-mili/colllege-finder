import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The context type now correctly identifies params as a Promise
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // You MUST await the params before accessing them
    const { slug } = await context.params;

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