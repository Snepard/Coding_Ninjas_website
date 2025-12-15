import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Otp } from "@/models/hiring/Otp";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and OTP code are required" },
        { status: 400 },
      );
    }

    if (code.length !== 6) {
      return NextResponse.json(
        { error: "Invalid OTP code format" },
        { status: 400 },
      );
    }

    await connectDB();

    // Find the OTP
    const otp = await Otp.findOne({
      email: email.toLowerCase(),
      code,
      isUsed: false,
    });

    if (!otp) {
      return NextResponse.json(
        { error: "Invalid or expired OTP code" },
        { status: 400 },
      );
    }

    // Check if OTP has expired
    if (new Date() > otp.expiresAt) {
      await Otp.deleteOne({ _id: otp._id });
      return NextResponse.json(
        { error: "OTP code has expired" },
        { status: 400 },
      );
    }

    // Mark OTP as used
    otp.isUsed = true;
    await otp.save();

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json(
      { error: "Failed to verify OTP. Please try again." },
      { status: 500 },
    );
  }
}
