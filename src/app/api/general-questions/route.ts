import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.generalQuestion.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(questions);
  } catch (error) {
    // Add this line to see the real error in your terminal
    console.error("API Error details:", error); 
    
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}