// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for a User document
export interface IUser extends Document {
  uid: string;
  email: string;
  password?: string; // Password might be optional if you support social logins without password
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt?: Date;
}

// Define the user schema
const UserSchema: Schema = new Schema(
  {
    uid: { type: String, required: true, unique: true, index: true }, // Add index for faster lookup
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function (this: IUser) { return !this.uid; } }, // Password required only if no UID (e.g., not from Firebase auth)
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }, // Mongoose handles createdAt and updatedAt
);

// Middleware to update `updatedAt` on save (if not using `timestamps: true`)
UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the User model
export const User = mongoose.model<IUser>('User', UserSchema);

// Example function to get user by ID (assuming `uid` is the primary identifier you use for profiles)
export const getUserById = async (uid: string): Promise<IUser | null> => {
  return await User.findOne({ uid }).select('-password'); // Exclude password from profile retrieval
};

// Example function to get user by database _id
export const findUserBy_Id = async (_id: string): Promise<IUser | null> => {
    return await User.findById(_id).select('-password');
};