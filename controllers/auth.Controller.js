import User from '../models/user.model.js';
import pkg from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { successResponse } from '../utils/response.js';
import { AppError } from '../utils/appError.js';
import {asyncHandler} from '../middleware/asyncHandler.js'
const {sign} = pkg

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, gender } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new AppError('User already exists', 400);

  const user = new User({ name, email, password, phoneNumber, gender });
  await user.save();

  const payload = { user: { id: user.id } };
  const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  return successResponse(res, 'User registered successfully', { token }, 201);
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError('Invalid credentials', 400);

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new AppError('Invalid credentials', 400);

  const payload = { user: { id: user.id } };
  const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  return successResponse(res, 'Login successful', { token });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) throw new AppError('User not found', 404);

  return successResponse(res, 'User profile fetched successfully', user);
});

// @desc    Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new AppError('User not found', 404);

  const { name, phoneNumber, gender, profileImage } = req.body;

  if (name) user.name = name;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (gender) user.gender = gender;
  if (profileImage) user.profileImage = profileImage;

  await user.save();

  return successResponse(res, 'Profile updated successfully', user);
});
