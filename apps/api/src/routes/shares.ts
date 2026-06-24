import { Router } from 'express';
import { getAllShares } from '../controllers/shares.controller.js';

const router = Router();

router.get('/', getAllShares);
export default router;