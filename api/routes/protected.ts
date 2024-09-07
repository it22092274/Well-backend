import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).send('This is a protected route');
});

export default router;
