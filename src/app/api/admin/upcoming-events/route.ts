import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UpcomingEvent } from "@/models/UpcomingEvent";

export async function GET() {
  try {
    await connectDB();
    const events = await UpcomingEvent.find({}).sort({ date: 1 }).lean();

    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return NextResponse.json(
      { success: false, error: "Server error fetching upcoming events" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, date, location, poster } = await req.json();

    if (!name || !description || !date || !location || !poster) {
      return NextResponse.json(
        {
          success: false,
          error:
            "All fields (name, description, date, location, poster) are required",
        },
        { status: 400 },
      );
    }

    await connectDB();
    const event = await UpcomingEvent.create({
      name,
      description,
      date,
      location,
      poster,
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error("Error creating upcoming event:", error);
    return NextResponse.json(
      { success: false, error: "Server error creating upcoming event" },
      { status: 500 },
    );
  }
}
