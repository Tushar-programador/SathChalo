import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
    vehicleType: { type: String, enum: ['car', 'bike'], required: true },
  
    origin: {
      address: { type: String, required: true },
      coordinates: { type: [Number], required: true } // [lng, lat]
    },
  
    destination: {
      address: { type: String, required: true },
      coordinates: { type: [Number], required: true }
    },
  
    viaCities: [{ type: String, trim: true }], // 🆕 new field
  
    rideDate: { type: Date, required: true },
    rideTime: { type: String, required: true },
    seatsAvailable: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    status: {
        type: String,
        enum: ['upcoming', 'in-progress', 'completed', 'cancelled'],
        default: 'upcoming'
      },
    
  
  }, { timestamps: true });
  
  rideSchema.index({ 'origin.coordinates': '2dsphere' });
  rideSchema.index({ 'destination.coordinates': '2dsphere' });
  rideSchema.index({ viaCities: 'text' });
 

export default mongoose.model('Ride', rideSchema);
