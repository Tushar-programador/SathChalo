import { AppError } from '../utils/appError.js';

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${req.method} ${req.url} -`, err.stack);

  res.status(statusCode).json({
    success: false,
    message
  });
}
