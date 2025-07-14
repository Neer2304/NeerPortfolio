import { Schema, models, model } from "mongoose";

const suggestionSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true }
);

export const Suggestion =
  models.Suggestion || model("Suggestion", suggestionSchema);
