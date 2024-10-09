import express from "express";
import { Clinic } from "../models/Clinic";

export const createClinic = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { clinicTitle, clinicDescription, phone, email, preparationInfo } =
      req.body;

    const clinicImage = `${clinicTitle.replace(/\s+/g, "")}.jpg`;

    const newClinic = new Clinic({
      clinicTitle,
      clinicDescription,
      clinicImage,
      phone,
      email,
      preparationInfo,
    });

    const schedule = await newClinic.save();

    res
      .status(201)
      .json({ message: "Clinic created successfully", data: schedule });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getOneClinic = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const clinic = await Clinic.findById(id);

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    return res.status(201).send(clinic);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getAllClinic = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const clinics = await Clinic.find();

    if (!clinics) {
      return res.status(404).json({ message: "Clinics not found" });
    }
    
    return res.status(201).send(clinics);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};
