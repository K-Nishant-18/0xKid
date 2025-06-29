import mongoose from "mongoose";

const conceptSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  concept: { type: String, required: true },
  explanation: { type: Object, required: true },
}, { timestamps: true });

export const  Concept = mongoose.model('Concept', conceptSchema);
