import { WorkoutCompletionRepository } from '../repositories/workoutCompletionRepository.js';

const workoutCompletionRepository = new WorkoutCompletionRepository();

export const createWorkoutCompletion = async (req, res) => {
  try {
    const { userId } = req.params;
    const { dayNumber } = req.body;

    if (!dayNumber) {
      return res.status(400).json({ message: "Day number is required" });
    }

    const completion = await workoutCompletionRepository.createCompletion(userId, dayNumber);
    res.status(201).json(completion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkoutCompletions = async (req, res) => {
  try {
    const { userId } = req.params;
    const completions = await workoutCompletionRepository.getCompletionsByUser(userId);
    res.status(200).json(completions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDaysCompleted = async (req, res) => {
  try {
    const { userId } = req.params;
    const daysCompleted = await workoutCompletionRepository.getDaysCompleted(userId);
    res.status(200).json({ daysCompleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 