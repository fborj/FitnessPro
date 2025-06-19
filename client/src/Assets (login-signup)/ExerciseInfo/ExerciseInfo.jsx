import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExerciseInfo.css';
import { API_BASE_URL } from "../../config";
import { getPlanByUserPref } from '../workoutPlans';

const exerciseDetails = {
  "Ab Wheel Rollouts": {
    "title": "Ab Wheel Rollouts",
    "description": "Advanced core move that trains deep stabilizers.",
    "instructions": ["Kneel, roll wheel forward while keeping abs tight, then roll back."],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Ab-Wheel-Rollout.gif"
  },
  "Arnold Press": {
    "title": "Arnold Press",
    "description": "Shoulder press variation for full delt activation. That focuses on shoulders and triceps.",
    "instructions": ["Rotate dumbbells from front of shoulders to overhead press."],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/arnold-presses.gif"
  },
  "Backpack Bear Crawls": {
    "title": "Backpack Bear Crawls",
    "description": "Backpack bear crawls are a dynamic full-body exercise that targets the shoulders, core, and legs. Adding a backpack with weight increases the challenge, making this move more effective for building strength and endurance.",
    "instructions": [
      "Fill a backpack with weight and wear it on your back.",
      "Start on all fours, with your hands and feet on the ground, hips lifted, and your body in a \"tabletop\" position.",
      "Crawl forward by moving your right hand and left foot at the same time, then your left hand and right foot.",
      "Keep your core engaged and back flat as you crawl, avoiding sagging in the hips.",
      "Continue crawling for a set distance or time, then reverse the motion to crawl backward."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/bear-crawl-movement.gif"
  },
  "Backpack Deadlifts": {
    "title": "Backpack Deadlifts",
    "description": "Backpack deadlifts are a beginner-friendly, home alternative to traditional deadlifts. They target the glutes, hamstrings, and lower back using a weighted backpack for resistance.",
    "instructions": [
      "Fill a backpack with books or other weights and place it in front of you on the floor.",
      "Stand with feet hip-width apart, bend your knees slightly, and hinge at your hips.",
      "Grab the backpack handles or sides with both hands.",
      "Keep your back flat and chest up as you lift the backpack by driving through your heels.",
      "Stand tall, squeeze your glutes at the top, then lower the backpack back down with control."
    ],
    "img": "https://evofitness.at/wp-content/uploads/2025/05/00.gif"
  },
  "Backpack Overhead Press": {
    "title": "Backpack Overhead Press",
    "description": "The backpack overhead press is a simple and effective exercise that targets the shoulders, triceps, and upper chest using a weighted backpack. It's an excellent option for home workouts with minimal equipment.",
    "instructions": [
      "Fill a backpack with books or other heavy items and hold the straps or top of the bag with both hands.",
      "Stand with your feet shoulder-width apart and the backpack at chest level.",
      "Press the backpack overhead, extending your arms fully.",
      "Pause briefly at the top, then lower the backpack back down to chest level with control.",
      "Keep your core engaged and avoid arching your lower back."
    ],
    "img": "https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/SQUAT-SHOULDERPRESS.gif"
  },
  "Backpack Romanian Deadlifts": {
    "title": "Backpack Romanian Deadlifts",
    "description": "Backpack Romanian Deadlifts (RDLs) focus on the hamstrings, glutes, and lower back. This variation uses a weighted backpack and emphasizes hip hinging with minimal knee bend, making it ideal for building posterior chain strength at home.",
    "instructions": [
      "Hold a weighted backpack in front of your thighs with both hands.",
      "Stand with feet hip-width apart, knees slightly bent.",
      "Hinge at your hips, lowering the backpack down your legs while keeping your back flat.",
      "Lower until you feel a stretch in your hamstrings—don't round your back.",
      "Drive through your hips to return to standing, squeezing your glutes at the top."
    ],
    "img": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzByemcwdnp4ZGRlODB6eW9iZmZrcXJpZndjM3p3NHh3OTU0M293NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pnTrSbX8w3gpxUcaRN/giphy.gif"
  },
  "Backpack Rows": {
    "title": "Backpack Rows",
    "description": "Backpack rows are a great exercise to target your upper back, particularly the lats, rhomboids, and traps, using a backpack as resistance. It's a simple, effective movement you can do at home.",
    "instructions": [
      "Fill a backpack with books or other heavy objects and hold it by the top handles with both hands.",
      "Stand with your feet hip-width apart and knees slightly bent.",
      "Hinge at your hips, keeping your back flat and chest up, so that your torso is angled forward.",
      "Pull the backpack towards your torso by bending your elbows, squeezing your shoulder blades together at the top.",
      "Slowly lower the backpack back to the starting position, maintaining control and avoiding jerking motions.",
      "Repeat for the desired number of reps, keeping your core tight throughout."
    ],
    "img": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJhMzV0cDhtZzJycjNscWdvcW1vcGhuYmluM2h6cmY3M2lhZ2p5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/23Ue0WMUzmwZj4Dhra/giphy.gif"
  },
  "Backpack Shoulder Press": {
    "title": "Backpack Shoulder Press",
    "description": "The backpack shoulder press is a simple and effective exercise for strengthening the shoulders, triceps, and upper chest. Using a backpack for resistance, it's a great at-home alternative to traditional dumbbell or barbell presses.",
    "instructions": [
      "Fill a backpack with books or other heavy items and hold the top of the backpack with both hands, keeping it at chest level.",
      "Stand with feet shoulder-width apart, keeping your core engaged and your back straight.",
      "Press the backpack overhead, fully extending your arms.",
      "Pause at the top, then slowly lower the backpack back to chest level with control.",
      "Repeat for the desired number of reps, focusing on maintaining good posture and avoiding arching your back."
    ],
    "img": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJkYzVhOXVzOGpzdmJ0cndvbTQ2MnQzam1lOXFxdDVreWxnN2pvdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pwx4cma10kIp2xWFNM/giphy.gif"
  },
  "Backpack Squats": {
    "title": "Backpack Squats",
    "description": "Backpack squats are a simple and effective weighted squat variation using a loaded backpack. They target the quads, glutes, hamstrings, and core—ideal for home workouts.",
    "instructions": [
      "Fill a backpack with books or other weights and wear it on your back like a normal school bag.",
      "Stand with feet shoulder-width apart, toes slightly out.",
      "Keep your chest up and core tight.",
      "Bend your knees and push your hips back to squat down.",
      "Lower until thighs are parallel to the floor (or as far as comfortable), then drive through your heels to stand."
    ],
    "img": "https://blog.goruck.com/wp-content/uploads/2020/04/SQUAT.gif"
  },
  "Barbell Back Squat": {
    "title": "Barbell Back Squat",
    "description": "A strength move that builds lower body and core stability. That focuses on quads, glutes, and core.",
    "instructions": [
      "Stand with barbell on upper back, feet shoulder-width apart. Squat down, then rise back up. Keep chest upright."
    ],
    "img": "https://c.tenor.com/pdMmsiutWkcAAAAd/tenor.gif"
  },
  "Barbell Bench Press": {
    "title": "Barbell Bench Press",
    "description": "A classic upper-body lift that increases pushing strength. That focuses on chest, shoulders and triceps.",
    "instructions": [
      "Lie flat on bench, lower bar to chest, then press it up until arms are straight. Feet stay flat on the floor."
    ],
    "img": "https://c.tenor.com/UxJvu3Zw8ewAAAAd/tenor.gif"
  },
  "Barbell Curl": {
    "title": "Barbell Curl",
    "description": "Strengthens biceps with focus on controlled tension.",
    "instructions": [
      "Curl barbell toward shoulders, lower slowly without swinging."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/02/barbell-cheat-curl.gif"
  },
  "Bent Over Rows": {
    "title": "Bent Over Rows",
    "description": "The bent-over row is a compound exercise that targets the upper and middle back, including the lats, rhomboids, and traps, as well as the biceps and rear shoulders.",
    "instructions": [
      "Stand with feet hip-width apart, holding a barbell or dumbbells in front of you.",
      "Bend your knees slightly and hinge at the hips, keeping your back flat and chest up.",
      "Let the weights hang down with arms extended.",
      "Pull the weights toward your torso, squeezing your shoulder blades together.",
      "Lower the weights slowly and repeat, keeping your core tight throughout."
    ],
    "img": "https://c.tenor.com/ZA7d-cdoYEIAAAAd/tenor.gif"
  },
  "Bent-over Barbell Row": {
    "title": "Bent-over Barbell Row",
    "description": "A pulling exercise that strengthens the back and improves posture. That focuses on back, triceps, and core.",
    "instructions": [
      "Bend at hips with flat back. Pull barbell to your torso, then lower it with control."
    ],
    "img": "https://c.tenor.com/AYJ_bNXDvoUAAAAd/tenor.gif"
  },
  "Bicep Curls": {
    "title": "Bicep Curls",
    "description": "Classic arm builder for size and definition.",
    "instructions": [
      "Curl barbell or dumbbells toward shoulders, control on the way down."
    ],
    "img": "https://c.tenor.com/8T_oLOn1XJwAAAAd/tenor.gif"
  },
  "Bodyweight Calf Raises": {
    "title": "Bodyweight Calf Raises",
    "description": "Bodyweight calf raises are a simple yet effective exercise that targets the calf muscles (gastrocnemius and soleus). They help improve ankle strength, stability, and lower leg definition.",
    "instructions": [
      "Stand with your feet hip-width apart and your knees straight.",
      "Slowly raise your heels off the ground, coming up onto the balls of your feet.",
      "Pause for a moment at the top, squeezing your calves.",
      "Lower your heels back down slowly and with control.",
      "Repeat the movement for the desired number of reps."
    ],
    "img": "https://fitliferegime.com/wp-content/uploads/2023/05/Donkey-Calf-Raise.gif"
  },
  "Bodyweight Good Mornings": {
    "title": "Bodyweight Good Mornings",
    "description": "Bodyweight good mornings are an excellent exercise for targeting the hamstrings, glutes, and lower back. They help improve posture and hip hinge mobility without any equipment.",
    "instructions": [
      "Stand with your feet shoulder-width apart, knees slightly bent, and hands placed behind your head or across your chest.",
      "Hinge at your hips, pushing your glutes back while keeping your back straight and chest lifted.",
      "Lower your torso until you feel a stretch in your hamstrings, making sure not to round your back.",
      "Reverse the motion by driving through your hips to return to standing.",
      "Repeat for the desired number of reps, focusing on controlled movement."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/09/barbell-good-morning.gif"
  },
  "Bulgarian Split Squats": {
    "title": "Bulgarian Split Squats",
    "description": "Single-leg movement for strength and balance.",
    "instructions": [
      "Rear foot elevated, lower front leg into squat, then push back up."
    ],
    "img": "https://c.tenor.com/-nA6dX0Ws28AAAAd/tenor.gif"
  },
  "Cable Flys": {
    "title": "Cable Flys",
    "description": "Isolation move to emphasize chest contraction.",
    "instructions": [
      "Stand between cables, arms slightly bent. Bring handles together in front of chest."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/cable-fly.gif"
  },
  "Cable Lateral Raises": {
    "title": "Cable Lateral Raises",
    "description": "Isolation for shoulder width and definition.",
    "instructions": [
      "Raise cables out to sides, arms slightly bent, pause at shoulder height."
    ],
    "img": "https://c.tenor.com/nJyyTUIZRScAAAAd/tenor.gif"
  },
  "Cable Rows": {
    "title": "Cable Rows",
    "description": "Cable rows are a compound back exercise that targets the middle back, lats, and biceps using a cable machine with a seated row attachment. It helps build posture and upper body strength.",
    "instructions": [
      "Sit at the cable row machine with your feet on the footplates and knees slightly bent.",
      "Grab the handle (V-bar or straight bar) with both hands.",
      "Sit upright with a straight back and arms extended."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/cable-seated-row.gif"
  },
  "Chest Fly": {
    "title": "Chest Fly",
    "description": "The chest fly is an isolation exercise that targets the pectoral muscles. It helps develop chest width and definition, typically performed with dumbbells or a machine.",
    "instructions": [
      "Lie on a flat bench holding a dumbbell in each hand, palms facing each other.",
      "Start with arms extended above your chest, elbows slightly bent.",
      "Slowly open your arms out to the sides in a wide arc until you feel a stretch in your chest.",
      "Keep the bend in your elbows and avoid dropping the weights too low.",
      "Bring the dumbbells back up in the same arc, squeezing your chest at the top."
    ],
    "img": "https://c.tenor.com/oJXOnsC72qMAAAAd/tenor.gif"
  },
  "Deadlift": {
    "title": "Deadlift",
    "description": "A full-body strength movement that emphasizes posterior chain power. That focuses on glutes, hamstrings, and back",
    "instructions": [
      "Stand with feet hip-width apart, grip bar outside knees. Lift by driving through heels, keeping back flat."
    ],
    "img": "https://c.tenor.com/8WFespm7NwoAAAAd/tenor.gif"
  },
  "Doorway Rows": {
    "title": "Doorway Rows",
    "description": "Doorway rows are a bodyweight exercise that targets the back muscles, especially the lats and rhomboids. It's a great at-home alternative to rowing movements using minimal equipment.",
    "instructions": [
      "Stand facing an open doorway and grasp both sides at about waist or chest height.",
      "Lean back slightly with arms extended, keeping your body straight and heels on the floor.",
      "Pull your chest toward the doorway by bending your elbows and squeezing your shoulder blades together.",
      "Slowly extend your arms to return to the starting position.",
      "Keep your core tight and movement controlled throughout."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2023/06/Bodyweight-Row-in-Doorway.gif"
  },
  "Dumbbell Bench Press": {
    "title": "Dumbbell Bench Press",
    "description": "The dumbbell bench press is a compound chest exercise that targets the pectorals, triceps, and shoulders. It allows for a greater range of motion than the barbell version and helps improve muscle balance.",
    "instructions": [
      "Lie flat on a bench with a dumbbell in each hand, feet flat on the floor.",
      "Hold the dumbbells at chest level with palms facing forward.",
      "Press the weights up until your arms are fully extended above your chest.",
      "Slowly lower the dumbbells back to the starting position."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"
  },
  "Dumbbell Deadlifts": {
    "title": "Dumbbell Deadlifts",
    "description": "Dumbbell deadlifts are a compound lower-body and back exercise that targets the hamstrings, glutes, lower back, and core. They are a beginner-friendly alternative to barbell deadlifts and help build functional strength.",
    "instructions": [
      "Stand with feet hip-width apart, holding a dumbbell in each hand at your sides or in front of your thighs.",
      "Keep your back straight and core engaged.",
      "Hinge at the hips and lower the dumbbells down the front of your legs, keeping them close to your body.",
      "Lower until your hamstrings feel a stretch or the dumbbells reach mid-shin.",
      "Push through your heels to return to standing, squeezing your glutes at the top."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-deadlifts.gif"
  },
  "Dumbbell Lateral Raises": {
    "title": "Dumbbell Lateral Raises",
    "description": "Dumbbell lateral raises are an isolation exercise that primarily targets the lateral (middle) deltoids of the shoulders. This exercise helps improve shoulder width and definition.",
    "instructions": [
      "Stand with your feet hip-width apart, holding a dumbbell in each hand at your sides with palms facing inward.",
      "Keeping a slight bend in your elbows, raise both dumbbells outward and upward to shoulder height.",
      "Pause briefly at the top, then slowly lower the dumbbells back down to the starting position.",
      "Avoid using momentum or swinging your body; keep the movement controlled.",
      "Focus on lifting with your shoulders, not your hands or forearms."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif"
  },
  "Dumbbell Row": {
    "title": "Dumbbell Row",
    "description": "Single-arm row for upper back and biceps isolation.",
    "instructions": [
      "One hand on bench, pull dumbbell to hip, control on the way down."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif"
  },
  "Dumbbell Shoulder Press": {
    "title": "Dumbbell Shoulder Press",
    "description": "The dumbbell shoulder press is a compound exercise that primarily targets the deltoid muscles, especially the front and side heads, while also engaging the triceps and upper chest. It helps build upper-body strength and shoulder stability.",
    "instructions": [
      "Sit or stand with a dumbbell in each hand at shoulder height, palms facing forward.",
      "Engage your core and keep your back straight.",
      "Press the dumbbells upward until your arms are fully extended overhead.",
      "Pause briefly at the top, then lower the dumbbells back to shoulder level in a controlled motion.",
      "Avoid arching your lower back or flaring your elbows too wide."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif"
  },
  "Face Pulls": {
    "title": "Face Pulls",
    "description": "Improves posture and rear shoulder strength.That focuses on rear delts and traps",
    "instructions": [
      "Use rope at upper pulley, pull toward face while keeping elbows high."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif"
  },
  "Floor Chest Fly with Bottles": {
    "title": "Floor Chest Fly with Bottles",
    "description": "The floor chest fly with bottles is a great alternative to traditional dumbbell chest flies, targeting the chest, shoulders, and triceps using household items like water bottles or any similar objects.",
    "instructions": [
      "Lie flat on your back on the floor with a water bottle in each hand.",
      "Keep your knees bent and feet flat on the floor for stability.",
      "Extend your arms straight above your chest, palms facing each other.",
      "Slowly lower your arms out to the sides, maintaining a slight bend in your elbows.",
      "Squeeze your chest as you bring your arms back together to the starting position.",
      "Repeat for the desired number of reps."
    ],
    "img": "https://c.tenor.com/TuMDTcCr3eMAAAAd/tenor.gif"
  },
  "Floor Press with Backpack": {
    "title": "Floor Press with Backpack",
    "description": "The floor press with a backpack is a simple chest exercise that targets the pectorals, shoulders, and triceps. It's a great home workout variation using a backpack for added resistance.",
    "instructions": [
      "Lie on your back on the floor with a filled backpack resting on your chest, holding the top straps with both hands.",
      "Position your feet flat on the floor and your knees bent to maintain stability.",
      "Press the backpack upward, extending your arms fully while keeping your elbows slightly bent.",
      "Lower the backpack back down to your chest in a controlled manner, engaging your chest and triceps.",
      "Repeat for the desired number of reps, ensuring your back stays flat and your core engaged."
    ],
    "img": "https://gogoodguru.com/wp-content/uploads/2019/11/Water-Bottle-Floor-Chest-Presses_F_Animated.gif"
  },
  "Front Squats": {
    "title": "Front Squats",
    "description": "A squat variation that targets quads and core more than traditional squats. That focuses on quads, glutes, and core",
    "instructions": [
      "Hold bar on front shoulders, elbows high. Squat down with upright posture, then push back up."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/09/front-squat.gif"
  },
  "Glute Bridge Walkouts": {
    "title": "Glute Bridge Walkouts",
    "description": "Glute bridges are a bodyweight exercise that primarily targets the glutes, while also working the hamstrings and core. They help improve hip stability, posture, and lower-body strength.",
    "instructions": [
      "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
      "Place your arms by your sides, palms down.",
      "Press through your heels to lift your hips toward the ceiling.",
      "Squeeze your glutes at the top, creating a straight line from shoulders to knees.",
      "Lower your hips slowly back to the floor and repeat."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/glute-bridge.gif"
  },
  "Goblet Squats": {
    "title": "Goblet Squats",
    "description": "The goblet squat is a lower-body exercise that targets the quads, glutes, hamstrings, and core. Holding a dumbbell or kettlebell in front of your chest helps improve squat form and stability.",
    "instructions": [
      "Stand with your feet shoulder-width apart, holding a dumbbell or kettlebell with both hands close to your chest.",
      "Keep your back straight, chest lifted, and core engaged.",
      "Lower your body by bending your knees and pushing your hips back, keeping the weight close to your body.",
      "Squat down until your thighs are parallel to the ground (or deeper if flexibility allows).",
      "Press through your heels to return to standing, squeezing your glutes at the top."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/explosive-goblet-squat.gif"
  },
  "Hammer Curls": {
    "title": "Hammer Curls",
    "description": "Emphasizes forearms and brachialis muscle. That focuses on biceps and forearms",
    "instructions": [
      "Hold dumbbells with neutral grip, curl up and down under control."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Hammer-Curl.gif"
  },
  "Hamstring Curl": {
    "title": "Hamstring Curl",
    "description": "Machine-based isolation for hamstrings.",
    "instructions": [
      "Curl weight toward glutes, control release."
    ],
    "img": "https://burnfit.io/wp-content/uploads/2023/11/LEG_CURL.gif"
  },
  "Hanging Leg Raises": {
    "title": "Hanging Leg Raises",
    "description": "Targets lower abs and hip flexors.",
    "instructions": [
      "Step forward into lunge, alternate legs while walking."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/08/Hanging-Leg-Raises.gif"
  },
  "High Knees": {
    "title": "High Knees",
    "description": "High knees are a cardio-intensive bodyweight exercise that strengthens the legs, improves coordination, and elevates heart rate for conditioning and fat burning.",
    "instructions": [
      "Stand tall with feet hip-width apart.",
      "Quickly drive one knee up toward your chest while pumping the opposite arm.",
      "Alternate legs in a running motion, lifting knees as high as possible.",
      "Stay on the balls of your feet and maintain a brisk pace.",
      "Keep your core engaged and chest lifted throughout."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/08/High-Knee-Run.gif"
  },
  "Hip Hinge with No Weights": {
    "title": "Hip Hinge with No Weights",
    "description": "The hip hinge is a foundational movement pattern that targets the glutes, hamstrings, and lower back. Practicing it without weight helps build proper form for exercises like deadlifts and kettlebell swings.",
    "instructions": [
      "Stand with feet hip-width apart, knees slightly bent.",
      "Place your hands on your hips or crossed on your chest.",
      "Push your hips back while keeping your spine straight and chest lifted.",
      "Lower your torso until you feel a stretch in your hamstrings.",
      "Drive through your hips to return to standing, squeezing your glutes at the top."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pvc-hinge-example.gif"
  },
  "Incline Bench Press": {
    "title": "Incline Bench Press",
    "description": "Builds upper chest and front deltoids with angled pressing. That focuses on upper chest, shoulders, and triceps",
    "instructions": [
      "Lie on incline bench, lower bar to upper chest, press upward."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif"
  },
  "Elevated Feet Push-ups": {
    "title": "Elevated Feet Push-ups",
    "description": "An advanced push-up variation that increases resistance on the upper chest and shoulders by elevating your feet. It challenges core stability and builds upper body strength more intensely than standard push-ups.",
    "instructions": [
      "Place your feet on an elevated surface (bench, chair, or step) and hands shoulder-width apart on the floor.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest toward the floor by bending your elbows.",
      "Pause briefly at the bottom, then push back up to the starting position.",
      "Maintain a tight core throughout the movement."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2015/07/Decline-Push-Up.gif"
  },
  "Backpack Bent-Over Rows": {
    "title": "Backpack Bent-Over Rows",
    "description": "A backpack-based alternative to traditional bent-over rows that targets the upper back, lats, rhomboids, and biceps using simple home equipment.",
    "instructions": [
      "Fill a backpack with weight (books, water bottles, etc.) and grab it by the top or side handles.",
      "Stand with feet hip-width apart, knees slightly bent.",
      "Hinge forward at your hips, keeping your back flat and chest up.",
      "Pull the backpack toward your lower chest by bending your elbows.",
      "Squeeze your shoulder blades at the top, then lower with control."
    ],
    "img": "https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Backpack_Rows.gif?v=1727233864"
  },
  "Backpack Curls": {
    "title": "Backpack Curls",
    "description": "A bicep-focused exercise using a backpack for resistance. It simulates dumbbell curls and helps build arm strength and size using household items.",
    "instructions": [
      "Hold the top straps of a weighted backpack with both hands, arms at your sides.",
      "Stand with your feet shoulder-width apart, elbows tucked in.",
      "Curl the backpack up toward your chest while keeping your elbows stationary.",
      "Squeeze your biceps at the top, then slowly lower it back down.",
      "Avoid swinging your arms or using momentum."
    ],
    "img": "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/07/400x400_Biceps_Workouts_At_Home_Backpack_Curls.gif?h=840"
  },
  "Backpack Thrusters": {
    "title": "Backpack Thrusters",
    "description": "A full-body movement that combines a squat and overhead press using a backpack. This exercise targets the legs, glutes, shoulders, and core—great for strength and conditioning.",
    "instructions": [
      "Hold a loaded backpack at chest level with both hands.",
      "Stand with feet shoulder-width apart and perform a deep squat.",
      "As you rise from the squat, press the backpack overhead in one fluid motion.",
      "Lower the backpack back to chest level and repeat.",
      "Keep your core tight and avoid leaning back during the press."
    ],
    "img": "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzU0MjNmMHllcDQzbTNlZXByeHRzbGcybmFvY29vdTN5cGxtZHAwbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elH6fPN5PvSsic2oWW/giphy.gif"
  },
  "Bench Dips": {
    "title": "Bench Dips",
    "description": "A bodyweight triceps exercise that also works the chest and shoulders. It's performed using a bench, chair, or similar surface.",
    "instructions": [
      "Sit on the edge of a bench with hands next to your hips.",
      "Move your feet forward and lower your body off the bench, supporting your weight with your arms.",
      "Bend your elbows to lower your body until your arms are at about 90 degrees.",
      "Push through your palms to return to the starting position.",
      "Keep your back close to the bench throughout."
    ],
    "img": "https://c.tenor.com/iGyfarCUXe8AAAAd/tenor.gif"
  },
  "Bicycle Crunches": {
    "title": "Bicycle Crunches",
    "description": "A core exercise that targets the upper and lower abs as well as the obliques. It mimics a pedaling motion to engage multiple abdominal muscles.",
    "instructions": [
      "Lie flat on your back with hands behind your head and knees lifted to 90 degrees.",
      "Bring your right elbow toward your left knee while extending your right leg.",
      "Switch sides, bringing your left elbow toward your right knee.",
      "Continue alternating sides in a controlled, bicycle-like motion.",
      "Keep your lower back pressed into the floor."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/bicycle-crunch-movement.gif"
  },
  "Chair Dips": {
    "title": "Chair Dips",
    "description": "A simple yet effective triceps and shoulder exercise using a chair for support. It's ideal for home workouts and improves upper-body pushing strength.",
    "instructions": [
      "Sit on the edge of a sturdy chair with hands gripping the edge.",
      "Move your hips forward off the chair, legs extended or bent slightly.",
      "Lower your body by bending your elbows to about 90 degrees.",
      "Push back up until your arms are fully extended.",
      "Keep your elbows pointing backward, not flaring outward."
    ],
    "img": "https://c.tenor.com/XZ0zLOLCbm0AAAAd/tenor.gif"
  },
  "Tricep Dips on Chair": {
    "title": "Tricep Dips on Chair",
    "description": "A variation of chair dips that specifically isolates the triceps. Best performed with slow, controlled movement to maximize engagement.",
    "instructions": [
      "Place your hands on the edge of a chair behind you, fingers pointing forward.",
      "Extend your legs or keep them bent, heels on the floor.",
      "Lower your body by bending your elbows to a 90-degree angle.",
      "Push through your palms to straighten your arms and return to start.",
      "Avoid using your legs to assist the movement."
    ],
    "img": "https://c.tenor.com/XZ0zLOLCbm0AAAAd/tenor.gif"
  },
  "Water Bottle Press": {
    "title": "Water Bottle Press",
    "description": "A creative alternative to dumbbell shoulder presses, this exercise uses water bottles to strengthen the deltoids, triceps, and upper chest.",
    "instructions": [
      "Hold a water bottle in each hand at shoulder height, palms facing forward.",
      "Stand or sit with a straight back and engaged core.",
      "Press the bottles overhead until your arms are fully extended.",
      "Pause at the top, then slowly lower them back to shoulder height.",
      "Keep movements smooth and avoid locking your elbows."
    ],
    "img": "https://gogoodguru.com/wp-content/uploads/2019/11/Water-Bottle-Overhead-Press_F__Animated.gif"
  },
  "Incline Dumbbell Press": {
    "title": "Incline Dumbbell Press",
    "description": "The incline dumbbell press targets the upper portion of the chest (clavicular head of the pectoralis major), as well as the shoulders and triceps. It's an effective variation of the flat bench press, adding emphasis to the upper chest.",
    "instructions": [
      "Set an incline bench at a 30–45-degree angle and sit down with a dumbbell in each hand.",
      "Hold the dumbbells at shoulder height with your palms facing forward.",
      "Press the dumbbells up until your arms are fully extended above your chest.",
      "Lower the dumbbells back down with control until your elbows are at a 90-degree angle or slightly deeper.",
      "Keep your core engaged and avoid arching your lower back."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"
  },
  "Incline Push-Ups": {
    "title": "Incline Push-Ups",
    "description": "Incline push-ups are a variation of the traditional push-up that target the chest, shoulders, and triceps, with less strain on the lower back and core. They are performed with the hands elevated on a surface like a bench, table, or step.",
    "instructions": [
      "Place your hands on an elevated surface, like a bench, with arms slightly wider than shoulder-width.",
      "Keep your body in a straight line, core engaged.",
      "Lower your chest toward the surface, then push back up.",
      "Repeat for desired reps."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Push-Up.gif"
  },
  "Incline Shoulder Taps": {
    "title": "Incline Shoulder Taps",
    "description": "Incline shoulder taps are a variation of the shoulder tap exercise, performed with your hands elevated on an inclined surface. This reduces the intensity, making it a great core stability and shoulder workout.",
    "instructions": [
      "Place your hands on an elevated surface like a bench or step, keeping your body in a straight line from head to heels.",
      "Lift one hand off the surface and tap your opposite shoulder.",
      "Return the hand to the surface and repeat with the other hand.",
      "Continue alternating sides, maintaining a stable torso and avoiding any rocking motion."
    ],
    "img": "https://gymvisual.com/img/p/2/3/7/0/4/23704.gif"
  },
  "Jog": {
    "title": "Jog",
    "description": "Light cardio for recovery and fat-burning.",
    "instructions": [
      "Jog at steady pace for 10–20 minutes post-core to cool down and condition."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/07/Run.gif"
  },
  "Kettlebell Deadlift": {
    "title": "Kettlebell Deadlift",
    "description": "The kettlebell deadlift is a lower-body exercise that targets the glutes, hamstrings, and lower back. It's a great way to build strength in the posterior chain using a kettlebell.",
    "instructions": [
      "Stand with feet hip-width apart, with a kettlebell on the floor between your feet.",
      "Hinge at your hips, bending your knees slightly, and grip the kettlebell with both hands.",
      "Keeping your back straight, push your hips back and lower the kettlebell towards the ground.",
      "Once the kettlebell passes your knees, reverse the movement by driving through your hips and returning to a standing position.",
      "Squeeze your glutes at the top and avoid rounding your back during the movement."
    ],
    "img": "https://media.tenor.com/0PlWgJxSNi0AAAAM/single-bd-swing-dumbbell-workout.gif"
  },
  "Knee Push-Ups": {
    "title": "Knee Push-Ups",
    "description": "The knee push-up is a beginner-friendly variation of the standard push-up that targets the chest, shoulders, and triceps with reduced body weight for easier execution.",
    "instructions": [
      "Start in a push-up position but with your knees on the floor and feet crossed.",
      "Place your hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to knees.",
      "Lower your chest toward the floor by bending your elbows.",
      "Push back up to the starting position, keeping your core tight."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/04/knee-push-ups.gif"
  },
  "Lat Pulldown": {
    "title": "Lat Pulldown",
    "description": "The lat pulldown is a resistance exercise that targets the latissimus dorsi muscles in your back. It mimics the pull-up motion but is performed on a machine, making it accessible for beginners and adjustable by weight.",
    "instructions": [
      "Sit at the lat pulldown machine and adjust the thigh pad to secure your legs.",
      "Grip the bar slightly wider than shoulder-width with palms facing forward.",
      "Pull the bar down to your upper chest while squeezing your shoulder blades together.",
      "Pause briefly, then slowly return the bar to the starting position.",
      "Repeat for the desired number of reps."
    ],
    "img": "https://th.bing.com/th/id/OIP.MXfG1T_5-lSYM3XnJDUMbgHaHa?rs=1&pid=ImgDetMain"
  },
  "Leg Curl Machine": {
    "title": "Leg Curl Machine",
    "description": "The leg curl machine targets the hamstrings, the muscles at the back of your thighs. It isolates and strengthens these muscles, aiding in knee joint stability and athletic performance.",
    "instructions": [
      "Adjust the machine to fit your body: the pad should rest just above your heels.",
      "Lie face down (or sit, depending on the machine type) and grip the handles for support.",
      "Curl your legs upward by contracting your hamstrings, bringing the pad toward your glutes.",
      "Pause briefly at the top, then slowly lower the weight back to the start.",
      "Keep the motion controlled and avoid using momentum."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/seated-leg-curl.gif"
  },
  "Leg Press": {
    "title": "Leg Press",
    "description": "The leg press is a machine-based exercise that targets the quadriceps, hamstrings, and glutes. It is a great alternative to squats, providing a safer, more controlled movement for leg strength and muscle building.",
    "instructions": [
      "Sit on the leg press machine with your feet shoulder-width apart on the platform.",
      "Place your back and head against the pad, and ensure your knees are bent at about 90 degrees.",
      "Push through your heels to extend your legs and lift the weight, making sure not to lock your knees at the top.",
      "Slowly lower the weight by bending your knees, keeping them in line with your toes.",
      "Avoid letting your knees cave inward or extend too far beyond your toes."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/single-leg-leg-press.gif"
  },
  "March in Place": {
    "title": "March in Place",
    "description": "Marching in place is a low-impact cardio exercise that improves circulation, warms up the body, and gently works the legs, hips, and core.",
    "instructions": [
      "Stand tall with your feet hip-width apart and arms at your sides.",
      "Lift one knee to hip height while swinging the opposite arm forward.",
      "Lower your foot and repeat with the other leg.",
      "Continue alternating legs at a steady pace.",
      "Keep your core engaged and posture upright throughout."
    ],
    "img": "https://gymvisual.com/img/p/2/3/7/4/9/23749.gif"
  },
  "Overhead Dumbbell Press": {
    "title": "Overhead Dumbbell Press",
    "description": "The overhead dumbbell press is a compound upper-body exercise that primarily targets the shoulders (deltoids), with secondary activation of the triceps and upper chest. It improves shoulder strength and stability.",
    "instructions": [
      "Sit or stand with a dumbbell in each hand at shoulder height, palms facing forward.",
      "Brace your core and keep your back straight.",
      "Press the dumbbells upward until your arms are fully extended overhead.",
      "Pause briefly, then slowly lower the weights back to shoulder level.",
      "Keep your movements controlled and avoid arching your lower back."
    ],
    "img": "https://gymvisual.com/img/p/1/4/4/9/6/14496.gif"
  },
  "Overhead Press": {
    "title": "Overhead Press",
    "description": "A pressing move that strengthens the shoulders and stabilizers. That focuses on shoulders, triceps, and core.",
    "instructions": [
      "Stand or sit with barbell at shoulder height. Press overhead until arms are straight, then lower."
    ],
    "img": "https://musclemagfitness.com/wp-content/uploads/barbell-standing-military-press-exercise.gif"
  },
  "Overhead Tricep Extension": {
    "title": "Overhead Tricep Extension",
    "description": "Stretches and strengthens long head of triceps.",
    "instructions": [
      "Hold dumbbell with both hands, extend overhead, then lower behind head and press back up."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/tricep-overhead-extensions.gif"
  },
  "Plank": {
    "title": "Plank",
    "description": "The plank is an isometric core exercise that strengthens your abdominals, back, and shoulders. It also improves posture and stability.",
    "instructions": [
      "Start in a forearm position with elbows directly under shoulders and forearms parallel.",
      "Extend your legs back, resting on your toes, keeping your body in a straight line.",
      "Engage your core, glutes, and legs; avoid sagging or arching your back.",
      "Hold the position for a set time (e.g., 20–60 seconds).",
      "Breathe steadily throughout and avoid looking up or down."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank.gif"
  },
  "Prone Y Raise": {
    "title": "Prone Y Raise",
    "description": "The prone Y raise is an upper-body exercise that targets the upper back, specifically the lower traps and shoulders. It helps improve posture and shoulder stability.",
    "instructions": [
      "Lie face down on a bench or the floor with your arms extended in front of you in a \"Y\" shape (thumbs pointing up).",
      "Keep your head neutral with your spine and engage your core.",
      "Lift your arms off the ground, squeezing your shoulder blades together as you raise your arms to form the \"Y\" shape.",
      "Hold briefly at the top, then slowly lower your arms back to the starting position.",
      "Repeat for the desired number of reps, focusing on controlled movements."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/11/prone-y-raise-movement.gif"
  },
  "Pull-ups": {
    "title": "Pull-ups",
    "description": "A bodyweight movement that develops upper body strength and endurance. That focuses on lats, biceps, and shoulders.",
    "instructions": [
      "Grip bar, pull body up until chin is over the bar. Lower slowly with full range of motion."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up.gif"
  },
  "Push Press": {
    "title": "Push Press",
    "description": "Explosive overhead press using leg drive for full-body power. That focuses on shoulders, triceps, and legs",
    "instructions": [
      "Dip at knees, press bar overhead using legs and arms."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/push-press.gif"
  },
  "Push-Ups": {
    "title": "Push-Ups",
    "description": "Push-ups are a classic bodyweight exercise that target the chest, shoulders, triceps, and core. They build upper body strength and endurance.",
    "instructions": [
      "Start in a high plank position with hands slightly wider than shoulder-width.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest toward the floor by bending your elbows.",
      "Push through your palms to return to the starting position.",
      "Keep your core tight and avoid letting your hips sag."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/push-up.gif"
  },
  "Resistance Band Row": {
    "title": "Resistance Band Row",
    "description": "The resistance band row is a back-strengthening exercise that targets the lats, rhomboids, and traps. It's a versatile, joint-friendly movement ideal for home workouts.",
    "instructions": [
      "Sit with your legs extended and loop the band around your feet (or anchor it securely at a low point).",
      "Hold the band handles or ends with arms extended and palms facing each other.",
      "Pull the band toward your torso, squeezing your shoulder blades together.",
      "Keep your back straight and elbows close to your body.",
      "Slowly return to the starting position and repeat."
    ],
    "img": "https://spotebi.com/wp-content/uploads/2017/12/band-seated-row-exercise-illustration-spotebi.gif"
  },
  "Reverse Flys": {
    "title": "Reverse Flys",
    "description": "Isolation move for upper back and rear delts. That focuses on rear delts and rhomboids",
    "instructions": [
      "Hinge forward, raise dumbbells to sides, squeeze shoulder blades."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2022/02/Band-Seated-Row.gif"
  },
  "Romanian Deadlift": {
    "title": "Romanian Deadlift",
    "description": "The Romanian deadlift is a hip hinge exercise that primarily targets the hamstrings, glutes, and lower back. It's a great movement for building posterior chain strength and improving flexibility.",
    "instructions": [
      "Stand with feet hip-width apart, holding a barbell or dumbbells in front of your thighs.",
      "Keep your knees slightly bent and your back straight.",
      "Hinge at the hips, lowering the weight toward your shins, keeping it close to your body.",
      "Lower until you feel a stretch in your hamstrings.",
      "Reverse the movement by driving your hips forward to return to standing."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/06/barbell-romanian-deadlift-movement.gif"
  },
  "Russian Twists": {
    "title": "Russian Twists",
    "description": "The Russian twist is a core exercise that targets the obliques and abdominal muscles. It improves rotational strength and core stability, often performed with or without added weight.",
    "instructions": [
      "Sit on the floor with knees bent and feet flat (or raised for more difficulty).",
      "Lean back slightly while keeping your back straight and core engaged.",
      "Hold your hands together or grasp a weight/medicine ball.",
      "Twist your torso to the right, bringing your hands beside your hip.",
      "Return to center, then twist to the left—this is one rep.",
      "Continue alternating sides in a controlled motion."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2021/12/how-to-do-a-kettlebell-russian-twist.gif"
  },
  "Seated Cable Row": {
    "title": "Seated Cable Row",
    "description": "The seated cable row is a back exercise that primarily targets the lats, rhomboids, and traps. It helps improve posture and upper back strength.",
    "instructions": [
      "Sit on the cable row machine with your feet placed on the footrests and knees slightly bent.",
      "Grip the handle with both hands, palms facing each other or facing downward, and extend your arms in front of you.",
      "Pull the handle toward your torso while squeezing your shoulder blades together.",
      "Keep your chest lifted and back straight as you row the handle back.",
      "Slowly return the handle to the starting position with control."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/cable-row.gif"
  },
  "Seated Dumbbell Shoulder Press": {
    "title": "Seated Dumbbell Shoulder Press",
    "description": "The seated dumbbell shoulder press is a compound exercise that targets the deltoids, particularly the front and side heads, along with the triceps. Sitting provides added back support and stability.",
    "instructions": [
      "Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms facing forward.",
      "Engage your core and keep your feet flat on the floor.",
      "Press the dumbbells upward until your arms are fully extended overhead.",
      "Pause briefly at the top, then slowly lower the weights back to shoulder level.",
      "Keep your back pressed against the bench and avoid arching your spine."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/arnold-presses.gif"
  },
  "Seated Rear Delt Raises (bent over)": {
    "title": "Seated Rear Delt Raises (bent over)",
    "description": "Seated rear delt raises are an isolation exercise that targets the rear deltoids (back of the shoulders), as well as the upper back muscles like the rhomboids and traps. It helps improve shoulder balance and posture.",
    "instructions": [
      "Sit on the edge of a bench with a dumbbell in each hand, arms hanging down.",
      "Lean forward at the hips, keeping your back flat and chest slightly up.",
      "With a slight bend in your elbows, raise the dumbbells out to the sides until they reach shoulder height.",
      "Squeeze your shoulder blades together at the top.",
      "Lower the dumbbells slowly back down under control."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/11/cabled-seated-rear-lateral-raise.gif"
  },
  "Skull Crushers": {
    "title": "Skull Crushers",
    "description": "Isolation movement for triceps growth.",
    "instructions": [
      "Lie on bench, lower EZ bar to forehead, extend elbows to lift back up."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/flat-bench-skull-crusher.gif"
  },
  "Sled Push": {
    "title": "Sled Push",
    "description": "High-intensity full-body conditioning and strength. That focuses on legs, glutes, core, and heart",
    "instructions": [
      "Push sled forward with strong drive, maintain low stance and steady pace."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/sled-push-muscles.gif"
  },
  "Squat": {
    "title": "Squat",
    "description": "Squats are a foundational lower-body exercise that targets the quads, glutes, hamstrings, and core. They build strength, stability, and mobility.",
    "instructions": [
      "Stand with feet shoulder-width apart, toes slightly turned out.",
      "Keep your chest up and core engaged.",
      "Bend your knees and push your hips back as if sitting into a chair.",
      "Lower until your thighs are parallel to the ground (or as low as comfortable).",
      "Push through your heels to return to standing, squeezing your glutes at the top."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/07/squat-jump.gif"
  },
  "Standing Calf Raises": {
    "title": "Standing Calf Raises",
    "description": "Standing calf raises are a simple lower-leg exercise that targets the calf muscles (gastrocnemius and soleus). They help improve ankle strength, balance, and muscle definition.",
    "instructions": [
      "Stand upright with your feet hip-width apart, near a wall or support for balance.",
      "Slowly raise your heels off the ground, coming up onto the balls of your feet.",
      "Pause and squeeze your calves at the top.",
      "Lower your heels back down under control.",
      "Repeat for desired reps, keeping the movement smooth and steady."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/standing-calf-raise.gif"
  },
  "Step-Ups": {
    "title": "Step-Ups",
    "description": "Step-ups are a functional lower-body exercise that targets the quads, glutes, and hamstrings. They also improve balance, coordination, and single-leg strength.",
    "instructions": [
      "Stand in front of a sturdy bench or step, feet hip-width apart.",
      "Place one foot firmly on the step.",
      "Push through your front heel to lift your body up, bringing the other foot to the step.",
      "Step back down with the trailing foot, then return to the start position.",
      "Repeat on one leg or alternate legs each rep."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/07/weighted-step-up.gif"
  },
  "T-Bar Row": {
    "title": "T-Bar Row",
    "description": "Compound back movement for thickness. That focuses on mid-back, lats and biceps.",
    "instructions": [
      "Pull T-bar handle to chest, squeeze shoulder blades."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2021/10/t-bar-row-muscles.gif"
  },
  "Towel Row": {
    "title": "Towel Row",
    "description": "The towel row is a simple, bodyweight exercise that targets the back muscles, including the lats, rhomboids, and traps. It can be performed at home using a towel and a sturdy surface like a door or pull-up bar.",
    "instructions": [
      "Loop a towel over a sturdy door handle, bar, or rail.",
      "Hold each end of the towel with both hands and lean back, keeping your body straight and feet flat on the ground.",
      "Pull your body toward the towel by bending your elbows and squeezing your shoulder blades together.",
      "Keep your core engaged and chest up as you row your body toward the towel.",
      "Slowly lower your body back to the starting position and repeat."
    ],
    "img": "https://gymvisual.com/img/p/2/1/5/1/5/21515.gif"
  },
  "One-Arm Dumbbell Row (light)": {
    "title": "One-Arm Dumbbell Row (light)",
    "description": "A beginner-friendly version of the one-arm dumbbell row that targets the upper and middle back, especially the lats and rhomboids, with a lighter weight to focus on form and control. It also engages the biceps and core for stabilization.",
    "instructions": [
      "Place your left knee and hand on a bench or sturdy surface for support.",
      "Hold a light dumbbell in your right hand with your arm fully extended toward the floor.",
      "Keep your back flat and core engaged.",
      "Pull the dumbbell up toward your torso by bending your elbow, keeping it close to your body.",
      "Squeeze your shoulder blade at the top, then slowly lower the dumbbell back down.",
      "Complete the reps on one side, then switch to the other."
    ],
    "img": "https://gymvisual.com/img/p/1/0/4/0/3/10403.gif"
  },
  "Tricep Rope Pushdown": {
    "title": "Tricep Rope Pushdown",
    "description": "Isolation movement to define and strengthen triceps.",
    "instructions": [
      "Use cable rope, push down from chest level to thighs, extend elbows fully."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/cable-pushdown.gif"
  },
  "Treadmill": {
    "title": "Treadmill",
    "description": "The treadmill is a cardio machine that simulates walking, jogging, or running indoors. It offers adjustable speed and incline for varied intensity.",
    "instructions": [
      "Step onto the treadmill and set the speed to your desired pace.",
      "If desired, adjust the incline for added intensity.",
      "Keep your posture upright and avoid holding onto the handlebars unless necessary for balance.",
      "Maintain a steady stride, breathing rhythmically.",
      "Cool down by lowering speed for the last 5 minutes."
    ],
    "img": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8945b0176219235.64c11350dbe8b.gif"
  },
  "Walking Lunges": {
    "title": "Walking Lunges",
    "description": "A dynamic leg exercise that improves balance, coordination, and strength. That focuses on quads, hamstrings, and glutes",
    "instructions": [
      "Step forward into a lunge, lowering back knee. Push up and bring back foot forward into next lunge."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/bodyweight-walking-lunge-movement.gif"
  },
  "Wall Shoulder Taps": {
    "title": "Wall Shoulder Taps",
    "description": "Wall shoulder taps are a beginner-friendly core and shoulder stability exercise. They help build strength in the shoulders, arms, and core while improving balance and coordination.",
    "instructions": [
      "Face a wall and place your hands on it at shoulder height, arms extended.",
      "Step back slightly so your body is at a slight angle.",
      "Lift one hand off the wall and tap the opposite shoulder.",
      "Return your hand to the wall and repeat with the other side.",
      "Keep your core tight and hips steady throughout the movement."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/10/shoulder-tap.gif"
  },
  "Wall Sit": {
    "title": "Wall Sit",
    "description": "The wall sit is an isometric exercise that targets the quadriceps, glutes, and core. It helps improve endurance and lower body strength.",
    "instructions": [
      "Stand with your back against a wall and slide down into a seated position, thighs parallel to the ground.",
      "Keep your knees at a 90-degree angle, with your feet flat on the floor and hips aligned.",
      "Hold the position, keeping your core engaged and your back against the wall.",
      "Hold for as long as possible, then slowly rise back to standing."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/wall-sit.gif"
  },
  "Water Bottle Lateral Raises": {
    "title": "Water Bottle Lateral Raises",
    "description": "Water bottle lateral raises target the shoulders, particularly the deltoid muscles. It's a simple exercise that uses household items, like water bottles, for resistance.",
    "instructions": [
      "Hold a water bottle in each hand with arms at your sides.",
      "Stand tall with feet hip-width apart and core engaged.",
      "Raise your arms out to the sides until they're level with your shoulders.",
      "Slowly lower the bottles back to your sides.",
      "Repeat for the desired reps, focusing on controlled movements."
    ],
    "img": "https://gymvisual.com/img/p/2/7/1/9/5/27195.gif"
  },
  "Archer Push-ups": {
    "title": "Archer Push-ups",
    "description": "Push-up variation that increases load on one side, targets chest, triceps, shoulders.",
    "instructions": [
      "Get into push-up position. Shift weight to one side, extend the opposite arm out straight. Lower and press. Alternate sides."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/archer-push-up.gif"
  },
  "Inverted Rows": {
    "title": "Inverted Rows",
    "description": "Bodyweight pulling movement.",
    "instructions": [
      "Lie under a sturdy table.",
      "Grip the edge, keep your body straight, and pull your chest to the table.",
      "Lower back down with control."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/03/inverted-row.gif"
  },
  "Jump Squats": {
    "title": "Jump Squats",
    "description": "Explosive lower-body movement.",
    "instructions": [
      "Perform a bodyweight squat and explode upward into a jump.",
      "Land softly and go right into the next rep.",
      "Keep core tight and back straight."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/07/squat-jump.gif"
  },
  "Leg Raises": {
    "title": "Leg Raises",
    "description": "Core-focused exercise targeting lower abs and hip flexors.",
    "instructions": [
      "Lie on back, lift straight legs toward ceiling, slowly lower without touching the floor."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/06/lying-leg-raise.gif"
  },
  "Pike Push-ups": {
    "title": "Pike Push-ups",
    "description": "Vertical pressing movements.",
    "instructions": [
      "Get into a pike position and lower head toward the floor, then press up."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/pike-push-up.gif"
  },
  "Pistol Squats": {
    "title": "Pistol Squats",
    "description": "A single-leg squat requiring balance, mobility, and strength.",
    "instructions": [
      "Stand on one leg, extend the other forward.",
      "Lower into a squat while keeping your torso upright.",
      "Go as low as possible, then push back up. Use a chair/wall for balance if needed."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/09/pistol-squat-muscles.gif"
  },
  "Single-Leg Calf Raises": {
    "title": "Single-Leg Calf Raises",
    "description": "Isolation for calves, improving balance and ankle stability.",
    "instructions": [
      "Stand on one leg on a raised surface, lower heel below level, then raise as high as possible."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2024/01/single-leg-calf-raise.gif"
  },
  "Superman Hold": {
    "title": "Superman Hold",
    "description": "Isometric exercise that targets the lower back, glutes, and shoulder stabilizers.",
    "instructions": [
      "Lie face down, extend arms and legs. Lift both simultaneously and hold while contracting glutes and back muscles. Keep neck neutral."
    ],
    "img": "https://gymvisual.com/img/p/2/0/9/0/2/20902.gif"
  },
  "Towel Bicep Curl Isometrics": {
    "title": "Towel Bicep Curl Isometrics",
    "description": "Isometric hold that targets the biceps through sustained tension.",
    "instructions": [
      "Stand on a towel, gripping both ends. Pull up as if curling, while resisting with your foot. Hold for 30–60 seconds."
    ],
    "img": "https://wellnessed.com/wp-content/uploads/2023/03/bicep-curls.jpg"
  },
  "Wall Walks": {
    "title": "Wall Walks",
    "description": "Core-intensive movement that strengthens shoulders, chest, and stabilizers.",
    "instructions": [
      "Start in a push-up position near a wall, walk feet up wall while walking hands back toward the wall, then return."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/08/wall-walk-muscles.gif"
  },
  "Leg Curls": {
    "title": "Leg Curls",
    "description": "Isolates and strengthens the hamstrings.",
    "instructions": [
      "Sit or lie on the machine, curl the pad toward your glutes, then slowly return."
    ],
    "img": null
  },
  "Burpees": {
    "title": "Burpees",
    "description": "A full-body explosive movement combining strength and cardio. Builds power, endurance, and coordination.",
    "instructions": [
      "Start standing. Drop into a squat, place hands on the floor, jump feet back to a plank. Perform a push-up (optional), then jump feet forward and explode into a jump. Land softly and repeat. Keep your pace fast but form tight."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/burpee-movement.gif"
  },
  "Deep Squat Hold": {
    "title": "Deep Squat Hold",
    "description": "An isometric mobility and strength hold for the hips, ankles, and lower back. Improves squat depth and postureV",
    "instructions": [
      "Lower into the deepest squat your body allows while keeping heels down.",
      "Keep your chest upright and elbows inside knees.",
      "Hold the position, breathe deeply, and use this time to open up hips and ankles."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/11/pause-jump-squats.gif"
  },
  "Diamond Push-ups": {
    "title": "Diamond Push-ups",
    "description": "A close-grip push-up variation that targets the triceps, inner chest, and front delts with high intensity.",
    "instructions": [
      "Start in a plank with hands under your chest forming a diamond shape with thumbs and index fingers.",
      "Lower your chest directly over your hands, keeping elbows close to your sides.",
      "Push back up without flaring elbows. Keep core braced and back flat."
    ],
    "img": "https://fitnessprogramer.com/wp-content/uploads/2021/02/Diamond-Push-up.gif"
  },
  "Hollow Body Hold": {
    "title": "Hollow Body Hold",
    "description": "A gymnastic core hold that trains total-body tension and deep core stability.",
    "instructions": [
      "Lie on your back, arms extended overhead, legs straight. Lift shoulders and legs off the floor, pressing lower back into the ground. Hold the position tightly, keeping neck neutral and breathing steady."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/11/hollow-body-holds.gif"
  },
  "Mountain Climbers": {
    "title": "Mountain Climbers",
    "description": "A full-body cardio and core movement, improving coordination, endurance, and shoulder stability.",
    "instructions": [
      "Begin in a high plank position.",
      "Drive one knee toward your chest, then switch rapidly as if running horizontally.",
      "Keep hips low and back flat, moving legs in a fast, controlled rhythm."
    ],
    "img": "https://i.pinimg.com/originals/fb/fa/09/fbfa0902f381a5735972c21255935aff.gif"
  },
  "Shoulder and Hip Mobility Flows": {
    "title": "Shoulder and Hip Mobility Flows",
    "description": "A sequence of active stretches to increase joint range of motion and prepare the body for intense movement.",
    "instructions": [
      "Flow through controlled movements such as arm circles, shoulder dislocates (with towel), hip circles, 90/90 switches, world's greatest stretch, and cat-cow.",
      "Focus on slow, deliberate motion and breathwork for best results."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/08/hip-circle.gif"
  },
  "V-Ups": {
    "title": "V-Ups",
    "description": "A dynamic core move targeting the upper and lower abs simultaneously.",
    "instructions": [
      "Lie flat, arms overhead. In one motion, lift your torso and legs to meet in a 'V' shape. Reach hands toward toes. Lower back down with control. Keep movements sharp, not rushed"
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/v-sit-ups.gif"
  },
  "Side Plank": {
    "title": "Side Plank",
    "description": "A powerful isometric core drill targeting obliques, glute medius, and shoulder stabilizers.",
    "instructions": [
      "Lie on one side, forearm on floor under shoulder.",
      "Lift hips off ground, forming a straight line from head to feet.",
      "Hold.",
      "Switch sides. Keep hips lifted and neck aligned."
    ],
    "img": "https://www.inspireusafoundation.org/wp-content/uploads/2023/10/side-plank-muscles.gif"
  },
 "Triceps Dips on Chair":{
    "title": "Triceps Dips on Chair",
    "description": "An effective bodyweight exercise for building triceps strength and endurance, also engaging the shoulders and chest. Perform 3 sets of 8 repetitions.",
    "instructions": [
      "Position a sturdy chair behind you. Sit on the edge with your hands gripping the front of the seat, fingers pointing forward.",
      "Slide your glutes off the chair, extending your legs in front of you. You can keep your knees bent for an easier variation or straighten them for more challenge.",
      "Lower your body by bending your elbows until your upper arms are parallel to the floor, or slightly below.",
      "Push back up to the starting position by engaging your triceps.",
      "Repeat for the desired number of repetitions."
    ],
    "img": "https://post.healthline.com/wp-content/uploads/2019/05/Chair-dip-for-beginners.gif"
  }
};

// Utility function to format date to "yyyy-MM-dd"
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Extract "yyyy-MM-dd"
};

const normalizeUserPref = (userPref) => {
  let split = userPref.split || (userPref.days ? userPref.days.split(' ')[0] : undefined) || "2x";
  if (split.includes('x')) split = split.split('x')[0] + 'x';
  split = split.replace(/\s/g, '');
  let program;
  if (userPref.level === "Beginner" && userPref.place === "Home") program = "Beginner (Home)";
  else if (userPref.level === "Beginner" && userPref.place === "Gym") program = "Beginner";
  else if (userPref.level === "Advanced" && userPref.place === "Home") program = "Advanced (Home)";
  else if (userPref.level === "Advanced" && userPref.place === "Gym") program = "Advanced (Gym)";
  else program = userPref.program || userPref.level || "Beginner (Home)";
  return {
    ...userPref,
    split,
    program
  };
};

const ExerciseInfo = () => {
  const getCurrentUsername = () => {
    // Try to get from "user" object, then "username", then fallback
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.username) {
      console.log("[ExerciseInfo] Username from user object:", user.username);
      return user.username;
    }
    const legacy = localStorage.getItem("username");
    console.log("[ExerciseInfo] Username from localStorage key 'username':", legacy);
    if (legacy) return legacy;
    console.warn("[ExerciseInfo] No username found in localStorage. Using 'defaultUser'. This may cause shared state across users.");
    return "defaultUser";
  };

  const [username, setUsername] = useState(getCurrentUsername());
  const [userPref, setUserPref] = useState(() => {
    let up = JSON.parse(localStorage.getItem("userPref") || "{}")
    // Option 3: fallback
    return {
      program: up.program || (up.level && up.place ? `${up.level} (${up.place})` : up.level) || "Beginner (Home)",
      split: up.split || (up.days ? up.days.split(' ')[0] : undefined) || "2x",
      day: up.day || 1,
      ...up
    };
  });
  const [exercises, setExercises] = useState([]);
  const [daysCompleted, setDaysCompleted] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(getCurrentUsername());
      const updatedUserPref = JSON.parse(localStorage.getItem("userPref") || "{}");
      setUserPref(updatedUserPref);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const chosenProgram = userPref.program;
    const split = userPref.split;
    const currentDay = userPref.day;

    if (!chosenProgram || !split || !currentDay) {
      setExercises([]);
      return;
    }

    // Debug: log raw userPref
    console.log('[ExerciseInfo] Raw userPref:', userPref);
    // Normalize userPref
    const normalizedPref = normalizeUserPref(userPref);
    console.log('[ExerciseInfo] Normalized userPref:', normalizedPref);
    // Use the shared helper to get the plan array
    const planArr = getPlanByUserPref(normalizedPref);
    console.log('[ExerciseInfo] planArr:', planArr);
    const normalizedDay = typeof currentDay === "number" ? currentDay : Number(currentDay);
    const dayObj = planArr ? planArr.find(d => d.day === normalizedDay) : null;
    setExercises(dayObj ? dayObj.exercises : []);
  }, [userPref]);

  // Add a check for missing userPref
  if (!userPref.program || !userPref.split || !userPref.day) {
    return (
      <div style={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999, // Ensure on top of everything
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(34,51,102,0.95)", // More opaque for clarity
        color: "#fff",
        fontSize: "2rem"
      }}>
        Please set up your workout program in your account or goal settings.
      </div>
    );
  }

  // --- Fix: Always use string for split and number for day ---
  const normalizedSplit = typeof userPref.split === "string" ? userPref.split : String(userPref.split);
  const normalizedDay = typeof userPref.day === "number" ? userPref.day : Number(userPref.day);

  // Unique key for saving done state for this user/program/split/day
  const doneKey = `exerciseDone_${username}_${userPref.program}_${normalizedSplit}_Day${normalizedDay}`;

  const [expanded, setExpanded] = useState(null); // Track which exercise is expanded
  const [done, setDone] = useState(() => {
    // Restore done state from localStorage if available
    try {
      const saved = localStorage.getItem(doneKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  // Save done state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(doneKey, JSON.stringify(done));
  }, [doneKey, done]);

  // Restore done state if user/program/split/day changes (e.g., after refresh or navigation)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(doneKey);
      setDone(saved ? JSON.parse(saved) : {});
    } catch {
      setDone({});
    }
  }, [doneKey]);

  // Fetch progress from backend
  const fetchProgress = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_BASE_URL}/user/userprogresses/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          console.error("Progress fetch failed:", res.status, text);
          throw new Error(text);
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched progress data:", data);
        setDaysCompleted(data.daysCompleted);
      })
      .catch((err) => {
        console.error("Error fetching progress:", err);
        setDaysCompleted(null);
      });
  };

  // Effect to handle workout completion
  useEffect(() => {
    if (exercises.length === 0) return;
    const allDone = exercises.every(ex => done[ex.key]);
    // Get today's formatted date ("yyyy-MM-dd")
    const currentDate = formatDate(new Date());
    const lastRecordedDayKey = `lastRecordedDay_${username}`;
    
    // Only update if all are done and today's date is not yet recorded
    if (allDone && localStorage.getItem(lastRecordedDayKey) !== currentDate) {
      const currentDaysFinished = parseInt(localStorage.getItem(`daysFinished_${username}`) || "0", 10);
      localStorage.setItem(`daysFinished_${username}`, (currentDaysFinished + 1).toString());
      localStorage.setItem(lastRecordedDayKey, currentDate);

      const workoutDoneKey = `workoutDone_${username}_Day${normalizedDay}`;
      localStorage.setItem(workoutDoneKey, "true");

      const token = localStorage.getItem("token");
      fetch(`${API_BASE_URL}/user/userprogresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ 
          date: currentDate,
          dayNumber: normalizedDay // Send the current day number
        })
      })
      .then(() => fetchProgress())
      .catch((err) => {
        console.error("Failed to increment user progress:", err);
      });

      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
        navigate('/goal-setting');
      }, 2000);
    } else {
      localStorage.removeItem("workoutDone");
    }
  }, [done, exercises, username, navigate]);
  
  // Optionally, fetch progress on mount
  useEffect(() => {
    fetchProgress();
  }, []);

  const handleContainerClick = (exerciseKey) => {
    setExpanded(expanded === exerciseKey ? null : exerciseKey);
  };

  // New function to record exercise progress to backend
  const recordExerciseProgress = async (currentDay, exerciseStatuses) => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${API_BASE_URL}/user/userprogresses/exercise-progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ currentDay, exerciseStatuses })
        });
        if (!res.ok) throw new Error((await res.json()).errorMessage);
        const data = await res.json();
        console.log("Exercise progress updated on backend:", data.progress);
    } catch (err) {
        console.error("Error updating exercise progress on backend:", err);
    }
};

  return (
    <div
      className="exercise-info-container"
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw", // Make container full viewport width
        maxWidth: "100vw",
        background: "linear-gradient(rgba(34,51,102,0.7),rgba(34,51,102,0.7))",
        overflowX: "hidden" // Prevent horizontal scroll
      }}
    >
      {/* Top bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 32px 0 32px"
      }}>
        <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.3rem" }}>
          Welcome to <span style={{ color: "#4fd1c5" }}>FitnessPro</span>
        </span>
      </div>
      {/* Back button at the top left of the page */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 24,
          right: 24, // <-- move to right
          background: "transparent",
          border: "none",
          fontSize: "2.5rem",
          cursor: "pointer",
          color: "orange", // <-- change color to orange
          zIndex: 20
        }}
        aria-label="Back"
      >&#x21A9;</button>
      {/* Show congrats message overlay */}
      {showCongrats && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "48px 64px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
              fontSize: "2rem",
              color: "#38a169",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            🎉 Congratulations! <br />You have completed your workout!
          </div>
        </div>
      )}
      <h2 style={{fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginTop: "30px", color: "#fff", letterSpacing: "2px"}}>
        Today's Workout - Day {normalizedDay}
      </h2>
      <div style={{
        width: "100%",
        maxWidth: "1600px", // Increase maxWidth for bars
        margin: "40px auto 0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center" // <-- Center children horizontally
      }}>
        {exercises.map(ex => (
          <div key={ex.key} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#bdbdbd",
                borderRadius: "40px",
                padding: "18px 32px",
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#223366",
                gap: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                cursor: "pointer",
                opacity: done[ex.key] ? 0.5 : 1,
                transition: "opacity 0.3s",
                width: "100%" // Make bar fill the container width
              }}
              onClick={() => handleContainerClick(ex.key)}
            >
              <span>{ex.label}</span>
              {done[ex.key] && (
                <span style={{ marginLeft: 12, color: "#38a169", fontWeight: 600, fontSize: "1.1rem" }}>
                  (Done)
                </span>
              )}
            </div>
            {expanded === ex.key && exerciseDetails[ex.key] && (
              <div
                className="exercise-popup-container"
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  padding: "32px 24px",
                  margin: "18px 0 0 0",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "left",
                  maxWidth: "800px",
                  width: "100%",
                  position: "relative",
                  left: "25%", 
                  transform: "translateX(-50%)"
                }}
              >
                <h3 style={{marginBottom: "16px", color: "#223366", fontSize: "2rem"}}>{exerciseDetails[ex.key].title}</h3>
                <div style={{ display: "flex", gap: "24px", width: "100%", justifyContent: "center", alignItems: "flex-start", marginBottom: "24px" }}>
                  <img
                    src={exerciseDetails[ex.key].img}
                    alt={exerciseDetails[ex.key].title}
                    style={{
                      width: "auto",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
                  
                </div>
                <p style={{fontSize: "1.2rem", color: "#222", textAlign: "center"}}>{exerciseDetails[ex.key].description}</p>
                {exerciseDetails[ex.key].instructions && (
                  <div style={{marginTop: "16px", width: "100%"}}>
                    <strong>Instructions:</strong>
                    <ol style={{marginTop: "8px", fontSize: "1.1rem", color: "#222", textAlign: "left"}}>
                      {exerciseDetails[ex.key].instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                <button
                  onClick={() => {
                    setDone(prev => {
                      const updated = { ...prev, [ex.key]: true };
                      // Save immediately to localStorage for persistence
                      localStorage.setItem(doneKey, JSON.stringify(updated));
                      return updated;
                    });
                    setExpanded(null);
                  }}
                  style={{
                    marginTop: "24px",
                    padding: "12px 32px",
                    fontSize: "1.1rem",
                    borderRadius: "8px",
                    background: done[ex.key] ? "#ccc" : "#38a169",
                    color: "white",
                    border: "none",
                    fontWeight: "bold",
                    cursor: done[ex.key] ? "not-allowed" : "pointer"
                  }}
                  disabled={done[ex.key]} // Only disable if already done
                >
                  {done[ex.key] ? "Workout Done" : "Mark as Done"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ color: "#fff", textAlign: "center", marginTop: 10 }}>
        {daysCompleted !== null && (
          <span>
            <b>Workout Days Completed:</b> {daysCompleted}
          </span>
        )}
      </div>
    </div>
  );
};

export default ExerciseInfo;