import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profileImage: { type: String },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

export default model('User', UserSchema);
