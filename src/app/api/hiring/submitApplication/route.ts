// src/app/api/submitApplication/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { HiringForm } from "@/models/hiring/HiringForm";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"; // Import UploadApiResponse
import nodemailer from "nodemailer";
import path from "path";

// NOTE: These are currently unused and cause warnings. Consider removing them if not needed.
// const GENDERS = ["Male", "Female", "Other"] as const;
// const HOSTELLER_TYPES = ["Hosteller", "Day Scholar"] as const;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Extract fields
    const name = (formData.get("name") as string)?.trim();
    const rollNumber = (formData.get("rollNumber") as string)?.trim();
    const contactNumber = (formData.get("contactNumber") as string)?.trim();
    const gender = (formData.get("gender") as string)?.trim();
    const chitkaraEmail = (formData.get("chitkaraEmail") as string)?.trim();
    const department = (formData.get("department") as string)?.trim();
    const group = (formData.get("group") as string)?.trim();
    const specialization = (formData.get("specialization") as string)?.trim();
    const hosteller = (formData.get("hosteller") as string)?.trim();
    const position = (formData.get("position") as string)?.trim();
    const role = (formData.get("role") as string)?.trim();
    const resumeFile = formData.get("resume") as File | null;

    // Configurable max file size for uploads (default 10MB = 10,485,760 bytes)
    const MAX_FILE_SIZE = process.env.CLOUDINARY_MAX_FILE_SIZE
      ? parseInt(process.env.CLOUDINARY_MAX_FILE_SIZE, 10)
      : 10_485_760;

    // --- Validation ---
    // ... [your existing validation logic remains unchanged] ...

    // Handle resume file upload → Cloudinary
    let resumeUrl = "";
    if (resumeFile) {
      // Basic size validation before attempting upload
      try {
        const fileSize =
          typeof resumeFile.size === "number" ? resumeFile.size : 0;
        if (fileSize > MAX_FILE_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: `Resume file is too large. Maximum allowed is ${MAX_FILE_SIZE} bytes.`,
            },
            { status: 413 },
          );
        }

        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const originalFilename = path.parse(resumeFile.name).name;
        const sanitizedFilename = originalFilename.replace(
          /[^a-zA-Z0-9_.-]/g,
          "_",
        );

        // Upload to Cloudinary with specific error handling
        const uploaded = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "resumes",
                  resource_type: "raw",
                  public_id: sanitizedFilename,
                  use_filename: true,
                  unique_filename: true,
                },
                (error, result) => {
                  if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return reject(error);
                  }
                  if (!result) {
                    return reject(
                      new Error(
                        "Cloudinary upload failed: no result returned.",
                      ),
                    );
                  }
                  resolve(result);
                },
              )
              .end(buffer);
          },
        );

        resumeUrl = uploaded.secure_url;
      } catch (err: unknown) {
        // Handle Cloudinary/file related errors explicitly to avoid 500 and unhandledRejection
        console.error("Cloudinary Upload Error:", err);

        // If it's an Error with a message, surface it in dev; otherwise return a generic message
        let message = "Failed to upload resume.";
        if (err instanceof Error && err.message) {
          message = err.message;
        }

        // Map Cloudinary file-size specific response to 413 where appropriate
        if (typeof err === "object" && err !== null) {
          const errObj = err as { http_code?: number; message?: string };
          if (
            errObj.http_code === 400 &&
            /file size/i.test(errObj.message || "")
          ) {
            return NextResponse.json(
              { success: false, error: message },
              { status: 413 },
            );
          }
        }

        return NextResponse.json(
          { success: false, error: message },
          { status: 400 },
        );
      }
    }

    // --- Create hiring form document ---
    const application = await HiringForm.create({
      name,
      rollNumber,
      contactNumber,
      gender,
      chitkaraEmail,
      department,
      group,
      specialization,
      hosteller,
      position,
      role,
      resumeUrl,
      status: "pending",
    });

    // --- Send confirmation email to applicant and optional admin notification ---
    (async () => {
      try {
        const SMTP_USER = process.env.SMTP_USER;
        const SMTP_PASS = process.env.SMTP_PASS;
        const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || "CN_CUIET";
        const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL; // optional

        if (!SMTP_USER || !SMTP_PASS) {
          console.warn("SMTP_USER or SMTP_PASS not set — skipping email send.");
          return;
        }

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        // Applicant confirmation
        const applicantMail = {
          from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
          to: application.chitkaraEmail,
          subject: `Application Received: ${application.position} (${application.role})`,
          html: `<p>Hi ${application.name},</p>
                 <p>Thanks for applying for the <strong>${application.position} (${application.role})</strong> role. We have received your application and will review it shortly.</p>
                 <p>Best regards,<br/>${SMTP_FROM_NAME}</p>`,
        };

        await transporter.sendMail(applicantMail);

        // Optional admin notification
        if (ADMIN_NOTIFICATION_EMAIL) {
          const adminMail = {
            from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
            to: ADMIN_NOTIFICATION_EMAIL,
            subject: `New Application: ${application.name} — ${application.position}`,
            html: `<p>A new hiring application was submitted.</p>
                   <ul>
                     <li><strong>Name:</strong> ${application.name}</li>
                     <li><strong>Email:</strong> ${application.chitkaraEmail}</li>
                     <li><strong>Roll Number:</strong> ${application.rollNumber}</li>
                     <li><strong>Position / Role:</strong> ${application.position} / ${application.role}</li>
                     <li><strong>Resume:</strong> ${application.resumeUrl || "N/A"}</li>
                   </ul>`,
          };

          await transporter.sendMail(adminMail);
        }
      } catch (emailErr) {
        console.error("Failed to send application email:", emailErr);
      }
    })();

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (err: unknown) {
    // ✅ FIX 2: Replaced 'any' with the safer 'unknown' type.
    console.error("❌ Top-level catch block error:", err);

    // Type check to safely access the error message
    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
