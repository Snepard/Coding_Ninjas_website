import { Schema, model, models, Document } from "mongoose";

// 1️⃣ TypeScript interface
export interface IHiringForm extends Document {
  name: string;
  rollNumber: string;
  contactNumber: string;
  gender: "Male" | "Female" | "Other";
  chitkaraEmail: string;
  department: string;
  group: string;
  specialization: string;
  hosteller: "Hosteller" | "Day Scholar";
  title: string;
  role: string;
  team: string;
  resumeUrl?: string;
  status: "pending" | "approved"; // ✅ Add status here
  createdAt: Date;
  updatedAt: Date;
}

// 2️⃣ Mongoose schema
const HiringFormSchema = new Schema<IHiringForm>(
  {
    name: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    chitkaraEmail: {
      type: String,
      required: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@chitkara\.edu\.in$/,
    },
    department: { type: String, required: true, trim: true },
    group: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    hosteller: {
      type: String,
      enum: ["Hosteller", "Day Scholar"],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    team: { type: String, required: true, trim: true },
    resumeUrl: { type: String, default: "" },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true },
);

// 3️⃣ Export Mongoose model
// Delete the cached model to ensure schema updates are applied
if (models.HiringForm) {
  delete models.HiringForm;
}
export const HiringForm = model<IHiringForm>("HiringForm", HiringFormSchema);
