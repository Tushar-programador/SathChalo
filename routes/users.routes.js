import { registerUser, loginUser,getUserProfile , updateUserProfile } from '../controllers/auth.Controller.js';
import { authMiddleware } from '../middleware/authMiddler.js';
import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  ],
  validate,
  registerUser
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  loginUser
);
router.get('/profile', authMiddleware, getUserProfile);

router.put('/profile',
    authMiddleware,
    [
      body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
      body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
      body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
      body('profileImage').optional().isURL().withMessage('Profile image must be a valid URL')
    ],
    validate,
    updateUserProfile
  );

export default router;
