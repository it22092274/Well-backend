import mongoose, { Schema } from "mongoose";

const ClinicSchema = new mongoose.Schema(
  {
    clinicTitle: {
      type: String,
      required: true,
    },

    clinicDescription: {
      type: String,
      required: true,
    },

    clinicImage: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    preparationInfo: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Clinic = mongoose.model("Clinic", ClinicSchema);
