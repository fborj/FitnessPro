import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import userPreferenceRoutes from "./routes/UserPreferenceRoute.js";
import goalRoute from "./routes/goalRoute.js";
import workoutCompletionRoutes from "./routes/workoutCompletionRoutes.js";
import cors from "cors";

dotenv.config();

// New: Validate JWT secret key
if (!process.env.JWT_SECRET) {
  console.error("Invalid secret key. Please set a valid JWT secret in your .env file.");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Enable detailed logging for requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});


// New: Check for empty request URL and handle it
app.use((req, res, next) => {
  if (!req.url || req.url.trim() === "") {
    console.error("Empty request URL detected");
    return res.status(400).json({ message: "Request URL is empty" });
  }
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/userpreferences", userPreferenceRoutes); // Ensure this is correctly registered
app.use("/api/goals", goalRoute);
app.use("/api/workout-completions", workoutCompletionRoutes);

// Fallback for /api/userpreferences if no route matched
app.use("/api/userpreferences", (req, res) => {
  res.status(404).json({ message: "User preferences route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ 
    message: "Internal server error", 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});