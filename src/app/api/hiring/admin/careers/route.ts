import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Career } from "@/models/hiring/Career";

// Handles POST requests to /api/admin/careers to add a new career
export async function POST(req: Request) {
  try {
    const { title, team, role } = await req.json();

    if (!title || !team || !role) {
      return NextResponse.json(
        { success: false, error: "Title, team, and role are required fields" },
        { status: 400 },
      );
    }

    await connectDB();
    const newCareer = await Career.create({ title, team, role });

    return NextResponse.json(
      { success: true, career: newCareer },
      { status: 201 },
    );
  } catch (error) {
    let message = "An unknown server error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("❌ Error creating career:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

// Handles GET requests to /api/careers (and implicitly /api/admin/careers)
// This single endpoint can be used by both the public page and the admin panel.
export async function GET() {
  try {
    await connectDB();
    const careers = await Career.find({});

    // Sort careers so that all Lead roles come first (alphabetical by title),
    // then Executive roles (alphabetical), then any other roles.
    careers.sort((a, b) => {
      const roleOrder = (role?: string) => {
        const r = (role || "").toLowerCase();
        if (r.includes("lead")) return 0;
        if (r.includes("executive")) return 1;
        return 2;
      };

      const oa = roleOrder(a.role);
      const ob = roleOrder(b.role);
      if (oa !== ob) return oa - ob;

      // Same role group: sort alphabetically by title (case-insensitive)
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    });

    return NextResponse.json({ success: true, careers });
  } catch (error) {
    let message = "An unknown server error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    console.error("❌ Error fetching careers:", message);
    return NextResponse.json(
      { success: false, error: "Server error fetching careers" },
      { status: 500 },
    );
  }
}
