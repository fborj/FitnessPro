import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  daysCompleted: {
    type: Number,
    default: 0,
    required: true,
  },
  lastCompletedDate: {
    type: String, // Store as YYYY-MM-DD
  }
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
