import express, { Request, Response } from 'express';
import { Memory } from '../models/Memory'; 

class MemoryController {
    getAllMoments = async (request: express.Request, response: express.Response) =>{
        try{
            const moments = await Memory.find();
            return response.status(200).json({data: moments})
        }catch (error) {
            return response.status(500).json({ message: "Failed to retrieve products", error });
        }
    }

    getMoment = async (request: express.Request, response: express.Response) => {
        try{
            const { id } = request.params;
            const moment = await Memory.findById(id);
            if (moment) {
               return response.status(200).json({data: moment });
            } else {
                return response.status(404).json({ message: "Memory not find" });
            }
        } catch (error) {
            return response.status(500).json({ message: "Failed to retreive memory", error});
        }
    }

    createMoment = async (request: express.Request, response: express.Response) => {
        try {
            const { name, description, feelings, time, date } = request.body;
            const image = request.file ? `/uploads/${request.file.filename}` : null; // Save file path
            
            if (!image) {
                return response.status(400).json({ message: "Image is required" });
            }
            
            const moment = new Memory({
                name,
                description,
                image,
                feelings,
                time,
                date
            });
            await moment.save();
            return response.status(201).json({ message: "Memory created", data: moment });
        } catch (error) {
            return response.status(500).json({ message: "Failed to create memory", error });
        }
    }

    updateMoment = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const {name, description, image, feelings, time, date } = request.body;

            if ( !name || !description || !image || !feelings || !time || !date) {
                return response.status(400).json({ message: "All fields are required" });
            }

            const moment = await Memory.findById(id);
            if(moment) {
                moment.name = name;
                moment.description = description;
                moment.image = image;
                moment.feelings = feelings;
                moment.time = time;
                moment.date = date;

                await moment.save();
                return response.status(200).json({ message: "Memory updated", data: moment });
            }else {
                return response.status(404).json({ message: "Memory not found" });
            }
        }catch (error) {
            return response.status(500).json({ message: "Failed to update memory", error });
        }
    }

    deleteMoment = async (request: express.Request, response: express.Response) => {
        try{
            const { id } = request.params;
            const moment = await Memory.findByIdAndDelete(id);

            if(moment){
                return response.status(200).json({ message: "Memory deleted" });
            }else {
                return response.status(404).json({ message: "Memory not found" });
            }
        }catch (error) {
            return response.status(500).json({ message: "Failed to delete memory" });
        }
    }
}

export default new MemoryController();