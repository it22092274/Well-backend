// /api/auth/login.ts
import { login } from '../../controllers/authController';
import express from 'express';
const router = express.Router();

router.post('/api/auth/login', login);

export default router;
