import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ message: "Signed out" }, { status: 200 });

    // Clear token cookie
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Signout error:", err);
    return NextResponse.json({ error: "Could not sign out" }, { status: 500 });
  }
}
