import express, { Request, Response } from "express";
import { Vaccine } from "../models/Vaccine";

class VaccineController {
  // Get all vaccines
  getAllVaccines = async (req: Request, res: Response) => {
    try {
      const vaccines = await Vaccine.find();
      return res.status(200).json({ data: vaccines });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching vaccines", error });
    }
  };

  // Get single vaccine by ID
  getVaccineById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const vaccine = await Vaccine.findById(id);
      if (!vaccine) {
        return res.status(404).json({ message: "Vaccine not found" });
      }
      return res.status(200).json({ data: vaccine });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching vaccine", error });
    }
  };
}

export default new VaccineController();
