import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../model/userModel.js";
import UserPreference from "../model/UserPreferenceModel.js";
import UserProgress from "../model/UserProgressModel.js";
import WorkoutCompletion from "../model/WorkoutCompletionModel.js";
import crypto from "crypto";
import { sendPasswordResetEmail, sendVerificationEmail } from "../utils/emailService.js";
import BMIprogress from '../model/bmiProgressModel.js';

const { ObjectId } = mongoose.Types;

export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format. Please provide a valid email address.",
      });
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/; 
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, and one number.",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = Date.now() + 24 * 3600000; // 24 hours from now

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isSetupComplete: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      isEmailVerified: false
    });

    const savedData = await newUser.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
      res.status(201).json({ 
        message: "User created successfully. Please check your email to verify your account.", 
        user: {
          _id: savedData._id,
          name: savedData.name,
          email: savedData.email
        }
      });
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      // Still return success but with a warning
      res.status(201).json({ 
        message: "User created successfully, but there was an error sending the verification email. Please try logging in to request a new verification email.", 
        user: {
          _id: savedData._id,
          name: savedData.name,
          email: savedData.email
        }
      });
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Error verifying email" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found." });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("goals"); // Populate goals from goalModelComplete"); // Select only required fields
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user); // Return user details
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    const { firstName, lastName, height, weight, ...otherFields } = req.body;

    // Validate firstName and lastName
    const nameRegex = /^[a-zA-Z\s]+$/;
    if ((firstName && !nameRegex.test(firstName)) || (lastName && !nameRegex.test(lastName))) {
      return res.status(400).json({ message: "First name and last name can only contain letters and spaces." });
    }

    // Validate height
    if (height && (height < 1 || height > 300)) {
      return res.status(400).json({ message: "Height must be between 1 and 300 centimeters." });
    }

    // Validate weight
    if (weight && weight < 1) {
      return res.status(400).json({ message: "Weight must be at least 1 kilogram." });
    }

    const updatedFields = {
      ...otherFields,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(height && { height }),
      ...(weight && { weight }),
    };

    const updatedData = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({ message: "User updated successfully.", user: updatedData });
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(401).json({ 
        message: "Please verify your email before logging in. Check your inbox for the verification link." 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        workoutDays: user.workoutDays,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

export const setupUser = async (userId, userData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Update user fields
    Object.assign(user, userData);
    await user.save();

    // Create initial preferences
    const defaultPreferences = new UserPreference({
      user: userId,
      level: 'beginner', // default level
      place: 'home',     // default place
      days: '3',         // default days per week
    });
    await defaultPreferences.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
    return { 
      message: "User setup completed successfully", 
      user, 
      token,
      preferences: defaultPreferences 
    };
  } catch (error) {
    throw new Error(error.message || "Failed to set up user");
  }
};

// Add Preference Controller functions
export const savePreferences = async (req, res) => {
    try {
        // Extract userId from the authentication token
        const userId = req.user.id; // Assuming `req.user` is populated by the authentication middleware

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const { level, place, days } = req.body;

        let exerciseId;
        // Determine exerciseId based on user preferences
        if (level === "Beginner" && place === "Home") {
            if (days === "1x a week") exerciseId = new ObjectId('68389e8b693c0f52c03f9729');
            else if (days === "2x a week") exerciseId = new ObjectId('68389e8b693c0f52c03f972a');
            else if (days === "3x a week") exerciseId = new ObjectId('68389e8b693c0f52c03f972b');
            else if (days === "4x a week") exerciseId = new ObjectId('68389e8b693c0f52c03f972c');
            else if (days === "5x a week") exerciseId = new ObjectId('68389e8b693c0f52c03f972d');
        } else if (level === "Beginner" && place === "Gym") {
            if (days === "1x a week") exerciseId = new ObjectId('68389ec0693c0f52c03f972f');
            else if (days === "2x a week") exerciseId = new ObjectId('68389ec0693c0f52c03f9730');
            else if (days === "3x a week") exerciseId = new ObjectId('68389ec0693c0f52c03f9731');
            else if (days === "4x a week") exerciseId = new ObjectId('68389ec0693c0f52c03f9732');
            else if (days === "5x a week") exerciseId = new ObjectId('68389ec0693c0f52c03f9733');
        } else if (level === "Advanced" && place === "Gym") {
            if (days === "1x a week") exerciseId = new ObjectId('68389f1a693c0f52c03f9735');
            else if (days === "2x a week") exerciseId = new ObjectId('68389f1a693c0f52c03f9736');
            else if (days === "3x a week") exerciseId = new ObjectId('68389f1a693c0f52c03f9737');
            else if (days === "4x a week") exerciseId = new ObjectId('68389f1a693c0f52c03f9738');
            else if (days === "5x a week") exerciseId = new ObjectId('68389f1a693c0f52c03f9739');
        } else if (level === "Advanced" && place === "Home") {
            if (days === "1x a week") exerciseId = new ObjectId('68389fbe693c0f52c03f973b');
            else if (days === "2x a week") exerciseId = new ObjectId('68389fbe693c0f52c03f973c');
            else if (days === "3x a week") exerciseId = new ObjectId('68389fbe693c0f52c03f973d');
            else if (days === "4x a week") exerciseId = new ObjectId('68389fbe693c0f52c03f973e');
            else if (days === "5x a week") exerciseId = new ObjectId('68389fbe693c0f52c03f973f');
        }

        let preference = await UserPreference.findOne({ user: userId });
        if (preference) {
            // Update existing preference
            preference.level = level;
            preference.place = place;
            preference.days = days;
            preference.exerciseId = exerciseId;
            await preference.save();
        } else {
            // Create new preference
            preference = new UserPreference({
                user: userId,
                level,
                place,
                days,
                exerciseId
            });
            await preference.save();
        }

        res.status(200).json({ 
            message: `Preferences saved successfully: Level: ${level}, Place: ${place}, Days: ${days}, ExerciseID: ${exerciseId}` 
        });
        return; // Prevent further code execution after sending response
    } catch (error) {
        res.status(400).json({ message: "Error saving preferences: " + error.message });
        return; // Prevent further code execution after sending error
    }
};

export const getPreferences = async (req, res) => {
    try {
        const userId = req.user.id;
        const preferences = await UserPreference.findOne({ user: userId });
        
        if (!preferences) {
            return res.status(404).json({ message: "Preferences not found" });
        }

        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ message: "Error fetching preferences: " + error.message });
    }
};

