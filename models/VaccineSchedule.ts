import mongoose, { Schema } from "mongoose";

const VaccinationScheduleSchema = new mongoose.Schema(
  {
    vaccineName: {
      type: String,
      required: true,
    },
    scheduleDate: {
      type: Date,
      required: true,
    },
    scheduleTime: {
      type: String,
      required: true,
    },
    notificationTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Missed"],
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } 
);

export const VaccinationSchedule = mongoose.model(
  "VaccinationSchedule",
  VaccinationScheduleSchema
);
