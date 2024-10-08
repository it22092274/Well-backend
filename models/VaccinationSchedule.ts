import mongoose, { Schema } from "mongoose";

const VaccinationScheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    vaccineName: {  
        type: String,
        required: true, 
      },
    scheduleTime: {
      type: String,
      required: true,
    },
    scheduleDate: {
      type: Date,
      required: true,
    },
    notificationReminderTime: {
      type: String,
      required: true,
    },
    notificationReminderDays: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "missed"],
      required: true,
    },
    notes: {
      type: String,
      optional: true,
    },
  },
  { timestamps: true }
);

export const VaccinationSchedule = mongoose.model("VaccinationSchedule", VaccinationScheduleSchema);