// BEGINNER HOME WORKOUT PROGRAMS
const workoutPrograms = {
  beginner: {
    home: {
      '1': [
        {
          name: "Full Body",
          day: 1,
          exercises: [
            { name: "High Knees", sets: "5 minutes" },
            { name: "Backpack Squats", sets: "3 x 7" },
            { name: "Doorway Rows", sets: "2 x 10" },
            { name: "Push-Ups", sets: "3 x 7" },
            { name: "Backpack Deadlifts", sets: "3 x 7" },
            { name: "Plank", sets: "2 x 30 sec" }
          ]
        }
      ],
      '2': [
        {
          day: 1,
          exercises: [
            { name: "Backpack Squats", sets: "3 x 7" },
            { name: "Step-Ups", sets: "3 x 10 per leg" },
            { name: "Backpack Romanian Deadlifts", sets: "3 x 5" },
            { name: "Bodyweight Calf Raises", sets: "3 x 15" }
          ]
        },
        {
          day: 2,
          exercises: [
            { name: "Doorway Rows", sets: "2 x 10" },
            { name: "Backpack Overhead Press", sets: "3 x 10" },
            { name: "Prone Y Raise", sets: "3 x 10" },
            { name: "Plank", sets: "2 x 30 sec" }
          ]
        }
      ],
      '3': [
        {
          day: 1,
          exercises: [
            { name: "Squats", sets: "3 x 10" },
            { name: "Push ups", sets: "3 x 10" },
            { name: "Backpack Rows", sets: "3 x 10" }
          ]
        },
        {
          day: 2,
          exercises: [
            { name: "Lunges", sets: "3 x 10" },
            { name: "Water Bottle/Backpack Press", sets: "3 x 10" },
            { name: "Towel Row", sets: "3 x 10" },
            { name: "Plank", sets: "2 x 30 sec" }
          ]
        },
        {
          day: 3,
          exercises: [
            { name: "Backpack Deadlifts", sets: "3 x 10" },
            { name: "Floor Chest Fly with Bottles", sets: "3 x 10" },
            { name: "Doorway Rows", sets: "3 x 10" },
            { name: "No-Weight Russian Twists", sets: "3 x per side" }
          ]
        }
      ],
      '4': [
        {
          day: 1,
          exercises: [
            { name: "Floor Press with Backpack", sets: "3 x 10" },
            { name: "Backpack Rows", sets: "3 x 10" },
            { name: "Backpack Shoulder Press", sets: "3 x 10" }
          ]
        },
        {
          day: 2,
          exercises: [
            { name: "Backpack Squats", sets: "3 x 12" },
            { name: "Backpack Deadlifts", sets: "3 x 10" },
            { name: "Glute Bridge Walkouts", sets: "3 x 12" }
          ]
        },
        {
          day: 3,
          exercises: [
            { name: "Incline Push-Ups", sets: "3 x 10" },
            { name: "Doorway Rows", sets: "3 x 10" },
            { name: "Water Bottle Lateral Raises", sets: "3 x 15" }
          ]
        },
        {
          day: 4,
          exercises: [
            { name: "Wall Sit", sets: "3 x 30 sec" },
            { name: "Step-Ups", sets: "3 x 10" },
            { name: "Elevated Calf Raises", sets: "3 x 15" }
          ]
        }
      ],
      '5': [
        {
          day: 1,
          exercises: [
            { name: "Knee Push-Ups", sets: "3 x 10" },
            { name: "Backpack/Water Bottle Shoulder Press" },
            { name: "Floor Press with Backpack or Bottles", sets: "3 x 10" },
            { name: "Bottle Kickbacks or Chair Dips", sets: "3 x 12" }
          ]
        },
        {
          day: 2,
          exercises: [
            { name: "Doorway Rows", sets: "3 x 10" },
            { name: "Backpack or Jug Row", sets: "3 x 10" },
            { name: "Seated Rear Delt Raises (bent over)", sets: "3 x 12" }
          ]
        },
        {
          day: 3,
          exercises: [
            { name: "Squat", sets: "3 x 10" },
            { name: "Step-Ups", sets: "3 x 30sec" },
            { name: "Glute Bridge Walkouts", sets: "3 x 12" },
            { name: "Bodyweight Calf Raises", sets: "3 x 15" }
          ]
        },
        {
          day: 4,
          exercises: [
            { name: "Incline Push-Ups", sets: "3 x 10" },
            { name: "Backpack Rows", sets: "3 x 10" },
            { name: "Water Bottle lateral Raise", sets: "3 x 10" },
            { name: "Plank", sets: "3 x 45 sec" }
          ]
        },
        {
          day: 5,
          exercises: [
            { name: "Bodyweight Good Mornings", sets: "3 x 10" },
            { name: "Incline Shoulder Taps", sets: "3 x 10" },
            { name: "Backpack Bear Crawls", sets: "3 x 20 sec" }
          ]
        }
      ]
    },
    gym: {
      '1': [
        {
          name: "Full Body",
          day: 1,
          exercises: [
            { name: "Treadmill or Bike", sets: "5 min" },
            { name: "Goblet Squats", sets: "3 x 7" },
            { name: "Lat Pulldown", sets: "2 x 10" },
            { name: "Dumbbell Bench Press", sets: "3 x 7" },
            { name: "Dumbbell Deadlifts", sets: "3 x 7" },
            { name: "Plank", sets: "2 x 30 sec" }
          ]
        }
      ],
      '2': [
        {
          name: "Lower Body",
          day: 1,
          exercises: [
            { name: "Goblet Squats", sets: "3 x 7" },
            { name: "Leg Press", sets: "3 x 10" },
            { name: "Romanian Deadlift", sets: "3 x 5" },
            { name: "Calf Raises", sets: "3 x 15" }
          ]
        },
        {
          name: "Upper Body",
          day: 2,
          exercises: [
            { name: "Lat Pulldown", sets: "2 x 10" },
            { name: "Dumbbell Shoulder Press", sets: "3 x 10" },
            { name: "Cable Rows", sets: "3 x 10" },
            { name: "Plank", sets: "2 x 30 sec" }
          ]
        }
      ],
      '3': [
        {
          name: "Full Body",
          day: 1,
          exercises: [
            { name: "Squats", sets: "3 x 10" },
            { name: "Push-Ups", sets: "3 x 10" },
            { name: "Bent Over Row", sets: "3 x 10" }
          ]
        },
        {
          day: 2,
          exercises: [
            { name: "Lunges", sets: "3 x 10 each leg" },
            { name: "Overhead Dumbbell Press", sets: "2 x 10" },
            { name: "Seated Cable Row", sets: "2 x 10" },
            { name: "Plank", sets: "2 x 30 sec" }
          ]
        },
        {
          day: 3,
          exercises: [
            { name: "Kettle Deadlifts", sets: "2 x 12" },
            { name: "Chest Fly", sets: "2 x 12" },
            { name: "Lat Pulldown", sets: "3 x 10" },
            { name: "Russian Twists", sets: "3 x 20" }
          ]
        }
      ],
      '4': [
        {
          name: "Upper A",
          day: 1,
          exercises: [
            { name: "Dumbbell Bench Press", sets: "2 x 12" },
            { name: "Cable Row", sets: "2 x 12" },
            { name: "Dumbbell Shoulder Press", sets: "3 x 10" }
          ]
        },
        {
          name: "Lower A",
          day: 2,
          exercises: [
            { name: "Goblet Squats", sets: "3 x 12" },
            { name: "Kettle Deadlifts", sets: "2 x 10" },
            { name: "Leg Curl Machine", sets: "3 x 12" }
          ]
        },
        {
          name: "Upper B",
          day: 3,
          exercises: [
            { name: "Incline Dumbbell Press", sets: "3 x 10" },
            { name: "Lat Pulldown", sets: "3 x 10" },
            { name: "Dumbbell Lateral Raises", sets: "3 x 15" }
          ]
        },
        {
          name: "Lower B",
          day: 4,
          exercises: [
            { name: "Leg Press", sets: "3 x 10" },
            { name: "Step-Ups", sets: "3 x 10 each leg" },
            { name: "Calf Raises", sets: "3 x 15" }
          ]
        }
      ],
      '5': [
        {
          name: "Push (Chest/Shoulders/Triceps)",
          day: 1,
          exercises: [
            { name: "Knee Push-Ups", sets: "3 x 10" },
            { name: "Seated Dumbbell Shoulder Press", sets: "3 x 10" },
            { name: "Dumbbell Chest Press", sets: "3 x 10" },
            { name: "Tricep Kickbacks", sets: "3 x 12" }
          ]
        },
        {
          name: "Pull (Back/Biceps)",
          day: 2,
          exercises: [
            { name: "Lat Pulldown", sets: "3 x 10" },
            { name: "Dumbbell Row", sets: "3 x 10" },
            { name: "Barbell Curl", sets: "3 x 12" }
          ]
        },
        {
          name: "Legs",
          day: 3,
          exercises: [
            { name: "Squat", sets: "3 x 10" },
            { name: "Leg Press", sets: "3 x 10" },
            { name: "Hamstring Curl", sets: "3 x 12" },
            { name: "Calf Raises", sets: "3 x 15" }
          ]
        },
        {
          name: "Upper Body Focus",
          day: 4,
          exercises: [
            { name: "Incline Dumbbell Press", sets: "3 x 10" },
            { name: "T-Bar Row", sets: "3 x 10" },
            { name: "Arnold Press", sets: "3 x 10" },
            { name: "Plank", sets: "3 x 45 sec" }
          ]
        },
        {
          name: "Full Body + Cardio",
          day: 5,
          exercises: [
            { name: "Kettle Deadlift", sets: "3 x 8" },
            { name: "Push Press", sets: "3 x 10" },
            { name: "Sled Push", sets: "3 x 20 sec" }
          ]
        }
      ]
    }
  },
  advanced: {
    home: {
      '1': [
        {
          name: "Full Body",
          day: 1,
          exercises: [
            { name: "Pistol Squats", sets: "3 x 8" },
            { name: "Handstand Push-ups or Pike Push-ups", sets: "3 x 10" },
            { name: "Inverted Rows (under table)", sets: "3 x 10" },
            { name: "Push-ups", sets: "3 x failure" },
            { name: "Glute Bridges (single leg if possible)", sets: "3 x 12" },
            { name: "Jump Squats", sets: "3 x 10" }
          ]
        }
      ],
      '2': [
        {
          name: "Upper Body",
          day: 1,
          exercises: [
            { name: "Handstand Push-ups or Pike Push-ups", sets: "4 x failure" },
            { name: "Archer Push-ups", sets: "3 x 8" },
            { name: "Door Frame Rows", sets: "4 x 10" },
            { name: "Triceps Dips on Chair", sets: "3 x 15" },
            { name: "Wall Walks", sets: "3 x 3" },
            { name: "Towel Bicep Curl Isometrics", sets: "3 x 15" }
          ]
        },
        {
          name: "Lower Body + Core",
          day: 2,
          exercises: [
            { name: "Pistol Squats", sets: "3 x 8" },
            { name: "Bulgarian Split Squats (use chair)", sets: "3 x 10" },
            { name: "Wall Sit", sets: "3 x 1min" },
            { name: "Jump Lunges", sets: "3 x 12" },
            { name: "Single-leg Calf Raises", sets: "3 x 20" },
            { name: "Leg Raises", sets: "2 x 10" }
          ]
        }
      ],
      '3': [
        {
          name: "Push",
          day: 1,
          exercises: [
            { name: "Pike Push-ups", sets: "4 x 12" },
            { name: "Diamond Push-ups", sets: "3 x 15" },
            { name: "Archer Push-ups", sets: "3 x 8" },
            { name: "Dips on Chair", sets: "3 x 12" },
            { name: "Elevated Feet Push-ups", sets: "3 x 15" }
          ]
        },
        {
          name: "Pull",
          day: 2,
          exercises: [
            { name: "Towel Rows (door or pole)", sets: "4 x 10" },
            { name: "Table Rows", sets: "3 x 12" },
            { name: "Backpack Deadlifts (filled with books)", sets: "4 x 10" },
            { name: "Towel Bicep Curl Isometrics", sets: "3 x 15" },
            { name: "Superman Hold", sets: "3 x 30 sec" }
          ]
        },
        {
          name: "Legs + Core",
          day: 3,
          exercises: [
            { name: "Pistol Squats", sets: "4 x 8" },
            { name: "Glute Bridges (Single-leg if possible)", sets: "4 x 10" },
            { name: "Wall Sit", sets: "3 x 1min" },
            { name: "Calf Raises (Slow tempo)", sets: "4 x 20" },
            { name: "Bicycle Crunches", sets: "2 x 15" }
          ]
        }
      ],
      '4': [
        {
          name: "Upper Body",
          day: 1,
          exercises: [
            { name: "Pike Push-ups", sets: "4 x 12" },
            { name: "Diamond Push-ups", sets: "3 x 15" },
            { name: "Archer Push-ups", sets: "3 x 8" },
            { name: "Dips on Chair", sets: "3 x 12" },
            { name: "Elevated Feet Push-ups", sets: "3 x 15" }
          ]
        },
        {
          name: "Lower Body",
          day: 2,
          exercises: [
            { name: "Pistol Squats", sets: "4 x 8" },
            { name: "Glute Bridges (Single-leg if possible)", sets: "4 x 10" },
            { name: "Wall Sit", sets: "3 x 1min" },
            { name: "Calf Raises (Slow tempo)", sets: "4 x 20" },
            { name: "Bicycle Crunches", sets: "2 x 15" }
          ]
        },
        {
          name: "HIIT Conditioning",
          day: 3,
          exercises: [
            { name: "Burpees", sets: "3 x 1min" },
            { name: "Jump Squats", sets: "3 x 1min" },
            { name: "High Knees", sets: "3 x 1min" },
            { name: "Mountain Climbers", sets: "3 x 30 sec" }
          ]
        },
        {
          name: "Core",
          day: 4,
          exercises: [
            { name: "Hollow Body Hold", sets: "3 x 30sec" },
            { name: "Russian Twists", sets: "3 x 40" },
            { name: "Plank Walk-outs", sets: "3 x 10" },
            { name: "Lying Leg Raises", sets: "3 x 20" },
            { name: "Deep Squat Hold", sets: "2 mins" },
            { name: "Shoulder and Hip Mobility Flows", sets: "10 mins" }
          ]
        }
      ],
      '5': [
        {
          name: "Push",
          day: 1,
          exercises: [
            { name: "Handstand Push-ups or Pike Push-ups", sets: "4 x failure" },
            { name: "Archer Push-ups", sets: "3 x 10" },
            { name: "Elevated Feet Push-ups", sets: "3 x 15" },
            { name: "Diamond Push-ups", sets: "3 x 12" },
            { name: "Triceps Dips (on chair or low surface)", sets: "3 x 15" }
          ]
        },
        {
          name: "Pull",
          day: 2,
          exercises: [
            { name: "Inverted Rows (under sturdy table)", sets: "4 x 10" },
            { name: "Towel Rows (over door or sturdy object)", sets: "3 x 12" },
            { name: "Backpack Deadlifts (heavy backpack)", sets: "4 x 12" },
            { name: "Superman Extensions", sets: "3 x 20" },
            { name: "Towel Bicep Curls (isometric resistance)", sets: "3 x 15" }
          ]
        },
        {
          name: "Legs",
          day: 3,
          exercises: [
            { name: "Pistol Squats", sets: "4 x 8" },
            { name: "Bulgarian Split Squats", sets: "3 x 12" },
            { name: "Jump Squats", sets: "3 x 15" },
            { name: "Glute Bridges", sets: "3 x 20" },
            { name: "Wall Sit", sets: "3 x 1min" },
            { name: "Calf Raises (slow tempo)", sets: "4 x 20" }
          ]
        },
        {
          name: "Core",
          day: 4,
          exercises: [
            { name: "Hollow Body Hold", sets: "3 x 30sec" },
            { name: "V-Ups", sets: "3 x 20" },
            { name: "Russian Twists", sets: "3 x 40" },
            { name: "Plank Walk-Outs", sets: "3 x 10" },
            { name: "Side Plank (both sides)", sets: "3 x 30sec" },
            { name: "Lying Leg Raises", sets: "3 x 15" }
          ]
        },
        {
          name: "Full Body HIIT",
          day: 5,
          exercises: [
            { name: "Burpees", sets: "3 x 30sec" },
            { name: "High Knees", sets: "3 x 30sec" },
            { name: "Jump Lunges", sets: "3 x 30 sec" },
            { name: "Mountain Climbers", sets: "3 x 1min" },
            { name: "Deep squat hold", sets: "2 x 2min" }
          ]
        }
      ]
    }
    // ...rest of the code...
  },
  // ADVANCED GYM WORKOUTS
  // 1x per week
  '1': [
    {
      name: "Full Body",
      day: 1,
      exercises: [
        { name: "Barbell Back Squat", sets: "4 x 6" },
        { name: "Barbell Bench Press", sets: "4 x 6" },
        { name: "Bent-over Barbell Row", sets: "4 x 8" },
        { name: "Romanian Deadlift", sets: "3 x 10" },
        { name: "Pull-ups", sets: "3 x failure" },
        { name: "Plank", sets: "3 x 1min" }
      ]
    }
  ],
  // 2x per week
  '2': [
    {
      name: "Upper Body",
      day: 1,
      exercises: [
        { name: "Bench Press", sets: "4 x 6" },
        { name: "Pull-ups", sets: "4 x failure" },
        { name: "Overhead Press", sets: "3 x 8" },
        { name: "Bent-over Barbell Row", sets: "3 x 8" },
        { name: "Dips", sets: "3 x 10" },
        { name: "Barbell Curls", sets: "3 x 12" }
      ]
    },
    {
      name: "Lower Body",
      day: 2,
      exercises: [
        { name: "Deadlifts", sets: "4 x 5" },
        { name: "Front Squats", sets: "3 x 8" },
        { name: "Walking Lunges", sets: "3 x 20 steps" },
        { name: "Calf Raises", sets: "4 x 15" }
      ]
    }
  ],
  // 3x per week
  '3': [
    {
      name: "Push",
      day: 1,
      exercises: [
        { name: "Incline Bench Press", sets: "4 x 8" },
        { name: "Dumbbell Shoulder Press", sets: "4 x 10" },
        { name: "Cable Flys", sets: "3 x 12" },
        { name: "Lateral Raises", sets: "3 x 15" },
        { name: "Overhead Tricep Extension", sets: "3 x 12" }
      ]
    },
    {
      name: "Pull",
      day: 2,
      exercises: [
        { name: "Pull-ups", sets: "4 x 6" },
        { name: "Barbell Rows", sets: "4 x 8" },
        { name: "Face Pulls", sets: "3 x 15" },
        { name: "Hammer Curls", sets: "3 x 12" },
        { name: "Reverse Flys", sets: "3 x 15" }
      ]
    },
    {
      name: "Legs",
      day: 3,
      exercises: [
        { name: "Back Squats", sets: "4 x 6" },
        { name: "Romanian Deadlifts", sets: "4 x 10" },
        { name: "Walking Lunges", sets: "3 x 15 each leg" },
        { name: "Hanging Leg Raises", sets: "3 x 15" },
        { name: "Plank + Side Plank", sets: "3 x 1min" }
      ]
    }
  ],
  // 4x per week
  '4': [
    {
      name: "Push",
      day: 1,
      exercises: [
        { name: "Barbell Bench Press", sets: "4 x 6" },
        { name: "Dumbbell Shoulder Press", sets: "4 x 8" },
        { name: "Cable Lateral Raises", sets: "3 x 15" },
        { name: "Skull Crushers", sets: "3 x 12" }
      ]
    },
    {
      name: "Pull",
      day: 2,
      exercises: [
        { name: "Weighted Pull-ups", sets: "4 x 6" },
        { name: "Bent-over Rows", sets: "4 x 8" },
        { name: "Seated Cable Row", sets: "3 x 10" },
        { name: "Bicep Curls", sets: "3 x 12" }
      ]
    },
    {
      name: "Legs",
      day: 3,
      exercises: [
        { name: "Deadlifts", sets: "4 x 5" },
        { name: "Bulgarian Split Squats", sets: "3 x 10" },
        { name: "Calf Raises", sets: "4 x 15" }
      ]
    },
    {
      name: "Core",
      day: 4,
      exercises: [
        { name: "Russian Twists", sets: "3 x 30" },
        { name: "Ab Wheel Rollouts", sets: "3 x 12" },
        { name: "Hanging Leg Raises", sets: "3 x 15" },
        { name: "Jog", sets: "10 mins" }
      ]
    }
  ],
  // 5x per week
  '5': [
    {
      name: "Push (Chest/Shoulders/Triceps)",
      day: 1,
      exercises: [
        { name: "Bench Press", sets: "3 x 10" },
        { name: "Dumbbell Shoulder Press", sets: "3 x 10" },
        { name: "Tricep Rope Pushdown", sets: "3 x 12" }
      ]
    },
    {
      name: "Pull (Back/Biceps)",
      day: 2,
      exercises: [
        { name: "Lat Pulldown", sets: "3 x 10" },
        { name: "Dumbbell Row", sets: "3 x 10" },
        { name: "Barbell Curl", sets: "3 x 12" }
      ]
    },
    {
      name: "Legs",
      day: 3,
      exercises: [
        { name: "Squat", sets: "3 x 10" },
        { name: "Leg Press", sets: "3 x 10" },
        { name: "Hamstring Curl", sets: "3 x 12" },
        { name: "Calf Raises", sets: "3 x 15" }
      ]
    },
    {
      name: "Upper Body Focus",
      day: 4,
      exercises: [
        { name: "Incline Dumbbell Press", sets: "3 x 10" },
        { name: "T-Bar Row", sets: "3 x 10" },
        { name: "Arnold Press", sets: "3 x 10" },
        { name: "Plank", sets: "3 x 45 sec" }
      ]
    },
    {
      name: "Full Body + Cardio",
      day: 5,
      exercises: [
        { name: "Kettle Deadlift", sets: "3 x 8" },
        { name: "Push Press", sets: "3 x 10" },
        { name: "Sled Push", sets: "3 x 20 sec" }
      ]
    }
  ]
};

