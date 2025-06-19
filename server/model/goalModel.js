import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  exerciseTitle: {
    type: String,
    required: true,
  },
  level: {
    type: String, // Store the level (Beginner, Intermediate, Advanced)
    required: true,
  },
  reps: {
    type: String, // Store the reps for the exercise (e.g., "12 reps", "10 reps")
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the User model
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false, // Default to false for new goals
  },
  completedAt: {
    type: Date, // Store the date and time when the goal is completed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;