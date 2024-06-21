import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

type Params = {
  cid: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  const { cid } = context.params;
  try {
    const services = await db.service.findMany({
      where: {
        itype: cid,
      },
    });
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
