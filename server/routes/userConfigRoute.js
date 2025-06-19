import express from "express";
import User from "../model/userModel.js";
import Goal from "../model/goalModel.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // Get ID from authenticated user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      username: user.name, // Use the name field as username if username is not set
      firstName: user.firstName,
      lastName: user.lastName,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      height: user.height, // Add height in cm if available
      weight: user.weight,
      birthday: user.birthday,
      gender: user.gender // Add gender
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET completed goals count
router.get("/user/:id/completed-goals", authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    
    const completedGoals = await Goal.countDocuments({ 
      userId: userId, 
      completed: true 
    });
    
    res.json({ completedGoals });
  } catch (error) {
    console.error("Error fetching completed goals:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update user profile
router.put("/update/user/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, firstName, lastName, heightFeet, heightInches, height, weight, birthday, gender } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: username, // Update name as username
        firstName,
        lastName,
        heightFeet,
        heightInches,
        height,
        weight,
        birthday,
        gender // Add gender
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      message: "Profile updated successfully",
      user: {
        username: updatedUser.name,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        heightFeet: updatedUser.heightFeet,
        heightInches: updatedUser.heightInches,
        height: updatedUser.height,
        weight: updatedUser.weight,
        birthday: updatedUser.birthday,
        gender: updatedUser.gender // Add gender
      }
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;