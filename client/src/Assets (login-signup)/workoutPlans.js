// Unified workout plans for both ExerciseInfo and GoalSetting

// --- BEGINNER GYM PROGRAMS ---
export const beginnerGymPrograms = {
  "1x": [
    { day: 1, exercises: [
      { key: "Treadmill", label: "Treadmill (5 min)" },
      { key: "Goblet Squats", label: "Goblet Squats (3 x 7)" },
      { key: "Lat Pulldown", label: "Lat Pulldown (2 x 10)" },
      { key: "Dumbbell Bench Press", label: "Dumbbell Bench Press (3 x 7)" },
      { key: "Dumbbell Deadlifts", label: "Dumbbell Deadlifts (3 x 7)" },
      { key: "Plank", label: "Plank (2 x 30 sec)" }
    ]}
  ],
  "2x": [
    { day: 1, exercises: [
      { key: "Goblet Squats", label: "Goblet Squats (3 x 7)" },
      { key: "Leg Press", label: "Leg Press (3 x 10)" },
      { key: "Romanian Deadlift", label: "Romanian Deadlift (3 x 5)" },
      { key: "Hanging Leg Raises", label: "Hanging Leg Raises (3 x 15)" }
    ]},
    { day: 2, exercises: [
      { key: "Lat Pulldown", label: "Lat Pulldown (2 x 10)" },
      { key: "Dumbbell Shoulder Press", label: "Dumbbell Shoulder Press (3 x 10)" },
      { key: "Cable Rows", label: "Cable Rows (3 x 10)" },
      { key: "Plank", label: "Plank (2 x 30 sec)" }
    ]}
  ],
  "3x": [
    { day: 1, exercises: [
      { key: "Squat", label: "Squat (3 x 10)" },
      { key: "Push-Ups", label: "Push-Ups (3 x 10)" },
      { key: "Bent Over Row", label: "Bent Over Row (3 x 10)" }
    ]},
    { day: 2, exercises: [
      { key: "Lunges", label: "Lunges (3 x 10 each leg)" },
      { key: "Overhead Dumbbell Press", label: "Overhead Dumbbell Press (2 x 10)" },
      { key: "Seated Cable Row", label: "Seated Cable Row (2 x 10)" },
      { key: "Plank", label: "Plank (2 x 30 sec)" }
    ]},
    { day: 3, exercises: [
      { key: "Kettle Deadlifts", label: "Kettle Deadlifts (2 x 12)" },
      { key: "Chest Fly", label: "Chest Fly (2 x 12)" },
      { key: "Lat Pulldown", label: "Lat Pulldown (3 x 10)" },
      { key: "Russian Twists", label: "Russian Twists (3 x 20)" }
    ]}
  ],
  "4x": [
    { day: 1, exercises: [
      { key: "Dumbbell Bench Press", label: "Dumbbell Bench Press (2 x 12)" },
      { key: "Cable Row", label: "Cable Row (2 x 12)" },
      { key: "Dumbbell Shoulder Press", label: "Dumbbell Shoulder Press (3 x 10)" }
    ]},
    { day: 2, exercises: [
      { key: "Goblet Squats", label: "Goblet Squats (3 x 12)" },
      { key: "Kettle Deadlifts", label: "Kettle Deadlifts (2 x 10)" },
      { key: "Leg Curl Machine", label: "Leg Curl Machine (3 x 12)" }
    ]},
    { day: 3, exercises: [
      { key: "Incline Dumbbell Press", label: "Incline Dumbbell Press (3 x 10)" },
      { key: "Lat Pulldown", label: "Lat Pulldown (3 x 10)" },
      { key: "Dumbbell Lateral Raises", label: "Dumbbell Lateral Raises (3 x 15)" }
    ]},
    { day: 4, exercises: [
      { key: "Leg Press", label: "Leg Press (3 x 10)" },
      { key: "Step-Ups", label: "Step-Ups (3 x 10 each leg)" },
      { key: "Calf Raises", label: "Calf Raises (3 x 15)" }
    ]}
  ],
  "5x": [
    { day: 1, exercises: [
      { key: "Knee Push-Ups", label: "Knee Push-Ups (3 x 10)" },
      { key: "Seated Dumbbell Shoulder Press", label: "Seated Dumbbell Shoulder Press (3 x 10)" },
      { key: "Dumbbell Chest Press", label: "Dumbbell Chest Press (3 x 10)" },
      { key: "Tricep Kickbacks", label: "Tricep Kickbacks (3 x 12)" }
    ]},
    { day: 2, exercises: [
      { key: "Lat Pulldown", label: "Lat Pulldown (3 x 10)" },
      { key: "One-Arm Dumbbell Row (light)", label: "One-Arm Dumbbell Row (light) (3 x 10)" },
      { key: "Seated Rear Delt Raises (bent over)", label: "Seated Rear Delt Raises (bent over) (3 x 12)" }
    ]},
    { day: 3, exercises: [
      { key: "Squat", label: "Squat (3 x 10)" },
      { key: "Step-Ups", label: "Step-Ups (3 x 10)" },
      { key: "Glute Bridges", label: "Glute Bridges (3 x 12)" },
      { key: "Standing Calf Raises", label: "Standing Calf Raises (3 x 15)" }
    ]},
    { day: 4, exercises: [
      { key: "Incline Dumbbell Chest Press", label: "Incline Dumbbell Chest Press (3 x 10)" },
      { key: "Resistance Band or Machine Row", label: "Resistance Band or Machine Row (3 x 10)" },
      { key: "Dumbbell Lateral Raises", label: "Dumbbell Lateral Raises (3 x 10)" },
      { key: "Plank", label: "Plank (3 x 45 sec)" }
    ]},
    { day: 5, exercises: [
      { key: "Hip Hinge with No Weight", label: "Hip Hinge with No Weight (3 x 10)" },
      { key: "Wall Shoulder Taps", label: "Wall Shoulder Taps (3 x 10)" },
      { key: "March in Place (or Step Jacks)", label: "March in Place (or Step Jacks) (3 x 30 sec)" }
    ]}
  ]
};

