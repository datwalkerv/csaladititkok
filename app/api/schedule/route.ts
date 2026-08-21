import { NextResponse } from "next/server";
import { fetchAirings } from "@/lib/xmltv";

export const revalidate = 3600;

export async function GET() {
  try {
    const airings = await fetchAirings();
    return NextResponse.json({ airings });
  } catch (err) {
    console.error("Schedule fetch error:", err);
    return NextResponse.json({ error: "Could not fetch schedule" }, { status: 503 });
  }
}
