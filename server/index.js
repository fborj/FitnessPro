import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import goalRoute from "./routes/goalRoute.js"; // Use goalRoute instead of dashboardRoute
import userConfigRoute from "./routes/userConfigRoute.js";
import userPreferenceRoutes from "./routes/UserPreferenceRoute.js";
import userProgressRoute from "./routes/userProgressRoute.js"; // Import userProgressRoute
import workoutCompletionRoutes from "./routes/workoutCompletionRoutes.js"; // Import workout completion routes
import BMIprogressRoute from './routes/BMIprogressRoute.js';

dotenv.config();
console.log("Environment Variables:", {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}); // Debug log
console.log("MONGO_URL:", process.env.MONGO_URL); // Log the MONGO_URL to verify

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions)); // Use CORS with options
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("Error: MONGO_URL is not defined in the .env file.");
  process.exit(1);
}

mongoose.set("debug", true); // Enable Mongoose debugging
mongoose
  .connect(MONGO_URL, {
    serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
  })
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    console.error("Stack Trace:", error.stack); // Log stack trace for debugging
    process.exit(1);
  });

// API routes
app.use('/api/user', BMIprogressRoute);
app.use('/api', route);
app.use("/api", goalRoute);
app.use("/api", userConfigRoute);
app.use("/api/userpreferences", userPreferenceRoutes);
app.use("/api/user/userprogresses", userProgressRoute); // Add this line for user progress endpoints
app.use("/api/workout-completions", workoutCompletionRoutes); // Add workout completions routes

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("Server is running.");
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error("UNCAUGHT ERROR:", err);
  res.status(500).json({ message: "Internal server error (uncaught)", error: err.message });
});

console.log("All routes registered");