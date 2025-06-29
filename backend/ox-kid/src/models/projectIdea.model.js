import mongoose from "mongoose";


const projectIdeaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: { type: Number, required: true, min: 4, max: 100 },
    interests: { type: String, required: true, trim: true },
    ideas: [
      {
        title: { type: String, required: true, trim: true },
        purpose: { type: String, required: true, trim: true },
        tools: { type: String, required: true, trim: true },
        outcome: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

export const ProjectIdeas = mongoose.model("ProjectIdea", projectIdeaSchema);
