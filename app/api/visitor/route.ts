import { NextResponse } from "next/server";
import Visitor from "@/lib/model/Visitor";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST() {
  await connectToDatabase();
  try {
    const newVisitor = await Visitor.create({});
    return NextResponse.json(
      { message: "Visitor saved", data: newVisitor },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDatabase();
  try {
    const all = await Visitor.find({});
    return NextResponse.json(all, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    );
  }
}
