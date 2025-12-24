import { Schema, model, models, Document } from "mongoose";

export interface IUpcomingEvent extends Document {
  name: string;
  description: string;
  date: string; // ISO date string
  location: string;
  poster: string;
}

const UpcomingEventSchema = new Schema<IUpcomingEvent>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    poster: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

if (models.UpcomingEvent) {
  delete models.UpcomingEvent;
}

export const UpcomingEvent = model<IUpcomingEvent>(
  "UpcomingEvent",
  UpcomingEventSchema,
);
