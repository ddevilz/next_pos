import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json({ categories }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