// --- BEGINNER HOME PROGRAMS ---
export const beginnerHomePrograms = {
  "1x": [
    { day: 1, exercises: [
      { key: "High Knees", label: "High Knees (5 min)" },
      { key: "Backpack Squats", label: "Backpack Squats (3 x 7)" },
      { key: "Doorway Rows", label: "Doorway Rows (2 x 10)" },
      { key: "Push-Ups", label: "Push-Ups (3 x 7)" },
      { key: "Backpack Deadlifts", label: "Backpack Deadlifts (3 x 7)" },
      { key: "Plank", label: "Plank (2 x 30 sec)" }
    ]}
  ],
  "2x": [
    { day: 1, exercises: [
      { key: "Backpack Squats", label: "Backpack Squats (3 x 7)" },
      { key: "Step-Ups", label: "Step-Ups (3 x 10 per leg)" },
      { key: "Backpack Romanian Deadlifts", label: "Backpack Romanian Deadlifts (3 x 5)" },
      { key: "Bodyweight Calf Raises", label: "Bodyweight Calf Raises (3 x 15)" }
    ]},
    { day: 2, exercises: [
      { key: "Doorway Rows", label: "Doorway Rows (2 x 10)" },
      { key: "Backpack Overhead Press", label: "Backpack Overhead Press (3 x 10)" },
      { key: "Prone Y Raise", label: "Prone Y Raise (3 x 10)" },
      { key: "Plank", label: "Plank (2 x 30 sec)" }
    ]}
  ],
  "3x": [
    { day: 1, exercises: [
      { key: "Squats", label: "Squats (3 x 10)" },
      { key: "Push-Ups", label: "Push-Ups (3 x 10)" },
      { key: "Backpack Rows", label: "Backpack Rows (3 x 10)" }
    ]},
    { day: 2, exercises: [
      { key: "Lunges", label: "Lunges (3 x 10)" },
      { key: "Water Bottle/Backpack Press", label: "Water Bottle/Backpack Press (3 x 10)" },
      { key: "Towel Row", label: "Towel Row (3 x 10)" },
      { key: "Plank", label: "Plank (2 x 30 sec)" }
    ]},
    { day: 3, exercises: [
      { key: "Backpack Deadlifts", label: "Backpack Deadlifts (3 x 10)" },
      { key: "Floor Chest Fly with Bottles", label: "Floor Chest Fly with Bottles (3 x 10)" },
      { key: "Doorway Rows", label: "Doorway Rows (3 x 10)" },
      { key: "No-Weight Russian Twists", label: "No-Weight Russian Twists (3 x per side)" }
    ]}
  ],
  "4x": [
    { day: 1, exercises: [
      { key: "Floor Press with Backpack", label: "Floor Press with Backpack (3 x 10)" },
      { key: "Backpack Rows", label: "Backpack Rows (3 x 10)" },
      { key: "Backpack Shoulder Press", label: "Backpack Shoulder Press (3 x 10)" }
    ]},
    { day: 2, exercises: [
      { key: "Backpack Squats", label: "Backpack Squats (3 x 12)" },
      { key: "Backpack Deadlifts", label: "Backpack Deadlifts (3 x 10)" },
      { key: "Glute Bridge Walkouts", label: "Glute Bridge Walkouts (3 x 12)" }
    ]},
    { day: 3, exercises: [
      { key: "Incline Push-Ups", label: "Incline Push-Ups (3 x 10)" },
      { key: "Doorway Rows", label: "Doorway Rows (3 x 10)" },
      { key: "Water Bottle Lateral Raises", label: "Water Bottle Lateral Raises (3 x 15)" }
    ]},
    { day: 4, exercises: [
      { key: "Wall Sit", label: "Wall Sit (3 x 30 sec)" },
      { key: "Step-Ups", label: "Step-Ups (3 x 10)" },
      { key: "Weighted Calf Raises", label: "Weighted Calf Raises (3 x 15)" }
    ]}
  ],
  "5x": [
    { day: 1, exercises: [
      { key: "Knee Push-Ups", label: "Knee Push-Ups (3 x 10)" },
      { key: "Backpack Shoulder Press", label: "Backpack Shoulder Press (3 x 10)" },
      { key: "Floor Press with Backpack", label: "Floor Press with Backpack (3 x 10)" },
      { key: "Chair Dips", label: "Chair Dips (3 x 12)" }
    ]},
    { day: 2, exercises: [
      { key: "Doorway Rows", label: "Doorway Rows (3 x 10)" },
      { key: "Backpack Rows", label: "Backpack Rows (3 x 10)" },
      { key: "Seated Rear Delt Raises (bent over)", label: "Seated Rear Delt Raises (bent over) (3 x 12)" }
    ]},
    { day: 3, exercises: [
      { key: "Squat", label: "Squat (3 x 10)" },
      { key: "Step-Ups", label: "Step-Ups (3 x 10)" },
      { key: "Glute Bridges Walkouts", label: "Glute Bridges Walkouts(3 x 12)" },
      { key: "Standing Calf Raises", label: "Standing Calf Raises (3 x 15)" }
    ]},
    { day: 4, exercises: [
      { key: "Incline Push-Ups", label: "Incline Push-Ups (3 x 10)" },
      { key: "Backpack Rows (Hug + Row Motion)", label: "Backpack Rows (Hug + Row Motion) (3 x 10)" },
      { key: "Water Bottle lateral Raise", label: "Water Bottle lateral Raise(3 x 10)" },
      { key: "Plank", label: "Plank (3 x 45 sec)" }
    ]},
    { day: 5, exercises: [
      { key: "Bodyweight Good Mornings", label: "Bodyweight Good Mornings (3 x 8)" },
      { key: "Incline Shoulder Taps ", label: "Incline Shoulder Taps  (3 x 10)" },
      { key: "Backpack Bear Crawls", label: "Backpack Bear Crawls (3 x 20 sec)" }
    ]}
  ]
};

