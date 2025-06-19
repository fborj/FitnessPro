import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
  },
  height: {
    type: Number, // Store height in centimeters
    trim: true,
  },
  weight: {
    type: String, // Store weight in kilograms
    trim: true,
  },
  birthday: {
    type: Date,
    required: false, // Optional field
  },
  gender: {
    type: String,
    required: false,
    trim: true,
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal", // Reference to the Goal model
    },
  ],
  isSetupComplete: {
    type: Boolean,
    default: false, // Default to false for new users
  },
  daysCompleted: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  }
});

export default mongoose.model("Users", userSchema);