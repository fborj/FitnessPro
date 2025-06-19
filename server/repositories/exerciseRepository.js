import { pool } from "../db.js"; // Add your database connection

export class ExerciseRepository {
  async getExercisesByCriteria(level, place, days) {
    const query = `
      SELECT *
      FROM exercises
      WHERE level = $1 AND place = $2 AND days = $3
    `;
    const values = [level, place, days];
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw new Error("Failed to fetch exercises: " + error.message);
    }
  }
}
