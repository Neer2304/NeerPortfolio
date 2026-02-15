import { NextResponse } from "next/server";
import VisitorAnalytics from "@/lib/model/VisitorAnalytics";
import {connectToDatabase} from "@/lib/mongodb"; 

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json().catch(() => ({}));

    const ip = 
      req.headers.get("x-forwarded-for")?.split(",")[0] || 
      req.headers.get("x-real-ip") || 
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    const newVisitor = await VisitorAnalytics.create({
      ip,
      country: body.country || "Unknown",
      city: body.city || "Unknown",
      region: body.region || "Unknown",
      page: body.page || "/",
      userAgent,
    });

    return NextResponse.json(
      { message: "Visitor analytics saved", data: newVisitor },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error saving visitor:", err);
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const visitors = await VisitorAnalytics.find({})
      .sort({ createdAt: -1 })
      .limit(100); // Add limit for performance

    return NextResponse.json(visitors, { status: 200 });
  } catch (err) {
    console.error("Error fetching visitors:", err);
    return NextResponse.json(
      { message: "Server error", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}