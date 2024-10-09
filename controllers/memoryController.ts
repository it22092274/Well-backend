import express, { Request, Response } from "express";
import { Memory } from "../models/Memory";
import path from "path";
import fs from "fs";
import { error } from "console";

class MemoryController {
  // Fetch all memories for the logged-in user
  getAllMoments = async (req: Request, res: Response) => {
    try {
      const { userId } = req.query as { userId: string }; // Assuming userId is passed as a query parameter

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const moments = await Memory.find({ user: userId }); // Filter by the user ID from query
      return res.status(200).json({ data: moments });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve memories", error });
    }
  };

  // Fetch a single memory for the logged-in user
  getMoment = async (req: Request, res: Response) => {
    try {
      
      const { id } = req.params;

      const moment = await Memory.findById(id); // Ensure it's the user's memory
      
      if (moment) {
        return res.status(200).json({ data: moment });
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
  createMoment = async (req: Request, res: Response) => { 
    try {
      console.log(`Incoming request: ${JSON.stringify(req.body)}`);
      const { user, name, description, image, feelings, time, date, isFavorite } = req.body;

      // Validate required fields
      if (!user || !name || !description || !feelings || !time ) {
        console.log(`user:${user} name:${name} description:${description} feelings:${feelings} time:${time}`);
        console.log(`user:${!user} name:${!name} description:${!description} feelings:${!feelings} time:${!time}`);
        return res
          .status(400)
          .json({ message: "All fields are required except for image" });
          
      }

      let filePath; // Declare filePath here
  
      // Process image if provided
      if (image) {
        // Extract the Base64 string (data:image/jpeg;base64,...)
        const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  
        if (!matches || matches.length !== 3) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid image format" });
        }
  
        const fileType = matches[1]; // Image type (jpeg, png, etc.)
        const base64Data = matches[2]; // Base64 data
        const buffer = Buffer.from(base64Data, "base64"); // Convert Base64 to binary
  
        // Define a unique filename (e.g., timestamp and file type)
        const fileName = `${Date.now()}.${fileType}`;
        filePath = path.join(__dirname, "..", "uploads", fileName);
  
        // Write the file to the 'uploads' directory
        await fs.promises.writeFile(filePath, buffer); // Use fs.promises to handle promises
  
      }
  
      // Validate date
      const validDate = date ? new Date(date) : new Date();
      if (isNaN(validDate.getTime())) {
        return res.status(400).json({ message: "Invalid date provided" });
      }
  

      const moment = new Memory({
        user: user,
        name,
        description,
        image: filePath ? `/uploads/${path.basename(filePath)}` : undefined,
        feelings,
        time,
        date: validDate,
        isFavorite,
      });

      await moment.save();
      return res.status(200).json({ message: "Memory created", data: moment });
    } catch (error) {
      console.error("Error creating memory: ", error);
      return res.status(500).json({ message: "Failed to create memory", error });
    }
  };

  // Update a memory
  updateMoment = async (req: Request, res: Response) => {
    try {

      const { id } = req.params;
      const { user, name, description, image, feelings, time, date, isFavorite } = req.body;
      
    

      if (!user || !name || !description || !feelings || !time || !date) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const moment = await Memory.findById(id); 
      if (moment) {
        moment.name = name;
        moment.description = description;
        moment.image = image;
        moment.feelings = feelings;
        moment.time = time;
        moment.date = date ? new Date(date) : moment.date;
        moment.isFavorite = isFavorite;

        await moment.save();
        return res.status(200).json({ message: "Memory updated", data: moment });
      } else {
        return res.status(404).json({ message: "Memory not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to update memory", error });
    }
  };

  // Delete a memory
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
