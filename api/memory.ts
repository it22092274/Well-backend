// routes/memory.ts

import express from 'express';
import MemoryController from '../controllers/memoryController';


const router = express.Router();

router.get("/", MemoryController.getAllMoments);
router.get("/:id", MemoryController.getMoment);
router.post("/", MemoryController.createMoment);
router.put("/:id",MemoryController.updateMoment);
router.delete("/:id", MemoryController.deleteMoment);

export default router;  
