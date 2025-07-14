// app/api/suggestion/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // adjust if path differs
import { Suggestion } from "@/lib/model/Suggestion";

// POST: Add new suggestion
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const newSuggestion = new Suggestion({ message });
    await newSuggestion.save();

    return NextResponse.json({ success: true, suggestion: newSuggestion });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET: Fetch all suggestions (optional)
export async function GET() {
  try {
    await connectToDatabase();
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, suggestions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
