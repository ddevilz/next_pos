import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: NextRequest, response: NextResponse) {
  const phone = request.nextUrl.searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({
      error: "Phone not found",
    });
  }

  const cus = await db.customer.findMany({
    where: {
      mobile: {
        startsWith: phone,
      },
    },
  });

  return NextResponse.json({
    cus,
  });
}
