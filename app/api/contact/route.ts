import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/lib/model/Message";

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  try {
    const newMessage = await Message.create({ name, email, message });
    return NextResponse.json({ message: "Message stored.", data: newMessage });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

// ✅ ADD THIS:
export async function GET() {
  await connectToDatabase();
  try {
    const allMessages = await Message.find({});
    return NextResponse.json(allMessages, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
