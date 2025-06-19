import express from "express";
import workoutProgramsRoute from "./routes/workoutProgramsRoute.js";
import workoutCompletionRoutes from "./routes/workoutCompletionRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/workout-programs", workoutProgramsRoute);
app.use("/api/workout-completions", workoutCompletionRoutes);

export default app;