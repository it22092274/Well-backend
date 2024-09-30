import mongoose, { Schema } from "mongoose";

const MemorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    feelings: {
      type: String,
      enum: ["Joyful & Fun", "Happy & Excited", "Calm"],
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Memory = mongoose.model("Memory", MemorySchema);
