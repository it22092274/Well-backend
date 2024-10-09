// routes/memory.ts

import express from 'express';
import MemoryController from '../controllers/memoryController';


const router = express.Router();

router.get("/", MemoryController.getAllMemories); 
router.get("/:id", MemoryController.getMemory); // Get specific memory
router.post("/", MemoryController.createMemory); // Create a new memory
router.put("/:id", MemoryController.updateMemory); // Update a memory
router.delete("/:id", MemoryController.deleteMemory); // Delete a memory


export default router;  
