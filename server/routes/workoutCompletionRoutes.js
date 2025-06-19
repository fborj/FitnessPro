import express from 'express';
import { createWorkoutCompletion, getWorkoutCompletions, getDaysCompleted } from '../controller/workoutCompletionController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import WorkoutCompletion from "../model/WorkoutCompletionModel.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// /me route FIRST
router.get('/me', async (req, res) => {
  console.log("HIT /api/workout-completions/me");
  try {
    const userId = req.user.id; // assuming your auth middleware sets req.user
    const completions = await WorkoutCompletion.find({ user: userId }).sort({ completedDate: 1 });
    res.json({ completions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new workout completion
router.post('/:userId', createWorkoutCompletion);

// Get all workout completions for a user
router.get('/:userId', getWorkoutCompletions);

// Get total days completed for a user
router.get('/:userId/days-completed', getDaysCompleted);

export default router; 