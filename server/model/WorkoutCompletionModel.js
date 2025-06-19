import mongoose from "mongoose";

const workoutCompletionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  completedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dayNumber: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

// Check if model exists before creating it
const WorkoutCompletion = mongoose.models.WorkoutCompletion || mongoose.model("WorkoutCompletion", workoutCompletionSchema);

console.log("WorkoutCompletion model created successfully");

export default WorkoutCompletion; 