// --- ADVANCED GYM PROGRAMS ---
export const advancedGymPrograms = {
  "1x": [
    { day: 1, exercises: [
      { key: "Barbell Back Squat", label: "Barbell Back Squat (4 x 6)" },
      { key: "Barbell Bench Press", label: "Barbell Bench Press (4 x 6)" },
      { key: "Bent-over Barbell Row", label: "Bent-over Barbell Row (4 x 8)" },
      { key: "Romanian Deadlift", label: "Romanian Deadlift (3 x 10)" },
      { key: "Pull-ups", label: "Pull-ups (3 x failure)" },
      { key: "Plank", label: "Plank (3 x 1 min)" }
    ]}
  ],
  "2x": [
    { day: 1, exercises: [
      { key: "Bench Press", label: "Bench Press (4 x 6)" },
      { key: "Pull-ups", label: "Pull-ups (4 x failure)" },
      { key: "Overhead Press", label: "Overhead Press (3 x 8)" },
      { key: "Bent-over Barbell Row", label: "Bent-over Barbell Row (3 x 8)" },
      { key: "Dips", label: "Dips (3 x 10)" },
      { key: "Barbell Curls", label: "Barbell Curls (3 x 12)" }
    ]},
    { day: 2, exercises: [
      { key: "Deadlifts", label: "Deadlifts (4 x 5)" },
      { key: "Front Squats", label: "Front Squats (3 x 8)" },
      { key: "Walking Lunges", label: "Walking Lunges (3 x 20 steps)" },
      { key: "Calf Raises", label: "Calf Raises (4 x 15)" }
    ]}
  ],
  "3x": [
    { day: 1, exercises: [
      { key: "Incline Bench Press", label: "Incline Bench Press (4 x 8)" },
      { key: "Dumbbell Shoulder Press", label: "Dumbbell Shoulder Press (4 x 10)" },
      { key: "Cable Flys", label: "Cable Flys (3 x 12)" },
      { key: "Lateral Raises", label: "Lateral Raises (3 x 15)" },
      { key: "Overhead Tricep Extension", label: "Overhead Tricep Extension (3 x 12)" }
    ]},
    { day: 2, exercises: [
      { key: "Pull-ups", label: "Pull-ups (4 x 6)" },
      { key: "Barbell Rows", label: "Barbell Rows (4 x 8)" },
      { key: "Face Pulls", label: "Face Pulls (3 x 15)" },
      { key: "Hammer Curls", label: "Hammer Curls (3 x 12)" },
      { key: "Reverse Flys", label: "Reverse Flys (3 x 15)" }
    ]},
    { day: 3, exercises: [
      { key: "Back Squats", label: "Back Squats (4 x 6)" },
      { key: "Romanian Deadlifts", label: "Romanian Deadlifts (4 x 10)" },
      { key: "Walking Lunges", label: "Walking Lunges (3 x 15 each leg)" },
      { key: "Hanging Leg Raises", label: "Hanging Leg Raises (3 x 15)" },
      { key: "Plank + Side Plank", label: "Plank + Side Plank (3 x 1 min)" }
    ]}
  ],
  "4x": [
    { day: 1, exercises: [
      { key: "Barbell Bench Press", label: "Barbell Bench Press (4 x 6)" },
      { key: "Dumbbell Shoulder Press", label: "Dumbbell Shoulder Press (4 x 8)" },
      { key: "Cable Lateral Raises", label: "Cable Lateral Raises (3 x 15)" },
      { key: "Skull Crushers", label: "Skull Crushers (3 x 12)" }
    ]},
    { day: 2, exercises: [
      { key: "Weighted Pull-ups", label: "Weighted Pull-ups (4 x 6)" },
      { key: "Bent-over Rows", label: "Bent-over Rows (4 x 8)" },
      { key: "Seated Cable Row", label: "Seated Cable Row (3 x 10)" },
      { key: "Bicep Curls", label: "Bicep Curls (3 x 12)" }
    ]},
    { day: 3, exercises: [
      { key: "Deadlifts", label: "Deadlifts (4 x 5)" },
      { key: "Bulgarian Split Squats", label: "Bulgarian Split Squats (3 x 10)" },
      { key: "Leg Curl Machine", label: "Leg Curl Machine (3 x 12)" },
      { key: "Calf Raises", label: "Calf Raises (4 x 15)" }
    ]},
    { day: 4, exercises: [
      { key: "Russian Twists", label: "Russian Twists (3 x 30)" },
      { key: "Ab Wheel Rollouts", label: "Ab Wheel Rollouts (3 x 12)" },
      { key: "Hanging Leg Raises", label: "Hanging Leg Raises (3 x 15)" },
      { key: "Jog", label: "Jog (10 mins)" }
    ]}
  ],
  "5x": [
    { day: 1, exercises: [
      { key: "Bench Press", label: "Bench Press (3 x 10)" },
      { key: "Dumbbell Shoulder Press", label: "Dumbbell Shoulder Press (3 x 10)" },
      { key: "Tricep Rope Pushdown", label: "Tricep Rope Pushdown (3 x 12)" }
    ]},
    { day: 2, exercises: [
      { key: "Lat Pulldown", label: "Lat Pulldown (3 x 10)" },
      { key: "Dumbbell Row", label: "Dumbbell Row (3 x 10)" },
      { key: "Barbell Curl", label: "Barbell Curl (3 x 12)" }
    ]},
    { day: 3, exercises: [
      { key: "Squat", label: "Squat (3 x 10)" },
      { key: "Leg Press", label: "Leg Press (3 x 10)" },
      { key: "Hamstring Curl", label: "Hamstring Curl (3 x 12)" },
      { key: "Calf Raises", label: "Calf Raises (3 x 15)" }
    ]},
    { day: 4, exercises: [
      { key: "Incline Dumbbell Press", label: "Incline Dumbbell Press (3 x 10)" },
      { key: "T-Bar Row", label: "T-Bar Row (3 x 10)" },
      { key: "Arnold Press", label: "Arnold Press (3 x 10)" },
      { key: "Plank", label: "Plank (3 x 45 sec)" }
    ]},
    { day: 5, exercises: [
      { key: "Kettle Deadlift", label: "Kettle Deadlift (3 x 8)" },
      { key: "Push Press", label: "Push Press (3 x 10)" },
      { key: "Sled Push", label: "Sled Push (3 x 20 sec)" }
    ]}
  ]
};

