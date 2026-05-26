import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const type = searchParams.get("type") || "";
    const minFees = parseInt(searchParams.get("minFees") || "0");
    const maxFees = parseInt(searchParams.get("maxFees") || "10000000");
    const minRating = parseFloat(searchParams.get("minRating") || "0");
    const sortBy = searchParams.get("sortBy") || "rating";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: Prisma.CollegeWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { city: { contains: search, mode: "insensitive" } },
                { state: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        state ? { state: { equals: state, mode: "insensitive" } } : {},
        type ? { type } : {},
        { fees: { gte: minFees, lte: maxFees } },
        { rating: { gte: minRating } },
      ],
    };

    const orderBy: Prisma.CollegeOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          placements: {
            orderBy: { year: "desc" },
            take: 1,
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    // Get unique states for filter dropdown
    const states = await prisma.college.findMany({
      select: { state: true },
      distinct: ["state"],
      orderBy: { state: "asc" },
    });

    return NextResponse.json({
      colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        states: states.map((s) => s.state),
        types: ["Government", "Private", "Deemed"],
      },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
