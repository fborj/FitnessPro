import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";
import { updateUserProgress, updateExerciseProgress } from "../controller/userController.js";
import WorkoutCompletion from "../model/WorkoutCompletionModel.js";

const router = express.Router();

// GET /api/user/userprogresses/me - Get workout progress for current user
router.get("/me", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    // Get all workout completions for this user
    const completions = await WorkoutCompletion.find({ user: userId }).sort({ completedDate: -1 });
    const daysCompleted = completions.length;
    // Return both the count and the array of dates
    res.json({
      daysCompleted,
      completionDates: completions.map(c => c.completedDate)
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

// POST /api/user/userprogresses - Increment workout progress for current user
router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { dayNumber, date } = req.body;

    // Create new workout completion record
    const workoutCompletion = new WorkoutCompletion({
      user: userId,
      dayNumber,
      completedDate: date ? new Date(date) : new Date()
    });
    await workoutCompletion.save();

    // Calculate total days completed from WorkoutCompletion collection
    const totalDaysCompleted = await WorkoutCompletion.countDocuments({ user: userId });

    // Update user's daysCompleted field with the calculated total
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.daysCompleted = totalDaysCompleted;
    await user.save();

    res.json({ 
      daysCompleted: totalDaysCompleted,
      completion: workoutCompletion
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

// New route to update persistent workout progress
router.post("/update", authenticate, updateUserProgress);

// New route: Save exercise progress (for example, current day & completed exercise statuses)
router.post("/exercise-progress", authenticate, updateExerciseProgress);

export default router;

