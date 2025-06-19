import express from "express";
import { recordWorkoutDay, getProgress, recordWorkoutCompletion, getWorkoutHistory, addBmiProgress, getBmiProgresses } from "../controller/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add this route
router.post("/workout/record-day", authenticate, recordWorkoutDay);
router.get("/progress", authenticate, getProgress);

// Add new routes for workout completion tracking
router.post("/workout/complete", authenticate, (req, res, next) => {
  console.log("Received workout completion request:", req.body);
  recordWorkoutCompletion(req, res, next);
});

router.get("/workout/history", authenticate, (req, res, next) => {
  console.log("Received workout history request");
  getWorkoutHistory(req, res, next);
});

router.post('/bmi-progress', authenticate, addBmiProgress);
router.get('/bmi-progress', authenticate, getBmiProgresses);

export default router;