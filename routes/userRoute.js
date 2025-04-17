import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from '../controllers/authController.js';

// @route   POST /api/auth/register
// @desc    Register user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

export default router;
