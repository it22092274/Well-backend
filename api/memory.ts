import express from 'express';
import MemoryController from '../controllers/memoryController';
import multer from 'multer';
import path from 'path';


// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set unique file name
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", MemoryController.getAllMoments);
router.get("/:id", MemoryController.getMoment);
router.post("/", upload.single('image'), MemoryController.createMoment); // Use multer for image upload
router.put("/:id", MemoryController.updateMoment);
router.delete("/:id", MemoryController.deleteMoment);

export default router;
