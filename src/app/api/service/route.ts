"use server";

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const services = await db.service.findMany();
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
