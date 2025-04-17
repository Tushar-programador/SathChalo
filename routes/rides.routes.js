import express from 'express';
import { postRide ,completeRide} from '../controllers/ride.Controller.js';
import { authMiddleware } from '../middleware/authMiddler.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();


router.post('/',
    authMiddleware,
    [
        body('vehicleType')
            .isIn(['car', 'bike'])
            .withMessage('Invalid vehicle type'),

        body('origin.address')
            .notEmpty()
            .withMessage('Origin address is required'),

        body('origin.coordinates')
            .isArray({ min: 2 })
            .withMessage('Origin coordinates required'),

        body('destination.address')
            .notEmpty()
            .withMessage('Destination address is required'),

        body('destination.coordinates')
            .isArray({ min: 2 })
            .withMessage('Destination coordinates required'),

        body('rideDate')
            .isISO8601()
            .withMessage('Ride date must be a valid ISO date'),

        body('rideTime')
            .notEmpty()
            .withMessage('Ride time is required'),

        body('seatsAvailable')
            .isInt({ min: 1 })
            .withMessage('Minimum one seat is required'),

        body('price')
            .isNumeric()
            .withMessage('Price must be a valid number'),

        body('viaCities')
            .optional()
            .isArray()
            .withMessage('viaCities must be an array'),

        body('viaCities.*')
            .optional()
            .isString()
            .isLength({ min: 2 })
            .withMessage('Each viaCity must be at least 2 characters'),
    ],
    validate,
    postRide
);


router.put('/:rideId/complete', authMiddleware, completeRide);

export default router;
