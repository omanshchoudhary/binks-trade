import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../middlewares/validate.js';
import { signupSchema, loginSchema } from '@binks/types';
import { login, logout, signup } from '../controllers/auth.controller.js';

const router = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

router.post('/signup',authLimiter,validate(signupSchema),signup)
router.post('/login',authLimiter,validate(loginSchema),login)
router.post('/logout',logout)

export default router;
