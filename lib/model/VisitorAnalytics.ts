import { Schema, models, model, Document } from "mongoose";

export interface IVisitorAnalytics extends Document {
  ip: string;
  country?: string;
  city?: string;
  region?: string;
  userAgent?: string;
  page?: string;
  visitedAt: Date;
}

const visitorAnalyticsSchema = new Schema<IVisitorAnalytics>(
  {
    ip: {
      type: String,
      required: true,
    },
    country: String,
    city: String,
    region: String,
    userAgent: String,
    page: String,
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Fix: Check if model exists before creating
const VisitorAnalytics = models.VisitorAnalytics || model<IVisitorAnalytics>("VisitorAnalytics", visitorAnalyticsSchema);

export default VisitorAnalytics;