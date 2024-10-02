import express, { Request, Response } from 'express';
import { Memory } from '../models/Memory';

class MemoryController {
    getAllMoments = async (req: Request, res: Response) => {
        try {
            const moments = await Memory.find();
            return res.status(200).json({ data: moments });
        } catch (error) {
            return res.status(500).json({ message: "Failed to retrieve memories", error });
        }
    };

    getMoment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const moment = await Memory.findById(id);
            if (moment) {
                return res.status(200).json({ data: moment });
            } else {
                return res.status(404).json({ message: "Memory not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to retrieve memory", error });
        }
    };

    createMoment = async (req: Request, res: Response) => {
        try {
            console.log(`Incoming request: ${JSON.stringify(req.body)}`);
            const { name, description, feelings, time, date } = req.body;
            const image = req.body.image; // Get the uploaded image path
            
            // Validate required fields
            if (!name || !description || !feelings || !time || !image) {
                return res.status(400).json({ message: "All fields are required, including image" });
            }

            // Validate date
            const validDate = date ? new Date(date) : new Date();
            if (isNaN(validDate.getTime())) {
                return res.status(400).json({ message: "Invalid date provided" });
            }

            const moment = new Memory({
                name,
                description,
                image,
                feelings,
                time,
                date: validDate
            });
            await moment.save();
            return res.status(200).json({ message: "Memory created", data: moment });
        } catch (error) {
            console.error('Error creating memory: ', error);
            return res.status(500).json({ message: "Failed to create memory", error });
        }
    };

    updateMoment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description, feelings, time, date } = req.body;
            const image = req.file?.path; // Get the uploaded image path (if provided)

            // Validate required fields
            if (!name || !description || !feelings || !time || (!image && !req.body.image)) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const moment = await Memory.findById(id);
            if (moment) {
                moment.name = name;
                moment.description = description;
                moment.feelings = feelings;
                moment.time = time;
                moment.date = date ? new Date(date) : moment.date;

                // Only update the image if a new one is provided
                if (image) {
                    moment.image = image;
                }

                await moment.save();
                return res.status(200).json({ message: "Memory updated", data: moment });
            } else {
                return res.status(404).json({ message: "Memory not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to update memory", error });
        }
    };

    deleteMoment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const moment = await Memory.findByIdAndDelete(id);

            if (moment) {
                return res.status(200).json({ message: "Memory deleted" });
            } else {
                return res.status(404).json({ message: "Memory not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete memory" });
        }
    };
}

export default new MemoryController();
