import express from "express";
import VaccineController from "../controllers/VaccineController";

const router = express.Router();

router.get("/", VaccineController.getAllVaccines);
router.get("/:id", VaccineController.getVaccineById);

export default router;
