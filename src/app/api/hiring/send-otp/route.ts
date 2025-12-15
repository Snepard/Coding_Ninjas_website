import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Otp } from "@/models/hiring/Otp";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@chitkara\.edu\.in$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Only @chitkara.edu.in emails are allowed" },
        { status: 400 },
      );
    }

    await connectDB();

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete any existing unused OTPs for this email
    await Otp.deleteMany({ email, isUsed: false });

    // Save new OTP
    const newOtp = new Otp({
      email,
      code,
      expiresAt,
      isUsed: false,
    });

    await newOtp.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code - Coding Ninjas Hiring Portal",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
              border: 1px solid #3f3f46;
              border-radius: 16px;
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              color: #ffffff;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .content {
              padding: 40px 30px;
            }
            .otp-box {
              background: #18181b;
              border: 2px solid #ea580c;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-code {
              font-size: 42px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #f97316;
              margin: 10px 0;
              text-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
            }
            .info-text {
              color: #a1a1aa;
              font-size: 14px;
              line-height: 1.6;
              margin: 15px 0;
            }
            .warning {
              background: #422006;
              border-left: 4px solid #ea580c;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              background: #18181b;
              padding: 20px;
              text-align: center;
              border-top: 1px solid #3f3f46;
            }
            .footer p {
              color: #71717a;
              font-size: 12px;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🥷 Coding Ninjas</h1>
            </div>
            <div class="content">
              <h2 style="color: #ffffff; margin-top: 0;">Email Verification</h2>
              <p class="info-text">
                You requested an OTP code to verify your email address for the Coding Ninjas Hiring Portal.
              </p>
              
              <div class="otp-box">
                <p style="color: #a1a1aa; font-size: 14px; margin: 0 0 10px 0;">Your OTP Code</p>
                <div class="otp-code">${code}</div>
                <p style="color: #71717a; font-size: 12px; margin: 10px 0 0 0;">Valid for 10 minutes</p>
              </div>

              <div class="warning">
                <p style="margin: 0; color: #fbbf24; font-size: 14px;">
                  ⚠️ <strong>Security Notice:</strong> Never share this code with anyone. 
                  Our team will never ask for your OTP.
                </p>
              </div>

              <p class="info-text">
                If you didn't request this code, please ignore this email. 
                The code will expire automatically in 10 minutes.
              </p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Coding Ninjas - Chitkara University</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP sent successfully to your email" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Send OTP error:", err);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 },
    );
  }
}
