import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { signupSchema, loginSchema } from '@binks/types';
import { login, logout, signup } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup',validate(signupSchema),signup)
router.post('/login',validate(loginSchema),login)
router.post('/logout',logout)

export default router;
