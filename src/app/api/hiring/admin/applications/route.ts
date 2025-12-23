import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { HiringForm } from "@/models/hiring/HiringForm";

export async function GET() {
  let message = "An unknown error occurred.";

  try {
    // Establish a connection to the database.
    await connectDB();

    // Query for pending forms. By not using .select(), we command Mongoose
    // to retrieve every single field defined in the HiringFormSchema.
    const pendingForms = await HiringForm.find({ status: "pending" }).sort({
      createdAt: -1,
    });

    // Similarly, query for approved forms, retrieving all fields.
    const completedForms = await HiringForm.find({ status: "approved" }).sort({
      updatedAt: -1,
    });

    // This log is for definitive verification in your terminal.
    // Verification: pendingForms.length = ${pendingForms.length}

    // Return the complete data.
    return NextResponse.json({ success: true, pendingForms, completedForms });
  } catch (error) {
    // A robust error handler for diagnosing any unexpected issues.
    if (error instanceof Error) {
      message = error.message;
    }

    // Return the specific error message when available to avoid unused variables
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
