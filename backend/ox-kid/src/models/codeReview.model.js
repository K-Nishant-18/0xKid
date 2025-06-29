import mongoose from "mongoose";

const codeReviewSchema = new mongoose.Schema({
 
   user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
  
  concept: { type: String, required: true },        // e.g., "Code Review: greetUser"
  review: {
    type: Object,
    required: true,
  
  },
  code: { type: String, required: true },
  language: { type: String, default: "JavaScript" },
  tags: { type: [String], default: [] },
  reviewer: { type: String, default: "AI-Gemini" }
}, { timestamps: true });

export const CodeReview = mongoose.model("CodeReview", codeReviewSchema);
