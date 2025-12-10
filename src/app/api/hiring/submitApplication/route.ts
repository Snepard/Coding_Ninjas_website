import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { HiringForm } from "@/models/hiring/HiringForm";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import nodemailer from "nodemailer";
import path from "path";

/* =========================
   ✅ REQUIRED FOR FILE UPLOADS
========================= */
export const runtime = "nodejs";
export const maxDuration = 15;

/* =========================
   ✅ CLOUDINARY CONFIG
========================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/* =========================
   ✅ POST HANDLER
========================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    /* =========================
       ✅ FORM FIELDS
    ========================= */
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

    /* =========================
       ✅ BASIC VALIDATION
    ========================= */
    if (!name || !rollNumber || !chitkaraEmail || !position || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    /* =========================
       ✅ FILE SIZE LIMIT
    ========================= */
    const MAX_FILE_SIZE = process.env.CLOUDINARY_MAX_FILE_SIZE
      ? parseInt(process.env.CLOUDINARY_MAX_FILE_SIZE, 10)
      : 10_485_760; // 10MB

    let resumeUrl = "";

    /* =========================
       ✅ CLOUDINARY STREAM UPLOAD
    ========================= */
    if (resumeFile) {
      try {
        if (resumeFile.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            {
              success: false,
              error: "Resume must be under 10MB.",
            },
            { status: 413 },
          );
        }

        const buffer = Buffer.from(await resumeFile.arrayBuffer());

        const safeName = path
          .parse(resumeFile.name)
          .name.replace(/[^a-zA-Z0-9_-]/g, "_");

        const uploadResult = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "resumes",
                resource_type: "raw",
                public_id: `resume_${Date.now()}_${safeName}`,
                timeout: 120_000, // ✅ 2 min
              },
              (error, result) => {
                if (error) return reject(error);
                if (!result)
                  return reject(new Error("Cloudinary upload failed."));
                resolve(result);
              },
            );

            stream.end(buffer);
          },
        );

        resumeUrl = uploadResult.secure_url;
      } catch (err: unknown) {
        console.error("❌ Cloudinary Upload Error:", err);

        let message = "Resume upload failed.";
        if (err instanceof Error) message = err.message;

        return NextResponse.json(
          { success: false, error: message },
          { status: 400 },
        );
      }
    }

    /* =========================
       ✅ SAVE TO DATABASE
    ========================= */
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

    /* =========================
       ✅ EMAIL (NON-BLOCKING)
    ========================= */
    (async () => {
      try {
        const SMTP_USER = process.env.SMTP_USER;
        const SMTP_PASS = process.env.SMTP_PASS;
        const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL;

        if (!SMTP_USER || !SMTP_PASS) return;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        // Applicant mail
        await transporter.sendMail({
          from: `"CN_CUIET" <${SMTP_USER}>`,
          to: chitkaraEmail,
          subject: "Application Received",
          html: `
            <p>Hi ${name},</p>
            <p>Your application for <b>${position} (${role})</b> has been received.</p>
            <p>Regards,<br/>CN_CUIET</p>
          `,
        });

        // Admin mail (optional)
        if (ADMIN_EMAIL) {
          await transporter.sendMail({
            from: `"CN_CUIET" <${SMTP_USER}>`,
            to: ADMIN_EMAIL,
            subject: `New Application: ${name}`,
            html: `
              <p><b>${name}</b> applied for <b>${position}</b></p>
              <p>Email: ${chitkaraEmail}</p>
              <p>Resume: ${resumeUrl || "N/A"}</p>
            `,
          });
        }
      } catch (emailErr) {
        console.error("❌ Email Error:", emailErr);
      }
    })();

    /* =========================
       ✅ RESPONSE
    ========================= */
    return NextResponse.json(
      { success: true, applicationId: application._id },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.error("❌ submitApplication error:", err);

    let message = "Internal server error.";
    if (err instanceof Error) message = err.message;

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
