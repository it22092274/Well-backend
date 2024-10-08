import mongoose, { Schema } from "mongoose";

const ClinicScheduleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: { // temporary
      type: String, // Store time as a string in "HH:mm" format
      required: true,
      validate: {
        validator: function (v :any) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validates the time format
        },
        message: (props: any) => `${props.value} is not a valid time format!`,
      },
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["UpComing", "Expired"],
      default: "UpComing",
    },
  },
  { timestamps: true }
);

export const ClinicSchedule = mongoose.model(
  "ClinicSchedule",
  ClinicScheduleSchema
);
