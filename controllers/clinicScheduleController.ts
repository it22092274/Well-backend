import express from "express";
import { ClinicSchedule } from "../models/ClinicSchedule";

export const createClinicSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user, clinic, date, time, location } = req.body;

    const schedule = new ClinicSchedule({ user, clinic, date, time, location });
    await schedule.save();

    res.status(201).send(schedule);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getUserClinicSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const schedule = await ClinicSchedule.findById(id)
      .populate("user")
      .populate("clinic");

    if (!schedule) {
      return res.status(404).send({ message: "Schedule not found" });
    }

    return res.status(201).json(schedule);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const getUpcomingUserClinicSchedules = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const schedules = await ClinicSchedule.find({
      user: id,
      status: "UpComing",
    })
      .populate("user")
      .populate("clinic");

    if (!schedules) {
      return res.status(404).send({ message: "Schedule not found" });
    }

    return res.status(201).json(schedules);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const updateUserClinicSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { clinic, date, time, location } = req.body;

    const updates = { clinic, date, time, location };

    const updatedSchedule = await ClinicSchedule.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    return res.status(200).json(updatedSchedule);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const confirmSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const updatedSchedule = await ClinicSchedule.findByIdAndUpdate(
      id,
      { status: "Confirmed" },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).send({ message: "Schedule not found" });
    }

    return res.status(200).json(updatedSchedule);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};

export const deleteUserClinicSchedule = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedSchedule = await ClinicSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).send({ message: "Schedule not found" });
    }

    return res.status(201).send({ message: "Schedule deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred" });
    }
  }
};
