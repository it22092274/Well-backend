// routes/memory.ts

import express from 'express';
import MemoryController from '../controllers/memoryController';


const router = express.Router();

router.get("/", MemoryController.getAllMoments); 
router.get("/:id", MemoryController.getMoment); // Get specific memory
router.post("/", MemoryController.createMoment); // Create a new memory
router.put("/:id", MemoryController.updateMoment); // Update a memory
router.delete("/:id", MemoryController.deleteMoment); // Delete a memory


export default router;  
