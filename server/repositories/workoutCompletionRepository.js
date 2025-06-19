import WorkoutCompletion from '../model/WorkoutCompletionModel.js';

export class WorkoutCompletionRepository {
  async createCompletion(userId, dayNumber) {
    try {
      const completion = new WorkoutCompletion({
        user: userId,
        dayNumber: dayNumber,
        completedDate: new Date()
      });
      return await completion.save();
    } catch (error) {
      throw new Error("Failed to create workout completion: " + error.message);
    }
  }

  async getCompletionsByUser(userId) {
    try {
      return await WorkoutCompletion.find({ user: userId })
        .sort({ completedDate: -1 });
    } catch (error) {
      throw new Error("Failed to fetch workout completions: " + error.message);
    }
  }

  async getDaysCompleted(userId) {
    try {
      const completions = await WorkoutCompletion.find({ user: userId });
      return completions.length;
    } catch (error) {
      throw new Error("Failed to get days completed: " + error.message);
    }
  }
} 