import mongoose, { Schema, models } from "mongoose";

export interface IOtp extends Document {
  email: string;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    code: {
      type: String,
      required: true,
      length: 6,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create index for automatic deletion of expired OTPs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Force model recompilation in development
if (models.Otp) {
  delete models.Otp;
}

export const Otp = models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);
