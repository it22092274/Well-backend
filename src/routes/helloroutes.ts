import { Router } from 'express';
import { getHello, postHello } from '../controllers/helloController';

const router = Router();

router.get('/', getHello);
router.post('/', postHello);

export default router;
