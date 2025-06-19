import express from "express";
import { addBmiProgress, getBmiProgresses } from "../controller/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("BMIprogressRoute loaded");

router.post('/bmi-progress', authenticate, addBmiProgress);
router.get('/bmi-progress', authenticate, async (req, res, next) => {
  try {
    console.log('--- /api/user/bmi-progress route HIT ---');
    await getBmiProgresses(req, res, next);
    console.log('--- /api/user/bmi-progress route COMPLETED ---');
  } catch (error) {
    console.error("Error in bmi-progress route:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;