import mongoose, { Schema } from "mongoose";

const VaccinationScheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: String, //use as an object id
      required: false,
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
