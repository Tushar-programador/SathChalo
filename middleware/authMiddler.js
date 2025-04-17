import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check for Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('No token, authorization denied', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    next(new AppError('Token is not valid or expired', 401));
  }
};
