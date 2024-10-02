// routes/memory.ts

import express from 'express';
import MemoryController from '../controllers/memoryController';
import upload from '../middleware/multer'; // Import multer middleware

const router = express.Router();

router.get("/", MemoryController.getAllMoments);
router.get("/:id", MemoryController.getMoment);
router.post("/", upload.single('image'), MemoryController.createMoment); // Use multer for image upload
router.put("/:id", upload.single('image'), MemoryController.updateMoment);
router.delete("/:id", MemoryController.deleteMoment);

export default router;  
