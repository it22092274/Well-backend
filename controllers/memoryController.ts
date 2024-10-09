import express, { Request, Response } from "express";
import { Memory } from "../models/Memory";
import path from "path";
import fs from "fs";
import { error } from "console";

class MemoryController {
  // Fetch all memories by query params
  getAllMemories = async (req: Request, res: Response) => {
    try {
      console.log(`[getAllMemories] req.query: ${JSON.stringify(req.query)}`);
      const { userId, isFavorite } = req.query as { userId: string, isFavorite?: string }; // Assuming userId is passed as a query parameter

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Construct the query object dynamically
      const query: any = { user: userId };

      // If isFavorite is provided in the query, add it to the query object
      if (isFavorite !== undefined && isFavorite.toLowerCase() == 'true') {
        query.isFavorite = true
      }

      const memories = await Memory.find(query);

      return res.status(200).json({ data: memories });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve memories", error });
    }
  };

  // Fetch a single memory by id
  getMemory = async (req: Request, res: Response) => {
    try {
      console.log(`[getMemory] req.params: ${JSON.stringify(req.params)}`);
      const { id } = req.params;

      const memory = await Memory.findById(id); // Ensure it's the user's memory

      if (memory) {
        return res.status(200).json({ data: memory });
      } else {
        return res.status(404).json({ message: "Memory not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve memory", error });
    }
  };

  // Create a new memory
  createMemory = async (req: Request, res: Response) => {
    try {
      console.log(`[createMemory] Incoming request: ${JSON.stringify(req.body)}`);
      const {
        user,
        name,
        description,
        image,
        feelings,
        time,
        date,
        isFavorite,
      } = req.body;

      // Validate required fields
      if (!user || !name || !description || !feelings || !time) {
        console.error(`Error: All fields are required except for image`)
        return res
          .status(400)
          .json({ message: "All fields are required except for image" });
      }

      // Extract the Base64 string (data:image/jpeg;base64,...)
      const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);

      if (!matches || matches.length !== 3) {
        console.error(`Error: Invalid image format`)
        return res
          .status(400)
          .json({ success: false, message: "Invalid image format" });
      }

      // Validate date
      const validDate = date ? new Date(date) : new Date();
      if (isNaN(validDate.getTime())) {
        console.error(`Error: Invalid date provided`)
        return res.status(400).json({ message: "Invalid date provided" });
      }

      const memory = new Memory({
        user: user,
        name,
        description,
        image: image,
        feelings,
        time,
        date: validDate,
        isFavorite,
      });

      await memory.save();
      return res.status(200).json({ message: "Memory created", data: memory });
    } catch (error) {
      console.error("Error creating memory: ", error);
      return res
        .status(500)
        .json({ message: "Failed to create memory", error });
    }
  };

  // Update a memory
  updateMemory = async (req: Request, res: Response) => {
    try {
      console.log(`[updateMemory] Incoming request: ${JSON.stringify(req.body)} | req.params: ${JSON.stringify(req.params)}`);
      const { id } = req.params;
      const {
        user,
        name,
        description,
        image,
        feelings,
        time,
        date,
        isFavorite,
      } = req.body;

      if (!user || !name || !description || !feelings || !time || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const memory = await Memory.findById(id);
      if (memory) {
        memory.name = name;
        memory.description = description;
        memory.image = image;
        memory.feelings = feelings;
        memory.time = time;
        memory.date = date ? new Date(date) : memory.date;
        memory.isFavorite = isFavorite;

        await memory.save();
        return res
          .status(200)
          .json({ message: "Memory updated", data: memory });
      } else {
        return res.status(404).json({ message: "Memory not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update memory", error });
    }
  };

  // Delete a memory
  deleteMemory = async (req: Request, res: Response) => {
    try {
      console.log(`[deleteMemory] req.params: ${JSON.stringify(req.params)}`);
      const { id } = req.params;
      const memory = await Memory.findByIdAndDelete(id);

      if (memory) {
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
