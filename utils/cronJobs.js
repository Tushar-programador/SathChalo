import cron from 'node-cron';
import Ride from '../models/ride.model.js';

// Run every hour (adjust as needed)
export const autoExpireRides = () => {
  cron.schedule('0 * * * *', async () => {
    const now = new Date();

    const expiredRides = await Ride.find({
      rideDate: { $lt: now },
      status: { $ne: 'completed' },
      isActive: true
    });

    for (const ride of expiredRides) {
      ride.status = 'completed';
      ride.isActive = false;
      await ride.save();
      console.log(`Auto-completed ride: ${ride._id}`);
    }
  });
};
