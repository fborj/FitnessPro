import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { savePreferences, getPreferences } from "../controller/userController.js";

const router = express.Router();

// Save user preferences (POST)
router.post("/", authenticate, savePreferences);

// Get user preferences (GET)
router.get("/", authenticate, getPreferences);

export default router;

