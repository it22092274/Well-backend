// /api/auth/signup.ts
import { signup } from '../../controllers/authController';
import express from 'express';
const router = express.Router();

router.post('/api/auth/signup', signup);

export default router;