// --- ADVANCED HOME PROGRAMS ---
export const advancedHomePrograms = {
  "1x": [
    { day: 1, exercises: [
      { key: "Pistol Squats", label: "Pistol Squats (3 x 8)" },
      { key: "Pike Push-ups", label: "Pike Push-ups (3 x 10)" },
      { key: "Inverted Rows (under table)", label: "Inverted Rows (under table)(3 x 10)" },
      { key: "Push-ups", label: "Push-ups (3 x failure)" },
      { key: "Glute Bridges (single leg if possible)", label: "Glute Bridges (single leg if possible) (3 x 12)" },
      { key: "Jump Squats", label: "Jump Squats (3 x 10)" }
    ]}
  ],
  "2x": [
    { day: 1, exercises: [
      { key: "Pike Push-ups", label: "Pike Push-ups (4 x failure)" },
      { key: "Archer Push-ups", label: "Archer Push-ups (3 x 8)" },
      { key: "Doorway Rows", label: "Doorway Rows (4 x 10)" },
      { key: "Triceps Dips on Chair", label: "Triceps Dips on Chair (3 x 8)" },
      { key: "Wall Walks", label: "Wall Walks (3 x 3)" },
      { key: "Towel Bicep Curl Isometrics", label: "Towel Bicep Curl Isometrics (3 x 15)" }
    ]},
    { day: 2, exercises: [
      { key: "Pistol Squats", label: "Pistol Squats (3 x 8)" },
      { key: "Bulgarian Split Squats (use chair)", label: "Bulgarian Split Squats (use chair) (3 x 10)" },
      { key: "Wall Sit", label: "Wall Sits (3 x 1min)" },
      { key: "Jump Lunges", label: "Jump Lunges (3 x 12)" },
      { key: "Single-leg Calf Raises", label: "Single-leg Calf Raises (3 x 20)" },
      { key: "Leg Raise", label: "Leg Raise (2 x 10)" }
    ]}
  ],
  "3x": [
    { day: 1, exercises: [
      { key: "Pike Push-ups", label: "Pike Push-ups (4 x 12)" },
      { key: "Diamond Push-ups", label: "Diamond Push-ups (3 x 15)" },
      { key: "Archer Push-ups", label: "Archer Push-ups (3 x 8)" },
      { key: "Chair Dips", label: "Chair Dips (3 x 12)" },
      { key: "Elevated Feet Push-ups", label: "Elevated Feet Push-ups (3 x 15)" }
    ]},
    { day: 2, exercises: [
      { key: "Towel Rows", label: "Towel Rows (4 x 10)" },
      { key: "T-bar Rows", label: "T-bar Rows (3 x 12)" },
      { key: "Backpack Deadlifts", label: "Backpack Deadlifts (4 x 10)" },
      { key: "Towel Bicep Curl Isometrics", label: "Towel Bicep Curl Isometrics (3 x 15)" },
      { key: "Superman Hold", label: "Superman Hold (3 x 30 sec)" }
    ]},
    { day: 3, exercises: [
      { key: "Pistol Squats", label: "Pistol Squats (4 x 8)" },
      { key: "Glute Bridges Walkouts", label: "Glute Bridges Walkouts (4 x 10)" },
      { key: "Wall Sit", label: "Wall Sit (3 x 1 min)" },
      { key: "Bodyweight Calf Raises", label: "Bodyweight Calf Raises (4 x 20)" },
      { key: "Bicycle Crunches", label: "Bicycle Crunches (2 x 15)" }
    ]}
  ],
  "4x": [
    { day: 1, exercises: [
      { key: "Pike Push-ups", label: "Pike Push-ups (4 x 12)" },
      { key: "Diamond Push-ups", label: "Diamond Push-ups (3 x 15)" },
      { key: "Archer Push-up", label: "Archer Push-up (3 x 8)" },
      { key: "Chair Dips", label: "Chair Dips (3 x 12)" },
      { key: "Elevated Feet Push-ups", label: "Elevated Feet Push-ups (3 x 15)" }
    ]},
    { day: 2, exercises: [
      { key: "Pistol Squats", label: "Pistol Squats (4 x 8)" },
      { key: "Glute Bridges Walkouts", label: "Glute Bridges Walkouts (4 x 10)" },
      { key: "Wall Sit", label: "Wall Sit (3 x 1 min)" },
      { key: "Bodyweight Calf Raises", label: "Bodyweight Calf Raises (4 x 20)" },
      { key: "Bicycle Crunchest", label: "Bicycle Crunches (2 x 15)" }
    ]},
    { day: 3, exercises: [
      { key: "Burpees", label: "Burpees (3 x 1 min)" },
      { key: "Jump Squats", label: "Jump Squats (3 x 1 min)" },
      { key: "High Knees", label: "High Knees (3 x 1 min)" },
      { key: "Mountain Climbers", label: "Mountain Climbers (3 x 30 sec)" }
    ]},
    { day: 4, exercises: [
      { key: "Hollow Body Hold", label: "Hollow Body Hold (3 x 30 sec)" },
      { key: "Russian Twists", label: "Russian Twists (3 x 40)" },
      { key: "Plank", label: "Plank (3 x 30 sec)" },
      { key: "Leg Raises", label: "Leg Raises (3 x 20)" },
      { key: "Deep Squat Hold", label: "Deep Squat Hold (2 min)" },
      { key: "Shoulder and Hip Mobility Flows", label: "Shoulder and Hip Mobility Flows (10 min)" }
    ]}
  ],
  "5x": [
    { day: 1, exercises: [
      { key: "Pike Push-upss", label: "Pike Push-ups (4 x failure)" },
      { key: "Archer Push-up", label: "Archer Push-up (3 x 10)" },
      { key: "Elevated Feet Push-ups", label: "Elevated Feet Push-ups (3 x 15)" },
      { key: "Diamond Push-ups", label: "Diamond Push-ups (3 x 12)" },
      { key: "Triceps Dips on chair", label: "Triceps Dips on chair (3 x 15)" }
    ]},
    { day: 2, exercises: [
      { key: "Inverted Rows", label: "Inverted Rows (4 x 10)" },
      { key: "Towel Row", label: "Towel Row (3 x 12)" },
      { key: "Backpack Deadlifts", label: "Backpack Deadlifts (4 x 12)" },
      { key: "Superman Hold", label: "Superman Hold (3 x 20)" },
      { key: "Towel Bicep Curl Isometrics", label: "Towel Bicep Curl Isometrics (3 x 15)" }
    ]},
    { day: 3, exercises: [
      { key: "Pistol Squats", label: "Pistol Squats (4 x 8)" },
      { key: "Bulgarian Split Squats", label: "Bulgarian Split Squatss (3 x 12)" },
      { key: "Jump Squats", label: "Jump Squats (3 x 15)" },
      { key: "Glute Bridges Walkouts", label: "Glute Bridges Walkouts (3 x 20)" },
      { key: "Wall Sit", label: "Wall Sit (3 x 1 min)" },
      { key: "Hanging Leg Raises", label: "Hanging Leg Raises (4 x 20)" }
    ]},
    { day: 4, exercises: [
      { key: "Hollow Body Hold", label: "Hollow Body Hold (3 x 30 sec)" },
      { key: "V-Ups", label: "V-Ups (3 x 20)" },
      { key: "Russian Twists", label: "Russian Twists (3 x 40)" },
      { key: "Plank", label: "Plank (3 x 30 sec)" },
      { key: "Side Plank", label: "Side Plank (3 x 30 sec)" },
      { key: "Leg Raises", label: "Leg Raises (3 x 15)" }
    ]},
    { day: 5, exercises: [
      { key: "Burpees", label: "Burpees (3 x 30 sec)" },
      { key: "High Knees", label: "High Knees (3 x 30 sec)" },
      { key: "Jump Lunges", label: "Jump Lunges (3 x 30 sec)" },
      { key: "Mountain Climbers", label: "Mountain Climbers (3 x 1 min)" },
      { key: "Deep Squat Hold", label: "Deep Squat Hold (2 x 2min)" }
    ]}
  ]
};

// Helper function to get plan array by userPref
export function getPlanByUserPref(userPref) {
  const program = userPref.program || (userPref.level && userPref.place ? `${userPref.level} (${userPref.place})` : userPref.level);
  const split = typeof userPref.split === "string" ? userPref.split : String(userPref.split);

  let planObj;
  if (program === "Beginner (Home)") planObj = beginnerHomePrograms;
  else if (program === "Beginner") planObj = beginnerGymPrograms;
  else if (program === "Advanced (Gym)") planObj = advancedGymPrograms;
  else if (program === "Advanced (Home)") planObj = advancedHomePrograms;
  else return null;

  return planObj[split] || [];
} 