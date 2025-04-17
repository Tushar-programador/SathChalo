import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from '../controllers/auth.Controller.js';

// @route   POST /api/auth/register
// @desc    Register user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

// @ route GET /api/user/profile
router.get('/profile', authMiddleware, getUserProfile);

// @ route PUT /api/user/profile
router.put('/profile', authMiddleware, updateUserProfile);

export default router;
