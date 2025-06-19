import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", dashboardSchema);

export default Goal;