import express from "express";
import VaccinationScheduleController from "../controllers/vaccinationScheduleController"; 

const router = express.Router();


router.get("/", VaccinationScheduleController.getAllSchedules); // Get all 
router.get("/:id", VaccinationScheduleController.getSchedule); // Get specific 
router.post("/", VaccinationScheduleController.createSchedule); // Create 
router.put("/:id", VaccinationScheduleController.updateSchedule); // Update 
router.delete("/:id", VaccinationScheduleController.deleteSchedule); // Delete
export default router;
