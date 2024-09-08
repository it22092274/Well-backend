import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser'; // Importing IUser interface

// Extend the IUser interface with Mongoose's Document
interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>; // Instance method to compare passwords
}

// Interface for the User Model (with static methods)
interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
  deleteByEmail(email: string): Promise<{ deletedCount?: number }>;
  resetPasswordByEmail(email: string, newPassword: string): Promise<IUserDocument | null>;
}

// Define the Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  imagepath: {
    type: String,
    default: null,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  number_of_pregnancy_days: {
    type: Number,
    required: true,
  },
  delivarydate: {
    type: String,
    required: true,
  },
  pregnancydate: {
    type: String,
    required: true,
  },
  currentmonth: {
    type: String,
    required: true,
  },
  preferred_clinic: {
    type: String,
    required: true,
  },
  allergies: {
    type: [String],
    default: [],
  },
  assistant: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash password before saving to the database
userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare the password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Static method to find a user by email
userSchema.statics.findByEmail = async function (email: string): Promise<IUserDocument | null> {
  return this.findOne({ email } as any); // Cast email to the correct type if necessary
};

// Static method to delete a user by email
userSchema.statics.deleteByEmail = async function (email: string): Promise<{ deletedCount?: number }> {
  return this.deleteOne({ email } as any);
};

// Static method to reset a user's password
userSchema.statics.resetPasswordByEmail = async function (email: string, newPassword: string): Promise<IUserDocument | null> {
  const user = await this.findOne({ email } as any); // Cast email if necessary
  if (!user) return null;

  // Hash the new password before saving
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  return user;
};

// Export the User model
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User;
