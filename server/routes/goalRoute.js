import express from "express";
import Goal from "../model/goalModel.js"; // Updated to use goalModel
import { authenticate } from "../middleware/authMiddleware.js"; // Middleware to authenticate user

const router = express.Router();

router.post("/goals", authenticate, async (req, res) => {
  try {
    const { goal, exerciseTitle, level, reps } = req.body;
    const userId = req.user.id; // Extract user ID from authenticated user

    // Validate input
    if (!goal || !exerciseTitle || !level || !reps) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newGoal = new Goal({ goal, exerciseTitle, level, reps, userId });
    await newGoal.save();
    res.status(201).json(newGoal); // Return the saved goal
  } catch (error) {
    console.error("Error adding goal:", error.message);
    res.status(500).json({ message: "Failed to add goal." });
  }
});

router.get("/goals", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const goals = await Goal.find({ userId }); // Fetch only goals of the logged-in user
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/goals/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure the goal belongs to the logged-in user
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal not found or unauthorized." });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/goals/:id/done", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure the goal belongs to the logged-in user
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId },
      { isDone: true },
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal not found or unauthorized." });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/goals/:id/complete", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure the goal belongs to the logged-in user
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId },
      { isDone: true, completedAt: new Date() }, 
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal not found or unauthorized." });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/goals/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure the goal belongs to the logged-in user
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found or unauthorized." });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;