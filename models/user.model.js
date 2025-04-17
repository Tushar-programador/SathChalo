import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },

  password: { type: String, required: true, minlength: 6 },

  phoneNumber: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },

  profileImage: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },

  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user'
  }

}, { timestamps: true });

// 🔒 Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

export default model('User', UserSchema);

