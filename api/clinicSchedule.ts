import express from "express";
import {
  confirmSchedule,
  createClinicSchedule,
  deleteUserClinicSchedule,
  getUpcomingUserClinicSchedules,
  getUserClinicSchedule,
  updateUserClinicSchedule,
} from "../controllers/clinicScheduleController";

const router = express.Router();

router.post("/create-clinic-schedule", createClinicSchedule);
router.get("/get-one-clinic-schedule/:id", getUserClinicSchedule);
router.get("/upcoming-clinic-schedule/:id", getUpcomingUserClinicSchedules);
router.put("/update-clinic-schedule/:id", updateUserClinicSchedule);
router.put("/confirm-clinic-schedule/:id", confirmSchedule);
router.delete("/delete-clinic-schedule/:id", deleteUserClinicSchedule);

export default router;