export const getWorkoutProgram = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = await UserPreference.findOne({ user: userId });
    if (!preferences) {
      return res.status(404).json({ message: "Preferences not found" });
    }
    const { level, place, days } = preferences;
    const program =
      workoutPrograms[level] &&
      workoutPrograms[level][place] &&
      workoutPrograms[level][place][days];

    if (!program) {
      return res.status(404).json({ message: "No workout program found for your preferences." });
    }

    res.status(200).json({ program });
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout program: " + error.message });
  }
};

export const recordWorkoutCompletion = async (req, res) => {
  try {
    console.log("Recording workout completion - Request body:", req.body);
    const userId = req.user.id;
    const { dayNumber } = req.body;

    console.log("Creating workout completion for user:", userId, "day:", dayNumber);

    // Create new workout completion record
    const workoutCompletion = new WorkoutCompletion({
      user: userId,
      dayNumber,
      completedDate: new Date()
    });
    await workoutCompletion.save();
    console.log("Workout completion saved:", workoutCompletion);

    // Calculate total days completed from WorkoutCompletion collection
    const totalDaysCompleted = await WorkoutCompletion.countDocuments({ user: userId });

    // Update user's daysCompleted field with the calculated total
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }
    user.daysCompleted = totalDaysCompleted;
    await user.save();

    res.status(200).json({
      message: "Workout completion recorded successfully",
      daysCompleted: totalDaysCompleted,
      completion: workoutCompletion
    });
  } catch (error) {
    console.error("Error recording workout completion:", error);
    res.status(500).json({ message: "Error recording workout completion: " + error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    // Calculate total days completed from WorkoutCompletion collection
    const totalDaysCompleted = await WorkoutCompletion.countDocuments({ user: userId });
    
    // Update user's daysCompleted field with the calculated total
    await User.findByIdAndUpdate(userId, { daysCompleted: totalDaysCompleted });
    
    res.status(200).json({ daysCompleted: totalDaysCompleted });
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress: " + error.message });
  }
};

export const updateUserProgress = async (req, res) => {
    try {
        const { currentDay, completedStatuses } = req.body;
        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(
            userId,
            { progress: { currentDay, completedStatuses, updatedAt: new Date() } },
            { new: true }
        );
        res.json({ message: "Progress updated", progress: user.progress });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const updateExerciseProgress = async (req, res) => {
    try {
        const { currentDay, exerciseStatuses } = req.body;
        const userId = req.user.id;
        const user = await User.findByIdAndUpdate(
            userId,
            { exerciseProgress: { currentDay, exerciseStatuses, updatedAt: new Date() } },
            { new: true }
        );
        res.json({ message: "Exercise progress updated", progress: user.exerciseProgress });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getWorkoutHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching workout history for user:", userId);
    
    // Get all workout completions for the user, sorted by date
    const completions = await WorkoutCompletion.find({ user: userId })
      .sort({ completedDate: -1 });
    
    console.log("Found workout completions:", completions.length);
    
    res.status(200).json({
      completions,
      totalDaysCompleted: completions.length
    });
  } catch (error) {
    console.error("Error fetching workout history:", error);
    res.status(500).json({ message: "Error fetching workout history: " + error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Send reset email
    const emailSent = await sendPasswordResetEmail(email, resetToken);
    
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send reset email" });
    }

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Error processing forgot password request" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

// Add BMI progress for a user
export const addBmiProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bmiValue } = req.body;

    if (!bmiValue) {
      return res.status(400).json({ message: "BMI value is required" });
    }

    const bmiProgress = new BMIprogress({
      userId,
      bmiValue,
      date: new Date()
    });

    await bmiProgress.save();
    res.status(201).json(bmiProgress);
  } catch (error) {
    console.error("Error in addBmiProgress:", error);
    res.status(500).json({ message: "Error adding BMI progress", error: error.message });
  }
};

export const getBmiProgresses = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found in request" });
    }
    const userId = new mongoose.Types.ObjectId(req.user._id); // Ensure ObjectId with 'new'
    console.log("Fetching BMI progress for userId:", userId);
    const bmiProgresses = await BMIprogress.find({ userId })
      .sort({ date: -1 })
      .limit(10);
    console.log("BMI progress query result:", bmiProgresses);
    res.json(bmiProgresses);
  } catch (error) {
    console.error("Error in getBmiProgresses:", error);
    res.status(500).json({ message: "Error fetching BMI progress", error: error.message });
  }
};
