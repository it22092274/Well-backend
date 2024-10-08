import express, { Request, Response } from "express";
import { VaccinationSchedule } from "../models/VaccinationSchedule";

class VaccinationScheduleController {
  getAllSchedules = async (req: Request, res: Response) => {
    try {
      const schedules = await VaccinationSchedule.find();
      return res.status(200).json({ data: schedules });
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve vaccination schedules", error });
    }
  };

  getSchedule = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schedule = await VaccinationSchedule.findById(id);
      if (schedule) {
        return res.status(200).json({ data: schedule });
      } else {
        return res.status(404).json({ message: "Vaccination schedule not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve vaccination schedule", error });
    }
  };

  createSchedule = async (req: Request, res: Response) => {
    try {
      const { userId, vaccineName, scheduleTime, scheduleDate, notificationReminderTime, notificationReminderDays, status, notes } = req.body;

      // Validate required fields
      if (!userId || !vaccineName || !scheduleTime || !scheduleDate || !notificationReminderTime || !notificationReminderDays || !status) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Validate date
      const validDate = new Date(scheduleDate);
      if (isNaN(validDate.getTime())) {
        return res.status(400).json({ message: "Invalid schedule date provided" });
      }

      const newSchedule = new VaccinationSchedule({
        userId,
        vaccineName,
        scheduleTime,
        scheduleDate: validDate,
        notificationReminderTime,
        notificationReminderDays,
        status,
        notes,
      });

      await newSchedule.save();
      return res.status(201).json({ message: "Vaccination schedule created", data: newSchedule });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create vaccination schedule", error });
    }
  };

  updateSchedule = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId, vaccineName, scheduleTime, scheduleDate, notificationReminderTime, notificationReminderDays, status, notes } = req.body;

      const schedule = await VaccinationSchedule.findById(id);
      if (schedule) {
        schedule.userId = userId !== undefined ? userId : schedule.userId;
        schedule.vaccineName = vaccineName !== undefined ? vaccineName : schedule.vaccineName;
        schedule.scheduleTime = scheduleTime !== undefined ? scheduleTime : schedule.scheduleTime;
        schedule.scheduleDate = scheduleDate !== undefined ? new Date(scheduleDate) : schedule.scheduleDate;
        schedule.notificationReminderTime = notificationReminderTime !== undefined ? notificationReminderTime : schedule.notificationReminderTime;
        schedule.notificationReminderDays = notificationReminderDays !== undefined ? notificationReminderDays : schedule.notificationReminderDays;
        schedule.status = status !== undefined ? status : schedule.status;
        schedule.notes = notes !== undefined ? notes : schedule.notes;

        await schedule.save();
        return res.status(200).json({ message: "Vaccination schedule updated", data: schedule });
      } else {
        return res.status(404).json({ message: "Vaccination schedule not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to update vaccination schedule", error });
    }
  };

  deleteSchedule = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schedule = await VaccinationSchedule.findByIdAndDelete(id);

      if (schedule) {
        return res.status(200).json({ message: "Vaccination schedule deleted" });
      } else {
        return res.status(404).json({ message: "Vaccination schedule not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete vaccination schedule", error });
    }
  };
}

export default new VaccinationScheduleController();
