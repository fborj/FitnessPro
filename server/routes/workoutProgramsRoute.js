import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { ExerciseService } from "../services/exerciseService.js"; // new import
const router = express.Router();
const exerciseService = new ExerciseService();

// Remove the previous static mapping and add a function to return the appropriate plan.
function getWorkoutPlan(pref) {
  // BEGINNER (Home) PLANS
  if (pref.level === "Beginner" && pref.place === "Home" && pref.days === "1x a week") {
    return {
      title: "Beginner Home Workout (1x/week, Full Body)",
      workouts: [
        { day: "Day 1", routine: [
          "High Knees - 5 min",
          "Backpack Squats - 3 x 7",
          "Doorway Rows - 2 x 10",
          "Push-Ups - 3 x 7",
          "Backpack Deadlifts - 3 x 7",
          "Plank - 2 x 30 sec"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Home" && pref.days === "2x a week") {
    return {
      title: "Beginner Home Workout (2x/week)",
      workouts: [
        { day: "Day 1", routine: [
          "Backpack Squats - 3 x 7",
          "Step-Ups - 3 x 10 per leg",
          "Backpack Romanian Deadlifts - 3 x 5",
          "Bodyweight Calf Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 2", routine: [
          "Doorway Rows - 2 x 10",
          "Backpack Overhead Press - 3 x 10",
          "Seated Backpack Rows - 3 x 10",
          "Plank - 2 x 30 sec"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Home" && pref.days === "3x a week") {
    return {
      title: "Beginner Home Workout (3x/week)",
      workouts: [
        { day: "Day 1", routine: [
          "Squats - 3 x 10",
          "Push Ups - 3 x 10",
          "Backpack Rows - 3 x 10"
        ].join(", ") },
        { day: "Day 2", routine: [
          "Lunges - 3 x 10",
          "Water Bottle/Backpack Press - 3 x 10",
          "Towel Row - 3 x 10",
          "Plank - 2 x 30 sec"
        ].join(", ") },
        { day: "Day 3", routine: [
          "Backpack Deadlifts - 3 x 10",
          "Floor Chest Fly with Bottles - 3 x 10",
          "Doorway Rows - 3 x 10",
          "No-Weight Russian Twists - 3 x per side"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Home" && pref.days === "4x a week") {
    return {
      title: "Beginner Home Workout (4x/week)",
      workouts: [
        { day: "Day 1", routine: [
          "Floor Press with Backpack - 3 x 10",
          "Backpack Rows - 3 x 10",
          "Backpack Shoulder Press - 3 x 10"
        ].join(", ") },
        { day: "Day 2", routine: [
          "Backpack Squats - 3 x 12",
          "Backpack Deadlifts - 3 x 10",
          "Glute Bridge Walkouts - 3 x 12"
        ].join(", ") },
        { day: "Day 3", routine: [
          "Incline Push-Ups - 3 x 10",
          "Doorway Rows - 3 x 10",
          "Water Bottle Lateral Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 4", routine: [
          "Wall Sit - 3 x 30 sec",
          "Step-Ups - 3 x 10",
          "Weighted Calf Raises - 3 x 15"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Home" && pref.days === "5x a week") {
    return {
      title: "Beginner Home Workout (5x/week)",
      workouts: [
        { day: "Day 1", routine: [
          "Backpack Floor Press - 3 x 10",
          "Backpack Press - 3 x 10",
          "Bench Dips - 3 x 12"
        ].join(", ") },
        { day: "Day 2", routine: [
          "Doorway Rows - 3 x 10",
          "Backpack Bent-Over Rows - 3 x 10",
          "Backpack Curls - 3 x 12"
        ].join(", ") },
        { day: "Day 3", routine: [
          "Squat - 3 x 10",
          "Step-Ups - 3 x 30 sec",
          "Glute Bridge Walkouts - 3 x 12",
          "Bodyweight Calf Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 4", routine: [
          "Incline Push-Ups - 3 x 10",
          "Backpack Rows (Hug + Row Motion) - 3 x 10",
          "Backpack Arnold Press - 3 x 10",
          "Plank - 3 x 45 sec"
        ].join(", ") },
        { day: "Day 5", routine: [
          "Backpack Deadlifts - 3 x 8",
          "Thrusters (Squat into Overhead Press) - 3 x 10",
          "Backpack Bear Crawls - 3 x 20 sec"
        ].join(", ") }
      ]
    };
  }
  // BEGINNER (Gym) PLANS
  if (pref.level === "Beginner" && pref.place === "Gym" && pref.days === "1x a week") {
    return {
      title: "Beginner Gym Workout (1x/week)",
      workouts: [
        { day: "Day 1", routine: [
          "Treadmill or Bike - 5 min",
          "Goblet Squats - 3 x 7",
          "Lat Pulldown - 2 x 10",
          "Dumbbell Bench Press - 3 x 7",
          "Dumbbell Deadlifts - 3 x 7",
          "Plank - 2 x 30 sec"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Gym" && pref.days === "2x a week") {
    return {
      title: "Beginner Gym Workout (2x/week, Upper/Lower Split)",
      workouts: [
        { day: "Day 1: Lower Body", routine: [
          "Goblet Squats - 3 x 7",
          "Leg Press - 3 x 10",
          "Romanian Deadlift - 3 x 5",
          "Calf Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 2: Upper Body", routine: [
          "Lat Pulldown - 2 x 10",
          "Dumbbell Shoulder Press - 3 x 10",
          "Cable Rows - 3 x 10",
          "Plank - 2 x 30 sec"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Gym" && pref.days === "3x a week") {
    return {
      title: "Beginner Gym Workout (3x/week, Full Body Progression)",
      workouts: [
        { day: "Day 1", routine: [
          "Squats - 3 x 10",
          "Push-Ups - 3 x 10",
          "Bent Over Row - 3 x 10"
        ].join(", ") },
        { day: "Day 2", routine: [
          "Lunges - 3 x 10 each leg",
          "Overhead Dumbbell Press - 3 x 10",
          "Seated Cable Row - 3 x 10",
          "Plank - 2 x 30 sec"
        ].join(", ") },
        { day: "Day 3", routine: [
          "Kettle Deadlifts - 3 x 10",
          "Chest Fly - 3 x 10",
          "Lat Pulldown - 3 x 10",
          "Russian Twists - 3 x 20"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Gym" && pref.days === "4x a week") {
    return {
      title: "Intermediate Gym Workout (4x/week, Upper/Lower Split)",
      workouts: [
        { day: "Day 1: Upper A", routine: [
          "Dumbbell Bench Press - 3 x 10",
          "Cable Row - 3 x 10",
          "Dumbbell Shoulder Press - 3 x 10"
        ].join(", ") },
        { day: "Day 2: Lower A", routine: [
          "Goblet Squats - 3 x 12",
          "Kettle Deadlifts - 3 x 10",
          "Leg Curl Machine - 3 x 12"
        ].join(", ") },
        { day: "Day 3: Upper B", routine: [
          "Incline Dumbbell Press - 3 x 10",
          "Lat Pulldown - 3 x 10",
          "Dumbbell Lateral Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 4: Lower B", routine: [
          "Leg Press - 3 x 10",
          "Step-Ups - 3 x 10 each leg",
          "Calf Raises - 3 x 15"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Beginner" && pref.place === "Gym" && pref.days === "5x a week") {
    return {
      title: "Begginer Gym Workout (5x/week, Push/Pull/Legs/Upper/Full)",
      workouts: [
        { day: "Day 1: Push (Chest/Shoulders/Triceps)", routine: [
          "Bench Press - 3 x 10",
          "Dumbbell Shoulder Press - 3 x 10",
          "Tricep Rope Pushdown - 3 x 12"
        ].join(", ") },
        { day: "Day 2: Pull (Back/Biceps)", routine: [
          "Lat Pulldown - 3 x 10",
          "Dumbbell Row - 3 x 10",
          "Barbell Curl - 3 x 12"
        ].join(", ") },
        { day: "Day 3: Legs", routine: [
          "Squat - 3 x 10",
          "Leg Press - 3 x 10",
          "Hamstring Curl - 3 x 12",
          "Calf Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 4: Upper Body Focus", routine: [
          "Incline Dumbbell Press - 3 x 10",
          "T-Bar Row - 3 x 10",
          "Arnold Press - 3 x 10",
          "Plank - 3 x 45 sec"
        ].join(", ") },
        { day: "Day 5", routine: [
          "Backpack Deadlifts - 3 x 8",
          "Thrusters (Squat into Overhead Press) - 3 x 10",
          "Backpack Bear Crawls - 3 x 20 sec"
        ].join(", ") }
      ]
    };
  }
  // ADVANCED (Gym) PLANS
  if (pref.level === "Advanced" && pref.place === "Gym" && pref.days === "1x a week") {
    return {
      title: "Advanced Gym Workout (1x/week, Full Body)",
      workouts: [
        { day: "Day 1: Full Body", routine: [
          "Barbell Back Squat - 4 x 6",
          "Barbell Bench Press - 4 x 6",
          "Bent-over Barbell Row - 4 x 8",
          "Romanian Deadlift - 3 x 10",
          "Pull-ups - 3 x failure",
          "Plank - 3 x 1 min"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Gym" && pref.days === "2x a week") {
    return {
      title: "Advanced Gym Workout (2x/week, Upper/Lower Split)",
      workouts: [
        { day: "Day 1: Upper Body", routine: [
          "Bench Press - 4 x 6",
          "Pull-ups - 4 x failure",
          "Overhead Press - 3 x 8",
          "Barbell Rows - 3 x 8",
          "Dips - 3 x 10",
          "Barbell Curls - 3 x 12"
        ].join(", ") },
        { day: "Day 2: Lower Body", routine: [
          "Deadlifts - 4 x 5",
          "Front Squats - 3 x 8",
          "Walking Lunges - 3 x 20 steps",
          "Calf Raises - 4 x 15"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Gym" && pref.days === "3x a week") {
    return {
      title: "Advanced Gym Workout (3x/week, Push/Pull/Legs + Core)",
      workouts: [
        { day: "Day 1: Push", routine: [
          "Incline Bench Press - 4 x 8",
          "Dumbbell Shoulder Press - 4 x 10",
          "Cable Flys - 3 x 12",
          "Lateral Raises - 3 x 15",
          "Overhead Tricep Extension - 3 x 12"
        ].join(", ") },
        { day: "Day 2: Pull", routine: [
          "Weighted Pull-ups - 4 x 6",
          "Barbell Rows - 4 x 8",
          "Face Pulls - 3 x 15",
          "Hammer Curls - 3 x 12",
          "Reverse Flys - 3 x 15"
        ].join(", ") },
        { day: "Day 3: Legs", routine: [
          "Back Squats - 4 x 6",
          "Romanian Deadlifts - 4 x 10",
          "Walking Lunges - 3 x 15 each leg",
          "Hanging Leg Raises - 3 x 15",
          "Plank + Side Plank - 3 x 1 min"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Gym" && pref.days === "4x a week") {
    return {
      title: "Advanced Gym Workout (4x/week, Push/Pull/Legs + Core)",
      workouts: [
        { day: "Day 1: Push", routine: [
          "Barbell Bench Press - 4 x 6",
          "Dumbbell Shoulder Press - 4 x 8",
          "Cable Lateral Raises - 3 x 15",
          "Skull Crushers - 3 x 12"
        ].join(", ") },
        { day: "Day 2: Pull", routine: [
          "Weighted Pull-ups - 4 x 6",
          "Bent-over Rows - 4 x 8",
          "Seated Cable Row - 3 x 10",
          "Bicep Curls - 3 x 12"
        ].join(", ") },
        { day: "Day 3: Legs", routine: [
          "Deadlifts - 4 x 5",
          "Bulgarian Split Squats - 3 x 10",
          "Leg Curls - 3 x 12",
          "Calf Raises - 4 x 15"
        ].join(", ") },
        { day: "Day 4: Core", routine: [
          "Russian Twists - 3 x 30",
          "Ab Wheel Rollouts - 3 x 12",
          "Hanging Leg Raises - 3 x 15",
          "Jog - 10 mins"
        ].join(", ") }
      ]
    };
  }
  // ADVANCED (Home) PLANS
  if (pref.level === "Advanced" && pref.place === "Home" && pref.days === "1x a week") {
    return {
      title: "Advanced Home Workout (1x/week, Full Body)",
      workouts: [
        { day: "Day 1: Full Body", routine: [
          "Pistol Squats - 3 x 8",
          "Handstand Push-ups or Pike Push-ups - 3 x 10",
          "Inverted Rows (under table) - 3 x 10",
          "Push-ups - 3 x failure",
          "Glute Bridges (single leg if possible) - 3 x 12",
          "Jump Squats - 3 x 10"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Home" && pref.days === "2x a week") {
    return {
      title: "Advanced Home Workout (2x/week, Upper/Lower Split)",
      workouts: [
        { day: "Day 1: Upper Body", routine: [
          "Handstand Push-ups or Pike Push-ups - 4 x failure",
          "Archer Push-ups - 3 x 8",
          "Door Frame Rows / Table Rows - 4 x 10",
          "Triceps Dips on Chair - 3 x 15",
          "Wall Walks - 3 x 3",
          "Towel Bicep Curl Isometrics - 3 x 15"
        ].join(", ") },
        { day: "Day 2: Lower Body + Core", routine: [
          "Pistol Squats - 3 x 8",
          "Bulgarian Split Squats (use chair) - 3 x 10",
          "Wall Sit - 3 x 1 min",
          "Jump Lunges - 3 x 12",
          "Single-leg Calf Raises - 3 x 20",
          "Leg Raises - 2 x 10"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Home" && pref.days === "3x a week") {
    return {
      title: "Advanced Home Workout (3x/week, Push/Pull/Legs)",
      workouts: [
        { day: "Day 1: Push", routine: [
          "Pike Push-ups - 4 x 12",
          "Diamond Push-ups - 3 x 15",
          "Archer Push-ups - 3 x 8",
          "Dips on Chair - 3 x 12",
          "Elevated Feet Push-ups - 3 x 15"
        ].join(", ") },
        { day: "Day 2: Pull", routine: [
          "Towel Rows (door or pole) - 4 x 10",
          "Table Rows - 3 x 12",
          "Backpack Deadlifts (filled with books) - 4 x 10",
          "Towel Bicep Curl Isometrics - 3 x 15",
          "Superman Hold - 3 x 30 sec"
        ].join(", ") },
        { day: "Day 3: Legs + Core", routine: [
          "Pistol Squats - 4 x 8",
          "Glute Bridges (Single-leg if possible) - 4 x 10",
          "Wall Sit - 3 x 1 min",
          "Calf Raises (Slow tempo) - 4 x 20",
          "Bicycle Crunches - 2 x 15"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Home" && pref.days === "4x a week") {
    return {
      title: "Advanced Home Workout (4x/week, Upper/Lower + Core)",
      workouts: [
        { day: "Day 1: Upper Body", routine: [
          "Pike Push-ups - 4 x 12",
          "Diamond Push-ups - 3 x 15",
          "Archer Push-ups - 3 x 8",
          "Dips on Chair - 3 x 12",
          "Elevated Feet Push-ups - 3 x 15"
        ].join(", ") },
        { day: "Day 2: Lower Body", routine: [
          "Pistol Squats - 4 x 8",
          "Glute Bridges (Single-leg if possible) - 4 x 10",
          "Wall Sit - 3 x 1 min",
          "Calf Raises (Slow tempo) - 4 x 20",
          "Bicycle Crunches - 2 x 15"
        ].join(", ") },
        { day: "Day 3: HIIT Conditioning", routine: [
          "Burpees - 3 x 1 min",
          "Jump Squats - 3 x 1 min",
          "High Knees - 3 x 1 min",
          "Mountain Climbers - 3 x 30 sec"
        ].join(", ") },
        { day: "Day 4", routine: [
          "Hollow Body Hold - 3 x 30 sec",
          "Russian Twists - 3 x 40",
          "Plank Walk-outs - 3 x 10",
          "Lying Leg Raises - 3 x 20",
          "Deep Squat Hold - 2 min",
          "Shoulder and Hip Mobility Flows - 10 min"
        ].join(", ") }
      ]
    };
  }
  if (pref.level === "Advanced" && pref.place === "Home" && pref.days === "5x a week") {
    return {
      title: "Advanced Home Workout (5x/week, Push/Pull/Legs + Hybrid)",
      workouts: [
        { day: "Day 1: Push", routine: [
          "Handstand Push-ups or Pike Push-ups - 4 x failure",
          "Archer Push-ups - 3 x 10",
          "Elevated Feet Push-ups - 3 x 15",
          "Diamond Push-ups - 3 x 12",
          "Triceps Dips (on chair or low surface) - 3 x 15"
        ].join(", ") },
        { day: "Day 2: Pull", routine: [
          "Inverted Rows (under sturdy table) - 4 x 10",
          "Towel Rows (over door or sturdy object) - 3 x 12",
          "Backpack Deadlifts (heavy backpack) - 4 x 12",
          "Superman Extensions - 3 x 20",
          "Towel Bicep Curls (isometric resistance) - 3 x 15"
        ].join(", ") },
        { day: "Day 3: Legs", routine: [
          "Pistol Squats - 4 x 8",
          "Bulgarian Split Squats - 3 x 12",
          "Jump Squats - 3 x 15",
          "Glute Bridges - 3 x 20",
          "Wall Sit - 3 x 1 min",
          "Calf Raises (slow tempo) - 4 x 20"
        ].join(", ") },
        { day: "Day 4: Core", routine: [
          "Hollow Body Hold - 3 x 30 sec",
          "V-Ups - 3 x 20",
          "Russian Twists - 3 x 40",
          "Plank Walk-Outs - 3 x 10",
          "Side Plank (both sides) - 3 x 30 sec",
          "Lying Leg Raises - 3 x 15"
        ].join(", ") },
        { day: "Day 5: Full Body HIIT", routine: [
          "Burpees - 3 x 30 sec",
          "High Knees - 3 x 30 sec",
          "Jump Lunges - 3 x 30 sec",
          "Mountain Climbers - 3 x 1 min",
          "Deep squat hold - 2 x 2 min"
        ].join(", ") }
      ]
    };
  }
  
  return {
    title: "Custom Plan",
    workouts: [
      { day: "Day 1", routine: "Your custom workout will appear here." }
    ]
  };
}

// GET route returning a workout plan based on query parameters
router.get("/", authenticate, async (req, res) => {
  try {
    const { level, place, days } = req.query;
    if (!level || !place || !days) {
      return res.status(400).json({ message: "Missing required query parameters: level, place, days" });
    }
    console.log("Received workout plan request:", { level, place, days });
    const plan = await exerciseService.getExercisesByCriteria(level, place, days);
    console.log("Returning workout plan:", plan);
    res.json(plan);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

export default router;
