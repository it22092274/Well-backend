import express from 'express';
import {createClinic, getAllClinic, getOneClinic} from '../controllers/clinicController';

const router = express.Router();

router.post("/create-clinic", createClinic);
router.get("/get-clinic/:id", getOneClinic);
router.get("/all-clinic", getAllClinic);

export default router; 