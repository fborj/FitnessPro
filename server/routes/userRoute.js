import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  create,
  login,
  getAllUsers,
  getUserById,
  update,
  deleteUser,
  setupUser,
  forgotPassword,
  resetPassword,
  verifyEmail
} from "../controller/userController.js";
import Goal from "../model/goalModel.js";

const route = express.Router();

// Public routes (no auth required)
route.post("/auth/signup", create);
route.post("/auth/login", login);
route.post("/auth/verify-email", verifyEmail);
route.post("/auth/forgot-password", forgotPassword);
route.post("/auth/reset-password", resetPassword);
route.put("/setup/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { birthday } = req.body; // Extract birthday from the request body

    // Call the setupUser controller with the birthday field
    const result = await setupUser(id, { birthday, ...req.body });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to set up user." });
  }
}); // Keep setup route public

// Protected routes (auth required)
route.get("/users", authenticate, getAllUsers);
route.get("/user/:id", authenticate, getUserById);
route.put("/update/user/:id", authenticate, update);
route.delete("/delete/user/:id", authenticate, deleteUser);

// Protected goal routes
route.get("/user/:id/completed-goals", authenticate, async (req, res) => {
  try {
    // Ensure req.user is populated by the authenticate middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const userId = req.user.id; // Extract userId from authenticated user
    const completedGoalsCount = await Goal.countDocuments({ 
      userId, 
      isDone: true 
    });

    res.status(200).json({ completedGoals: completedGoalsCount });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please refresh your token." });
    }
    res.status(500).json({ message: "Failed to fetch completed goals count." });
  }
});

export default route;