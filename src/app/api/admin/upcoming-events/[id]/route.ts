import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UpcomingEvent } from "@/models/UpcomingEvent";

interface Params {
  params: { id: string };
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing event id" },
        { status: 400 },
      );
    }

    await connectDB();
    await UpcomingEvent.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting upcoming event:", error);
    return NextResponse.json(
      { success: false, error: "Server error deleting upcoming event" },
      { status: 500 },
    );
  }
}
