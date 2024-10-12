// /api/auth/login.ts
import { login, signup } from '../../controllers/authController';
import express from 'express';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;
