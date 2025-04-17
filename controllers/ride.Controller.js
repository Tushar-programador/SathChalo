import Ride from '../models/ride.model.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { successResponse } from '../utils/response.js';
import { AppError } from '../utils/appError.js';

export const postRide = asyncHandler(async (req, res) => {
  const { vehicleType, origin, destination, rideDate, rideTime, seatsAvailable, price } = req.body;

  if (!origin?.coordinates || !destination?.coordinates) {
    throw new AppError('Origin and Destination coordinates are required', 400);
  }

  const ride = await Ride.create({
    driver: req.user.id,
    vehicleType,
    origin,
    destination,
    rideDate,
    rideTime,
    seatsAvailable,
    price
  });

  return successResponse(res, 'Ride posted successfully', ride, 201);
});

export const completeRide = asyncHandler(async (req, res) => {
    const { rideId } = req.params;
  
    const ride = await Ride.findById(rideId);
    if (!ride) throw new AppError('Ride not found', 404);
  
    // Make sure the requester is the driver
    if (ride.driver.toString() !== req.user.id) {
      throw new AppError('Unauthorized: only the driver can complete the ride', 403);
    }
  
    // Mark as complete
    ride.status = 'completed';
    ride.isActive = false;
    await ride.save();
  
    return successResponse(res, 'Ride marked as completed', ride);
  });
  