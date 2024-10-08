import mongoose, { Schema } from "mongoose";

const VaccineSchema = new mongoose.Schema(
  {
    vaccineName: {
      type: String,
      required: true,
    },

    vaccineDescription: {
      type: String,
      required: true,
    },

    vaccineImage: {
      type: String,
      required: true,
    },

    vaccineMonth: {
      type: Number,
      required: true,
    },

    vaccineStatus: {
      type: String,
      enum: ["Required", "Optional"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Vaccine = mongoose.model("Vaccine", VaccineSchema);
