import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";


const exercises = [
  { label: "Ab Wheel Rollouts", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Ab%20Wheel%20Rollouts.jpg?updatedAt=1747420374327", route: "/exercise/ab-wheel-rollouts" },
  { label: "Archer Push-ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Archer%20Push-ups.jpg?updatedAt=1747420370031", route: "https://www.youtube.com/results?search_query=Archer+Push-ups" },
  { label: "Arnold Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Arnold%20Press.jpg?updatedAt=1747420370362", route: "https://www.youtube.com/results?search_query=Arnold+Press" },
  { label: "Backpack Bear Crawls", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Bear%20Crawls.jpg?updatedAt=1747420371393", route: "https://www.youtube.com/results?search_query=Backpack+Bear+Crawls" },
  { label: "Backpack Bent-Over Rows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Bent-Over%20Rows.jpg?updatedAt=1747420373999", route: "https://www.youtube.com/results?search_query=Backpack+Bent-Over+Rows" },
  { label: "Backpack Curls", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Curls.jpg?updatedAt=1747420369726", route: "https://www.youtube.com/results?search_query=Backpack+Curls" },
  { label: "Backpack Deadlifts", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Deadlifts.jpg?updatedAt=1747420371157", route: "https://www.youtube.com/results?search_query=Backpack+Deadlifts" },
  { label: "Backpack Overhead Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Overhead%20Press.jpg?updatedAt=1747420369915", route: "https://www.youtube.com/results?search_query=Backpack+Overhead+Press" },
  { label: "Backpack Romanian Deadlifts", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Deadlifts.jpg?updatedAt=1747420371157", route: "https://www.youtube.com/results?search_query=Backpack+Romanian+Deadlifts" },
  { label: "Backpack Rows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Rows.jpg?updatedAt=1747420371346", route: "https://www.youtube.com/results?search_query=Backpack+Rows" },
  { label: "Backpack Shoulder Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Shoulder%20Press.jpg?updatedAt=1747420376314", route: "https://www.youtube.com/results?search_query=Backpack+Shoulder+Press" },
  { label: "Backpack Squats", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Squats.jpg?updatedAt=1747420376127", route: "https://www.youtube.com/results?search_query=Backpack+Squats" },
  { label: "Backpack Thrusters", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Backpack%20Thrusters.jpg?updatedAt=1747420377379", route: "https://www.youtube.com/results?search_query=Backpack+Thrusters" },
  { label: "Barbell Back Squat", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Barbell%20Back%20Squat.jpg?updatedAt=1747420376484", route: "https://www.youtube.com/results?search_query=Barbell+Back+Squat" },
  { label: "Barbell Bench Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Barbell%20Bench%20Press.jpg?updatedAt=1747420377259", route: "https://www.youtube.com/results?search_query=Barbell+Bench+Press" },
  { label: "Barbell Curl", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Barbell%20Curl.jpg?updatedAt=1747420377229", route: "https://www.youtube.com/results?search_query=Barbell+Curl" },
  { label: "Bench Dips", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bench%20Dips.jpg?updatedAt=1747420377672", route: "https://www.youtube.com/results?search_query=Bench+Dips" },
  { label: "Bent Over Rows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bent%20Over%20Rows.jpg?updatedAt=1747420379496", route: "https://www.youtube.com/results?search_query=Bent+Over+Rows" },
  { label: "Bent-over Barbell Row", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bent-over%20Barbell%20Row.jpg?updatedAt=1747420379477", route: "https://www.youtube.com/results?search_query=Bent-over+Barbell+Row" },
  { label: "Bicep Curls", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bicep%20Curls.jpg?updatedAt=1747420379970", route: "https://www.youtube.com/results?search_query=Bicep+Curls" },
  { label: "Bicycle Crunches", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bicycle%20Crunches.jpg?updatedAt=1747420380958", route: "https://www.youtube.com/results?search_query=Bicycle+Crunches" },
  { label: "Bodyweight Calf Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bodyweight%20Calf%20Raises_Elevated%20Calf%20Raises.jpg?updatedAt=1747420380356", route: "https://www.youtube.com/results?search_query=Bodyweight+Calf+Raises+Elevated+Calf+Raises" },
  { label: "Bodyweight Good Mornings", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bodyweight%20Good%20Mornings.jpg?updatedAt=1747420381793", route: "https://www.youtube.com/results?search_query=Bodyweight+Good+Mornings" },
  { label: "Bulgarian Split Squats", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Bulgarian%20Split%20Squats.jpg?updatedAt=1747420381901", route: "https://www.youtube.com/results?search_query=Bulgarian+Split+Squats" },
  { label: "Burpees", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Burpees.jpg?updatedAt=1747420381398", route: "https://www.youtube.com/results?search_query=Burpees" },
  { label: "Cable Flys", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Cable%20Flys.jpg?updatedAt=1747420382458", route: "https://www.youtube.com/results?search_query=Cable+Flys" },
  { label: "Cable Lateral Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Cable%20Lateral%20Raises.jpg?updatedAt=1747420382961", route: "https://www.youtube.com/results?search_query=Cable+Lateral+Raises" },
  { label: "Cable Rows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Cable%20Rows.jpg?updatedAt=1747420384595", route: "https://www.youtube.com/results?search_query=Cable+Rows" },
  { label: "Chair Dips", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Chair%20Dips.jpg?updatedAt=1747420385457", route: "https://www.youtube.com/results?search_query=Chair+Dips" },
  { label: "Chest Fly", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Chest%20Fly.jpg?updatedAt=1747420383997g", route: "https://www.youtube.com/results?search_query=Chest+Fly" },
  { label: "Deadlift", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Deadlift.jpg?updatedAt=1747420385463", route: "https://www.youtube.com/results?search_query=Deadlift" },
  { label: "Deep Squat Hold", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Deep%20Squat%20Hold.jpg?updatedAt=1747420385665", route: "https://www.youtube.com/results?search_query=Deep+Squat+Hold" },
  { label: "Diamond Push-ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Diamond%20Push-ups.jpg?updatedAt=1747420386800", route: "https://www.youtube.com/results?search_query=Diamond+Push-ups" },
  { label: "Doorway Rows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Doorway%20Rows.jpg?updatedAt=1747420389411", route: "https://www.youtube.com/results?search_query=Doorway+Rows" },
  { label: "Dumbbell Bench Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Dumbbell%20Bench%20Press_Dumbbell%20Chest%20Press.jpg?updatedAt=1747420389404", route: "https://www.youtube.com/results?search_query=Dumbbell+Bench+Press+Dumbbell+Chest+Press" },
  { label: "Dumbbell Deadlifts", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Dumbbell%20Deadlifts.jpg?updatedAt=1747420388065", route: "https://www.youtube.com/results?search_query=Dumbbell+Deadlifts" },
  { label: "Dumbbell Lateral Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Dumbbell%20Lateral%20Raises.jpg?updatedAt=1747420388588", route: "https://www.youtube.com/results?search_query=Dumbbell+Lateral+Raises" },
  { label: "Dumbbell Row", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Dumbbell%20Row.jpg?updatedAt=1747420389378", route: "https://www.youtube.com/results?search_query=Dumbbell+Row" },
  { label: "Dumbbell Shoulder Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Dumbbell%20Shoulder%20Press.jpg?updatedAt=1747420389571", route: "https://www.youtube.com/results?search_query=Dumbbell+Shoulder+Press" },
  { label: "Elevated Feet Push-ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Elevated%20Feet%20Push-ups.jpg?updatedAt=1747420389012", route: "https://www.youtube.com/results?search_query=Elevated+Feet+Push-ups" },
  { label: "Face Pulls", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Face%20Pulls.jpg?updatedAt=1747420390212g", route: "https://www.youtube.com/results?search_query=Face+Pulls" },
  { label: "Floor Chest Fly with Bottles", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Floor%20Chest%20Fly%20with%20Bottles.jpg?updatedAt=1747420390181", route: "https://www.youtube.com/results?search_query=Floor+Chest+Fly+with+Bottles" },
  { label: "Floor Press with Backpack", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Floor%20Press%20with%20Backpack.jpg?updatedAt=1747420393026", route: "https://www.youtube.com/results?search_query=Floor+Press+with+Backpack+or+water+bottle" },
  { label: "Front Squats", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Front%20Squats.jpg?updatedAt=1747420392683", route: "https://www.youtube.com/results?search_query=Front+Squats" },
  { label: "Glute Bridge Walkouts", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Glute%20Bridge%20Walkouts.jpg?updatedAt=1747420393161", route: "https://www.youtube.com/results?search_query=Glute+Bridge+Walkouts" },
  { label: "Goblet Squats", img: "https://i.imgur.com/WvEdgrW.png", route: "https://www.youtube.com/results?search_query=Goblet+Squats" },
  { label: "Hammer Curls", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Hammer%20Curls.jpg?updatedAt=1747420393789", route: "https://www.youtube.com/results?search_query=Hammer+Curls" },
  { label: "Hamstring Curl", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Hamstring%20Curl.jpg?updatedAt=1747420394016", route: "https://www.youtube.com/results?search_query=Hamstring+Curl" },
  { label: "Hanging Leg Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Hanging%20Leg%20Raises.jpg?updatedAt=1747420394819", route: "https://www.youtube.com/results?search_query=Hanging+Leg+Raises" },
  { label: "High Knees", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/High%20Knees.jpg?updatedAt=1747420394820", route: "https://www.youtube.com/results?search_query=High+Knees" },
  { label: "Hip Hinge with No Weights", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Hip%20Hinge%20with%20No%20Weights.jpg?updatedAt=1747420395570", route: "https://www.youtube.com/results?search_query=Hip+Hinge+with+No+Weights" },
  { label: "Hollow Body Hold", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Hollow%20Body%20Hold.jpg?updatedAt=1747420395618", route: "https://www.youtube.com/results?search_query=Hollow+Body+Hold" },
  { label: "Incline Bench Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Incline%20Bench%20Press.jpg?updatedAt=1747420395952", route: "https://www.youtube.com/results?search_query=Incline+Bench+Press" },
  { label: "Incline Dumbbell Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Incline%20Dumbbell%20Press.jpg?updatedAt=1747420396938", route: "https://www.youtube.com/results?search_query=Incline+Dumbbell+Press" },
  { label: "Incline Push-Ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Incline%20Push-Ups.jpg?updatedAt=1747420398434", route: "https://www.youtube.com/results?search_query=Incline+Push-Ups" },
  { label: "Incline Shoulder Taps", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Incline%20Shoulder%20Taps.jpg?updatedAt=1747420398122", route: "https://www.youtube.com/results?search_query=Incline+Shoulder+Taps" },
  { label: "Inverted Rows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Inverted%20Rows.jpg?updatedAt=1747420398253", route: "https://www.youtube.com/results?search_query=Inverted+Rows" },
  { label: "Jog", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Jog.jpg?updatedAt=1747420399070", route: "https://www.youtube.com/results?search_query=Jog" },
  { label: "Jump Squats", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Jump%20Squats.jpg?updatedAt=1747420399500", route: "https://www.youtube.com/results?search_query=Jump+Squats" },
  { label: "Kettlebell Deadlift", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/kettlebell%20deadlift.jpg?updatedAt=1747420399689", route: "https://www.youtube.com/results?search_query=Kettlebell+Deadlift" },
  { label: "Knee Push-Ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Knee%20Push-Ups.jpg?updatedAt=1747420399865", route: "https://www.youtube.com/results?search_query=Knee+Push-Ups" },
  { label: "Lat Pulldown", img: "https://th.bing.com/th/id/OIP.MXfG1T_5-lSYM3XnJDUMbgHaHa?rs=1&pid=ImgDetMain", route: "https://www.youtube.com/results?search_query=Lat+Pulldown" },
  { label: "Leg Curl Machine", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Leg%20Curl%20Machine.jpg?updatedAt=1747420400392", route: "https://www.youtube.com/results?search_query=Leg+Curl+Machine" },
  { label: "Leg Curls", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Leg%20Curls.jpg?updatedAt=1747420400978", route: "https://www.youtube.com/results?search_query=Leg+Curls" },
  { label: "Leg Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Leg%20Press.jpg?updatedAt=1747420401393", route: "https://www.youtube.com/results?search_query=Leg+Press" },
  { label: "Leg Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Leg%20Raises.jpg?updatedAt=1747420403482", route: "https://www.youtube.com/results?search_query=Leg+Raises" },
  { label: "March in Place", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/March%20in%20Place.jpg?updatedAt=1747420402721", route: "https://www.youtube.com/results?search_query=March+in+Place" },
  { label: "Mountain Climbers", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Mountain%20Climbers.jpg?updatedAt=1747420403512", route: "https://www.youtube.com/results?search_query=Mountain+Climbers" },
  { label: "One-Arm Dumbbell Row (light)", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Tricep%20Kickbacks_One-Arm%20Dumbbell%20Row%20(light).jpg?updatedAt=1747420420180", route: "https://www.youtube.com/results?search_query=Tricep+Kickbacks+One-Arm+Dumbbell+Row+light" },
  { label: "Overhead Dumbbell Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Overhead%20Dumbbell%20Press.jpg?updatedAt=1747420404559", route: "https://www.youtube.com/results?search_query=Overhead+Dumbbell+Press" },
  { label: "Overhead Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Overhead%20Press.jpg?updatedAt=1747420404643", route: "https://www.youtube.com/results?search_query=Overhead+Press" },
  { label: "Overhead Tricep Extension", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Overhead%20Tricep%20Extension.jpg?updatedAt=1747420405057", route: "https://www.youtube.com/results?search_query=Overhead+Tricep+Extension" },
  { label: "Pike Push-ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Pike%20Push-ups.jpg?updatedAt=1747420405223", route: "https://www.youtube.com/results?search_query=Pike+Push-ups" },
  { label: "Pistol Squats", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Pistol%20Squats.jpg?updatedAt=1747420405666", route: "https://www.youtube.com/results?search_query=Pistol+Squats" },
  { label: "Plank", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Plank.jpg?updatedAt=1747420405541", route: "https://www.youtube.com/results?search_query=Plank" },
  { label: "Prone Y Raise", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Prone%20Y%20Raise.jpg?updatedAt=1747420406271", route: "https://www.youtube.com/results?search_query=Prone+Y+Raise" },
  { label: "Pull-ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Pull-ups.jpg?updatedAt=1747420409834", route: "https://www.youtube.com/results?search_query=Pull-ups" },
  { label: "Push Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Push%20Press.jpg?updatedAt=1747420409469", route: "https://www.youtube.com/results?search_query=Push+Press" },
  { label: "Push-Ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Push%20Ups.jpg?updatedAt=1747420410356", route: "https://www.youtube.com/results?search_query=Push+Ups" },
  { label: "Resistance Band Row", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Resistance%20Band.jpg?updatedAt=1747420410309", route: "https://www.youtube.com/results?search_query=Resistance+Band+Row" },
  { label: "Reverse Flys", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Reverse%20Flys.jpg?updatedAt=1747420409937", route: "https://www.youtube.com/results?search_query=Reverse+Flys" },
  { label: "Romanian Deadlift", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Romanian%20Deadlift_Barbell%20Rows.jpg?updatedAt=1747420410642", route: "https://www.youtube.com/results?search_query=Romanian+Deadlift+Barbell+Rows" },
  { label: "Russian Twists", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Russian%20Twists.jpg?updatedAt=1747420411058", route: "https://www.youtube.com/results?search_query=Russian+Twists" },
  { label: "Seated Cable Row", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Seated%20Cable%20Row.jpg?updatedAt=1747420411798", route: "https://www.youtube.com/results?search_query=Seated+Cable+Row" },
  { label: "Seated Dumbbell Shoulder Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Seated%20Dumbbell%20Shoulder%20Press.jpg?updatedAt=1747420412511", route: "https://www.youtube.com/results?search_query=Seated+Dumbbell+Shoulder+Press" },
  { label: "Seated Rear Delt Raises (bent over)", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Seated%20Rear%20Delt%20Raises%20(bent%20over).jpg?updatedAt=1747420411370", route: "https://www.youtube.com/results?search_query=Seated+Rear+Delt+Raises+bent+over" },
  { label: "Shoulder and Hip Mobility Flows", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Shoulder%20and%20Hip%20Mobility%20Flows.jpg?updatedAt=1747420415156", route: "https://www.youtube.com/results?search_query=Shoulder+and+Hip+Mobility+Flows" },
  { label: "Side Plank", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Side%20Plank.jpg?updatedAt=1747420415972", route: "https://www.youtube.com/results?search_query=Side+Plank" },
  { label: "Single-Leg Calf Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Single-leg%20Calf%20Raises.jpg?updatedAt=1747420415498", route: "https://www.youtube.com/results?search_query=Single-Leg+Calf+Raises" },
  { label: "Skull Crushers", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Skull%20Crushers.jpg?updatedAt=1747420416052", route: "https://www.youtube.com/results?search_query=Skull+Crushers" },
  { label: "Sled Push", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Sled%20Push.jpg?updatedAt=1747420416760", route: "https://www.youtube.com/results?search_query=Sled+Push" },
  { label: "Squat", img: "https://i.imgur.com/LI8jqse.png", route: "https://www.youtube.com/results?search_query=Squat" },
  { label: "Standing Calf Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Standing%20Calf%20Raises.jpg?updatedAt=1747420416516", route: "https://www.youtube.com/results?search_query=Standing+Calf+Raises" },
  { label: "Step-Ups", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Step-Ups.jpg?updatedAt=1747420416741", route: "https://www.youtube.com/results?search_query=Step-Ups" },
  { label: "Superman Hold", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Superman%20Hold.jpg?updatedAt=1747420417027", route: "https://www.youtube.com/results?search_query=Superman+Hold" },
  { label: "T-Bar Row", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/T-Bar%20Row.jpg?updatedAt=1747420416489", route: "https://www.youtube.com/results?search_query=T-Bar+Row" },
  { label: "Towel Bicep Curl Isometrics", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Towel%20Bicep%20Curl%20Isometrics.jpg?updatedAt=1747420419069", route: "https://www.youtube.com/results?search_query=Tower+Bicep+Curl+Isometrics" },
  { label: "Towel Row", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Towel%20Row.jpg?updatedAt=1747420420461", route: "https://www.youtube.com/results?search_query=Towel+Row" },
  { label: "Tricep Dips on Chair", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Triceps%20Dips%20on%20Chair.jpg?updatedAt=1747420421109", route: "https://www.youtube.com/results?search_query=Tricep+Dips+on+Chair" },
  { label: "Tricep Rope Pushdown", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Tricep%20Rope%20Pushdown.jpg?updatedAt=1747420420889", route: "https://www.youtube.com/results?search_query=Tricep+Rope+Pushdown" },
  { label: "Treadmill", img: "https://i.imgur.com/RZPESQR.png", route: "https://www.youtube.com/results?search_query=Treadmill" },
  { label: "V-Ups", img: "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/v-sit-ups.gif", route: "https://www.youtube.com/results?search_query=V-Ups" },
  { label: "Walking Lunges", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Walking%20Lunges_Lunges.jpg?updatedAt=1747420421571", route: "https://www.youtube.com/results?search_query=Walking+Lunges+Lunges" },
  { label: "Wall Shoulder Taps", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Wall%20Shoulder%20Taps.jpg?updatedAt=1747420421700", route: "https://www.youtube.com/results?search_query=Wall+Shoulder+Taps" },
  { label: "Wall Sit", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Wall%20Sit.jpg?updatedAt=1747420421588", route: "https://www.youtube.com/results?search_query=Wall+Sit" },
  { label: "Wall Walks", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Wall%20Walks.jpg?updatedAt=1747420422032", route: "https://www.youtube.com/results?search_query=Wall+Walks" },
  { label: "Water Bottle Lateral Raises", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Water%20Bottle%20Lateral%20Raises.jpg?updatedAt=1747420423647", route: "https://www.youtube.com/results?search_query=Water+Bottle+Lateral+Raises" },
  { label: "Water Bottle Press", img: "https://ik.imagekit.io/rf6d3qxw0/Pictures%20of%20Exercise/Water%20Bottle%20Press.jpg?updatedAt=1747420425956", route: "https://www.youtube.com/results?search_query=Water+Bottle+Press" }
];


const exerciseDetails = {
  "Ab Wheel Rollouts": {
  gif: "https://fitnessprogramer.com/wp-content/uploads/2021/06/Ab-Wheel-Rollout.gif",
  description: "Advanced core move that trains deep stabilizers.",
  instructions: ["Kneel, roll wheel forward while keeping abs tight, then roll back."],
  
  },
  "Arnold Press": {
    gif: "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/arnold-presses.gif",
    description: "Shoulder press variation for full delt activation. That focuses on shoulders and triceps.",
    instructions: ["Rotate dumbbells from front of shoulders to overhead press."]
  },
  "Backpack Bear Crawls": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/bear-crawl-movement.gif",
    description: "Backpack bear crawls are a dynamic full-body exercise that targets the shoulders, core, and legs. Adding a backpack with weight increases the challenge, making this move more effective for building strength and endurance.",
    instructions: ["Fill a backpack with weight and wear it on your back.",
      "Start on all fours, with your hands and feet on the ground, hips lifted, and your body in a \"tabletop\" position.",
      "Crawl forward by moving your right hand and left foot at the same time, then your left hand and right foot.",
      "Keep your core engaged and back flat as you crawl, avoiding sagging in the hips.",
      "Continue crawling for a set distance or time, then reverse the motion to crawl backward."
    ]
  },

  "Backpack Deadlifts": {
    gif:"https://evofitness.at/wp-content/uploads/2025/05/00.gif",
    description: "Backpack deadlifts are a beginner-friendly, home alternative to traditional deadlifts. They target the glutes, hamstrings, and lower back using a weighted backpack for resistance.",
    instructions: [
      "Fill a backpack with books or other weights and place it in front of you on the floor.",
      "Stand with feet hip-width apart, bend your knees slightly, and hinge at your hips.",
      "Grab the backpack handles or sides with both hands.",
      "Keep your back flat and chest up as you lift the backpack by driving through your heels.",
      "Stand tall, squeeze your glutes at the top, then lower the backpack back down with control."
    ]
  },
  "Backpack Overhead Press": {
    gif:"https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/SQUAT-SHOULDERPRESS.gif",
    description: "The backpack overhead press is a simple and effective exercise that targets the shoulders, triceps, and upper chest using a weighted backpack. It's an excellent option for home workouts with minimal equipment.",
    instructions: [
      "Fill a backpack with books or other heavy items and hold the straps or top of the bag with both hands.",
      "Stand with your feet shoulder-width apart and the backpack at chest level.",
      "Press the backpack overhead, extending your arms fully.",
      "Pause briefly at the top, then lower the backpack back down to chest level with control.",
      "Keep your core engaged and avoid arching your lower back."
    ]
  },
  "Backpack Romanian Deadlifts": {
    gif:"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzByemcwdnp4ZGRlODB6eW9iZmZrcXJpZndjM3p3NHh3OTU0M293NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pnTrSbX8w3gpxUcaRN/giphy.gif",
    description: "Backpack Romanian Deadlifts (RDLs) focus on the hamstrings, glutes, and lower back. This variation uses a weighted backpack and emphasizes hip hinging with minimal knee bend, making it ideal for building posterior chain strength at home.",
    instructions: [
      "Hold a weighted backpack in front of your thighs with both hands.",
      "Stand with feet hip-width apart, knees slightly bent.",
      "Hinge at your hips, lowering the backpack down your legs while keeping your back flat.",
      "Lower until you feel a stretch in your hamstrings—don't round your back.",
      "Drive through your hips to return to standing, squeezing your glutes at the top."
    ]
  },
  "Backpack Rows": {
    gif:"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJhMzV0cDhtZzJycjNscWdvcW1vcGhuYmluM2h6cmY3M2lhZ2p5cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/23Ue0WMUzmwZj4Dhra/giphy.gif",
    description: "Backpack rows are a great exercise to target your upper back, particularly the lats, rhomboids, and traps, using a backpack as resistance. It's a simple, effective movement you can do at home.",
    instructions: [
      "Fill a backpack with books or other heavy objects and hold it by the top handles with both hands.",
      "Stand with your feet hip-width apart and knees slightly bent.",
      "Hinge at your hips, keeping your back flat and chest up, so that your torso is angled forward.",
      "Pull the backpack towards your torso by bending your elbows, squeezing your shoulder blades together at the top.",
      "Slowly lower the backpack back to the starting position, maintaining control and avoiding jerking motions.",
      "Repeat for the desired number of reps, keeping your core tight throughout."
    ]
  },
  "Backpack Shoulder Press": {
    gif:"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJkYzVhOXVzOGpzdmJ0cndvbTQ2MnQzam1lOXFxdDVreWxnN2pvdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pwx4cma10kIp2xWFNM/giphy.gif",
    description: "The backpack shoulder press is a simple and effective exercise for strengthening the shoulders, triceps, and upper chest. Using a backpack for resistance, it's a great at-home alternative to traditional dumbbell or barbell presses.",
    instructions: [
      "Fill a backpack with books or other heavy items and hold the top of the backpack with both hands, keeping it at chest level.",
      "Stand with feet shoulder-width apart, keeping your core engaged and your back straight.",
      "Press the backpack overhead, fully extending your arms.",
      "Pause at the top, then slowly lower the backpack back to chest level with control.",
      "Repeat for the desired number of reps, focusing on maintaining good posture and avoiding arching your back."
    ]
  },
  "Backpack Squats": {
    gif:"https://blog.goruck.com/wp-content/uploads/2020/04/SQUAT.gif",
    description: "Backpack squats are a simple and effective weighted squat variation using a loaded backpack. They target the quads, glutes, hamstrings, and core—ideal for home workouts.",
    instructions: [
      "Fill a backpack with books or other weights and wear it on your back like a normal school bag.",
      "Stand with feet shoulder-width apart, toes slightly out.",
      "Keep your chest up and core tight.",
      "Bend your knees and push your hips back to squat down.",
      "Lower until thighs are parallel to the floor (or as far as comfortable), then drive through your heels to stand."
    ]
  },
  "Barbell Back Squat": {
    gif:"https://c.tenor.com/pdMmsiutWkcAAAAd/tenor.gif",
    description: "A strength move that builds lower body and core stability. That focuses on quads, glutes, and core.",
    instructions: [
      "Stand with barbell on upper back, feet shoulder-width apart. Squat down, then rise back up. Keep chest upright."
    ]
  },
  "Barbell Bench Press": {
    gif:"https://c.tenor.com/UxJvu3Zw8ewAAAAd/tenor.gif",
    description: "A classic upper-body lift that increases pushing strength. That focuses on chest, shoulders and triceps.",
    instructions: [
      "Lie flat on bench, lower bar to chest, then press it up until arms are straight. Feet stay flat on the floor."
    ]
  },
  "Barbell Curl": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/02/barbell-cheat-curl.gif",
    description: "Strengthens biceps with focus on controlled tension.",
    instructions: [
      "Curl barbell toward shoulders, lower slowly without swinging."
    ]
  },
  "Bent Over Rows": {
    gif:"https://c.tenor.com/ZA7d-cdoYEIAAAAd/tenor.gif",
    description: "The bent-over row is a compound exercise that targets the upper and middle back, including the lats, rhomboids, and traps, as well as the biceps and rear shoulders.",
    instructions: [
      "Stand with feet hip-width apart, holding a barbell or dumbbells in front of you.",
      "Bend your knees slightly and hinge at the hips, keeping your back flat and chest up.",
      "Let the weights hang down with arms extended.",
      "Pull the weights toward your torso, squeezing your shoulder blades together.",
      "Lower the weights slowly and repeat, keeping your core tight throughout."
    ]
  },
  "Bent-over Barbell Row": {
    gif:"https://c.tenor.com/AYJ_bNXDvoUAAAAd/tenor.gif",
    description: "A pulling exercise that strengthens the back and improves posture. That focuses on back, triceps, and core.",
    instructions: [
      "Bend at hips with flat back. Pull barbell to your torso, then lower it with control."
    ]
  },
  "Bicep Curls": {
    gif:"https://c.tenor.com/8T_oLOn1XJwAAAAd/tenor.gif",
    description: "Classic arm builder for size and definition.",
    instructions: [
      "Curl barbell or dumbbells toward shoulders, control on the way down."
    ]
  },
  "Bodyweight Calf Raises": {
    gif:"https://fitliferegime.com/wp-content/uploads/2023/05/Donkey-Calf-Raise.gif",
    description: "Bodyweight calf raises are a simple yet effective exercise that targets the calf muscles (gastrocnemius and soleus). They help improve ankle strength, stability, and lower leg definition.",
    instructions: [
      "Stand with your feet hip-width apart and your knees straight.",
      "Slowly raise your heels off the ground, coming up onto the balls of your feet.",
      "Pause for a moment at the top, squeezing your calves.",
      "Lower your heels back down slowly and with control.",
      "Repeat the movement for the desired number of reps."
    ]
  },
  "Bodyweight Good Mornings": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/09/barbell-good-morning.gif",
    description: "Bodyweight good mornings are an excellent exercise for targeting the hamstrings, glutes, and lower back. They help improve posture and hip hinge mobility without any equipment.",
    instructions: [
      "Stand with your feet shoulder-width apart, knees slightly bent, and hands placed behind your head or across your chest.",
      "Hinge at your hips, pushing your glutes back while keeping your back straight and chest lifted.",
      "Lower your torso until you feel a stretch in your hamstrings, making sure not to round your back.",
      "Reverse the motion by driving through your hips to return to standing.",
      "Repeat for the desired number of reps, focusing on controlled movement."
    ]
  },
  "Bulgarian Split Squats": {
    gif:"https://c.tenor.com/-nA6dX0Ws28AAAAd/tenor.gif",
    description: "Single-leg movement for strength and balance.",
    instructions: [
      "Rear foot elevated, lower front leg into squat, then push back up."
    ]
  },
  "Cable Flys": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/08/cable-fly.gif",
    description: "Isolation move to emphasize chest contraction.",
    instructions: [
      "Stand between cables, arms slightly bent. Bring handles together in front of chest."
    ]
  },
  "Cable Lateral Raises": {
    gif:"https://c.tenor.com/nJyyTUIZRScAAAAd/tenor.gif",
    description: "Isolation for shoulder width and definition.",
    instructions: [
      "Raise cables out to sides, arms slightly bent, pause at shoulder height."
    ]
  },
  "Cable Rows": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/cable-seated-row.gif",
    description: "Cable rows are a compound back exercise that targets the middle back, lats, and biceps using a cable machine with a seated row attachment. It helps build posture and upper body strength.",
    instructions: [
      "Sit at the cable row machine with your feet on the footplates and knees slightly bent.",
      "Grab the handle (V-bar or straight bar) with both hands.",
      "Sit upright with a straight back and arms extended."
    ]
  },
  "Chest Fly": {
    gif:"https://c.tenor.com/oJXOnsC72qMAAAAd/tenor.gif",
    description: "The chest fly is an isolation exercise that targets the pectoral muscles. It helps develop chest width and definition, typically performed with dumbbells or a machine.",
    instructions: [
      "Lie on a flat bench holding a dumbbell in each hand, palms facing each other.",
      "Start with arms extended above your chest, elbows slightly bent.",
      "Slowly open your arms out to the sides in a wide arc until you feel a stretch in your chest.",
      "Keep the bend in your elbows and avoid dropping the weights too low.",
      "Bring the dumbbells back up in the same arc, squeezing your chest at the top."
    ]
  },
  "Deadlift": {
    gif:"https://c.tenor.com/8WFespm7NwoAAAAd/tenor.gif",
    description: "A full-body strength movement that emphasizes posterior chain power. That focuses on glutes, hamstrings, and back",
    instructions: [
      "Stand with feet hip-width apart, grip bar outside knees. Lift by driving through heels, keeping back flat."
    ]
  },
  "Doorway Rows": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2023/06/Bodyweight-Row-in-Doorway.gif",
    description: "Doorway rows are a bodyweight exercise that targets the back muscles, especially the lats and rhomboids. It's a great at-home alternative to rowing movements using minimal equipment.",
    instructions: [
      "Stand facing an open doorway and grasp both sides at about waist or chest height.",
      "Lean back slightly with arms extended, keeping your body straight and heels on the floor.",
      "Pull your chest toward the doorway by bending your elbows and squeezing your shoulder blades together.",
      "Slowly extend your arms to return to the starting position.",
      "Keep your core tight and movement controlled throughout."
    ]
  },
  "Dumbbell Bench Press": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
    description: "The dumbbell bench press is a compound chest exercise that targets the pectorals, triceps, and shoulders. It allows for a greater range of motion than the barbell version and helps improve muscle balance.",
    instructions: [
      "Lie flat on a bench with a dumbbell in each hand, feet flat on the floor.",
      "Hold the dumbbells at chest level with palms facing forward.",
      "Press the weights up until your arms are fully extended above your chest.",
      "Slowly lower the dumbbells back to the starting position."
    ]
  },
  "Dumbbell Deadlifts": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2023/09/dumbbell-deadlifts.gif",
    description: "Dumbbell deadlifts are a compound lower-body and back exercise that targets the hamstrings, glutes, lower back, and core. They are a beginner-friendly alternative to barbell deadlifts and help build functional strength.",
    instructions: [
      "Stand with feet hip-width apart, holding a dumbbell in each hand at your sides or in front of your thighs.",
      "Keep your back straight and core engaged.",
      "Hinge at the hips and lower the dumbbells down the front of your legs, keeping them close to your body.",
      "Lower until your hamstrings feel a stretch or the dumbbells reach mid-shin.",
      "Push through your heels to return to standing, squeezing your glutes at the top."
    ]
  },
  "Dumbbell Lateral Raises": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
    description: "Dumbbell lateral raises are an isolation exercise that primarily targets the lateral (middle) deltoids of the shoulders. This exercise helps improve shoulder width and definition.",
    instructions: [
      "Stand with your feet hip-width apart, holding a dumbbell in each hand at your sides with palms facing inward.",
      "Keeping a slight bend in your elbows, raise both dumbbells outward and upward to shoulder height.",
      "Pause briefly at the top, then slowly lower the dumbbells back down to the starting position.",
      "Avoid using momentum or swinging your body; keep the movement controlled.",
      "Focus on lifting with your shoulders, not your hands or forearms."
    ]
  },
  "Dumbbell Row": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif",
    description: "Single-arm row for upper back and biceps isolation.",
    instructions: [
      "One hand on bench, pull dumbbell to hip, control on the way down."
    ]
  },
  "Dumbbell Shoulder Press": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
    description: "The dumbbell shoulder press is a compound exercise that primarily targets the deltoid muscles, especially the front and side heads, while also engaging the triceps and upper chest. It helps build upper-body strength and shoulder stability.",
    instructions: [
      "Sit or stand with a dumbbell in each hand at shoulder height, palms facing forward.",
      "Engage your core and keep your back straight.",
      "Press the dumbbells upward until your arms are fully extended overhead.",
      "Pause briefly at the top, then lower the dumbbells back to shoulder level in a controlled motion.",
      "Avoid arching your lower back or flaring your elbows too wide."
    ]
  },
  "Face Pulls": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif",
    description: "Improves posture and rear shoulder strength.That focuses on rear delts and traps",
    instructions: [
      "Use rope at upper pulley, pull toward face while keeping elbows high."
    ]
  },
  "Floor Chest Fly with Bottles": {
    gif:"https://c.tenor.com/TuMDTcCr3eMAAAAd/tenor.gif",
    description: "The floor chest fly with bottles is a great alternative to traditional dumbbell chest flies, targeting the chest, shoulders, and triceps using household items like water bottles or any similar objects.",
    instructions: [
      "Lie flat on your back on the floor with a water bottle in each hand.",
      "Keep your knees bent and feet flat on the floor for stability.",
      "Extend your arms straight above your chest, palms facing each other.",
      "Slowly lower your arms out to the sides, maintaining a slight bend in your elbows.",
      "Squeeze your chest as you bring your arms back together to the starting position.",
      "Repeat for the desired number of reps."
    ]
  },
  "Floor Press with Backpack": {
    gif:"https://gogoodguru.com/wp-content/uploads/2019/11/Water-Bottle-Floor-Chest-Presses_F_Animated.gif",
    description: "The floor press with a backpack is a simple chest exercise that targets the pectorals, shoulders, and triceps. It's a great home workout variation using a backpack for added resistance.",
    instructions: [
      "Lie on your back on the floor with a filled backpack resting on your chest, holding the top straps with both hands.",
      "Position your feet flat on the floor and your knees bent to maintain stability.",
      "Press the backpack upward, extending your arms fully while keeping your elbows slightly bent.",
      "Lower the backpack back down to your chest in a controlled manner, engaging your chest and triceps.",
      "Repeat for the desired number of reps, ensuring your back stays flat and your core engaged."
    ]
  },
  "Front Squats": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/09/front-squat.gif",
    description: "A squat variation that targets quads and core more than traditional squats. That focuses on quads, glutes, and core",
    instructions: [
      "Hold bar on front shoulders, elbows high. Squat down with upright posture, then push back up."
    ]
  },
  "Glute Bridge Walkouts": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/12/glute-bridge.gif",
    description: "Glute bridges are a bodyweight exercise that primarily targets the glutes, while also working the hamstrings and core. They help improve hip stability, posture, and lower-body strength.",
    instructions: [
      "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
      "Place your arms by your sides, palms down.",
      "Press through your heels to lift your hips toward the ceiling.",
      "Squeeze your glutes at the top, creating a straight line from shoulders to knees.",
      "Lower your hips slowly back to the floor and repeat."
    ]
  },
  "Goblet Squats": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/explosive-goblet-squat.gif",
    description: "The goblet squat is a lower-body exercise that targets the quads, glutes, hamstrings, and core. Holding a dumbbell or kettlebell in front of your chest helps improve squat form and stability.",
    instructions: [
      "Stand with your feet shoulder-width apart, holding a dumbbell or kettlebell with both hands close to your chest.",
      "Keep your back straight, chest lifted, and core engaged.",
      "Lower your body by bending your knees and pushing your hips back, keeping the weight close to your body.",
      "Squat down until your thighs are parallel to the ground (or deeper if flexibility allows).",
      "Press through your heels to return to standing, squeezing your glutes at the top."
    ]
  },
  "Hammer Curls": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/04/Seated-Hammer-Curl.gif",
    description: "Emphasizes forearms and brachialis muscle. That focuses on biceps and forearms",
    instructions: [
      "Hold dumbbells with neutral grip, curl up and down under control."
    ]
  },
  "Hamstring Curl": {
    gif:"https://burnfit.io/wp-content/uploads/2023/11/LEG_CURL.gif",
    description: "Machine-based isolation for hamstrings.",
    instructions: [
      "Curl weight toward glutes, control release."
    ]
  },
  "Hanging Leg Raises": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/08/Hanging-Leg-Raises.gif",
    description: "Targets lower abs and hip flexors.",
    instructions: [
      "Step forward into lunge, alternate legs while walking."
    ]
  },
  "High Knees": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/08/High-Knee-Run.gif",
    description: "High knees are a cardio-intensive bodyweight exercise that strengthens the legs, improves coordination, and elevates heart rate for conditioning and fat burning.",
    instructions: [
      "Stand tall with feet hip-width apart.",
      "Quickly drive one knee up toward your chest while pumping the opposite arm.",
      "Alternate legs in a running motion, lifting knees as high as possible.",
      "Stay on the balls of your feet and maintain a brisk pace.",
      "Keep your core engaged and chest lifted throughout."
    ]
  },
  "Hip Hinge with No Weights": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pvc-hinge-example.gif",
    description: "The hip hinge is a foundational movement pattern that targets the glutes, hamstrings, and lower back. Practicing it without weight helps build proper form for exercises like deadlifts and kettlebell swings.",
    instructions: [
      "Stand with feet hip-width apart, knees slightly bent.",
      "Place your hands on your hips or crossed on your chest.",
      "Push your hips back while keeping your spine straight and chest lifted.",
      "Lower your torso until you feel a stretch in your hamstrings.",
      "Drive through your hips to return to standing, squeezing your glutes at the top."
    ]
  },
  "Incline Bench Press": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif",
    description: "Builds upper chest and front deltoids with angled pressing. That focuses on upper chest, shoulders, and triceps",
    instructions: [
      "Lie on incline bench, lower bar to upper chest, press upward."
    ]
  },
   "Elevated Feet Push-ups": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2015/07/Decline-Push-Up.gif",
    description: "An advanced push-up variation that increases resistance on the upper chest and shoulders by elevating your feet. It challenges core stability and builds upper body strength more intensely than standard push-ups.",
    instructions: [
      "Place your feet on an elevated surface (bench, chair, or step) and hands shoulder-width apart on the floor.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest toward the floor by bending your elbows.",
      "Pause briefly at the bottom, then push back up to the starting position.",
      "Maintain a tight core throughout the movement."
    ]
  },
  "Backpack Bent-Over Rows": {
    gif:"https://cdn.shopify.com/s/files/1/0449/8453/3153/files/Backpack_Rows.gif?v=1727233864",
    description: "A backpack-based alternative to traditional bent-over rows that targets the upper back, lats, rhomboids, and biceps using simple home equipment.",
    instructions: [
      "Fill a backpack with weight (books, water bottles, etc.) and grab it by the top or side handles.",
      "Stand with feet hip-width apart, knees slightly bent.",
      "Hinge forward at your hips, keeping your back flat and chest up.",
      "Pull the backpack toward your lower chest by bending your elbows.",
      "Squeeze your shoulder blades at the top, then lower with control."
    ]
  },
  "Backpack Curls": {
    gif:"https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/07/400x400_Biceps_Workouts_At_Home_Backpack_Curls.gif?h=840",
    description: "A bicep-focused exercise using a backpack for resistance. It simulates dumbbell curls and helps build arm strength and size using household items.",
    instructions: [
      "Hold the top straps of a weighted backpack with both hands, arms at your sides.",
      "Stand with your feet shoulder-width apart, elbows tucked in.",
      "Curl the backpack up toward your chest while keeping your elbows stationary.",
      "Squeeze your biceps at the top, then slowly lower it back down.",
      "Avoid swinging your arms or using momentum."
    ]
  },
  "Backpack Thrusters": {
    gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzU0MjNmMHllcDQzbTNlZXByeHRzbGcybmFvY29vdTN5cGxtZHAwbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/elH6fPN5PvSsic2oWW/giphy.gif",
    description: "A full-body movement that combines a squat and overhead press using a backpack. This exercise targets the legs, glutes, shoulders, and core—great for strength and conditioning.",
    instructions: [
      "Hold a loaded backpack at chest level with both hands.",
      "Stand with feet shoulder-width apart and perform a deep squat.",
      "As you rise from the squat, press the backpack overhead in one fluid motion.",
      "Lower the backpack back to chest level and repeat.",
      "Keep your core tight and avoid leaning back during the press."
    ]
  },
  "Bench Dips": {
    gif:"https://c.tenor.com/iGyfarCUXe8AAAAd/tenor.gif",
    description: "A bodyweight triceps exercise that also works the chest and shoulders. It's performed using a bench, chair, or similar surface.",
    instructions: [
      "Sit on the edge of a bench with hands next to your hips.",
      "Move your feet forward and lower your body off the bench, supporting your weight with your arms.",
      "Bend your elbows to lower your body until your arms are at about 90 degrees.",
      "Push through your palms to return to the starting position.",
      "Keep your back close to the bench throughout."
    ]
  },
  "Bicycle Crunches": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/08/bicycle-crunch-movement.gif",
    description: "A core exercise that targets the upper and lower abs as well as the obliques. It mimics a pedaling motion to engage multiple abdominal muscles.",
    instructions: [
      "Lie flat on your back with hands behind your head and knees lifted to 90 degrees.",
      "Bring your right elbow toward your left knee while extending your right leg.",
      "Switch sides, bringing your left elbow toward your right knee.",
      "Continue alternating sides in a controlled, bicycle-like motion.",
      "Keep your lower back pressed into the floor."
    ]
  },
  "Chair Dips": {
    gif:"https://c.tenor.com/XZ0zLOLCbm0AAAAd/tenor.gif",
    description: "A simple yet effective triceps and shoulder exercise using a chair for support. It's ideal for home workouts and improves upper-body pushing strength.",
    instructions: [
      "Sit on the edge of a sturdy chair with hands gripping the edge.",
      "Move your hips forward off the chair, legs extended or bent slightly.",
      "Lower your body by bending your elbows to about 90 degrees.",
      "Push back up until your arms are fully extended.",
      "Keep your elbows pointing backward, not flaring outward."
    ]
  },
  "Tricep Dips on Chair": {
    gif:"https://c.tenor.com/XZ0zLOLCbm0AAAAd/tenor.gif",
    description: "A variation of chair dips that specifically isolates the triceps. Best performed with slow, controlled movement to maximize engagement.",
    instructions: [
      "Place your hands on the edge of a chair behind you, fingers pointing forward.",
      "Extend your legs or keep them bent, heels on the floor.",
      "Lower your body by bending your elbows to a 90-degree angle.",
      "Push through your palms to straighten your arms and return to start.",
      "Avoid using your legs to assist the movement."
    ]
  },
  "Water Bottle Press": {
    gif:"https://gogoodguru.com/wp-content/uploads/2019/11/Water-Bottle-Overhead-Press_F__Animated.gif",
    description: "A creative alternative to dumbbell shoulder presses, this exercise uses water bottles to strengthen the deltoids, triceps, and upper chest.",
    instructions: [
      "Hold a water bottle in each hand at shoulder height, palms facing forward.",
      "Stand or sit with a straight back and engaged core.",
      "Press the bottles overhead until your arms are fully extended.",
      "Pause at the top, then slowly lower them back to shoulder height.",
      "Keep movements smooth and avoid locking your elbows."
    ]
  },
  "Incline Dumbbell Press": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
    description: "The incline dumbbell press targets the upper portion of the chest (clavicular head of the pectoralis major), as well as the shoulders and triceps. It's an effective variation of the flat bench press, adding emphasis to the upper chest.",
    instructions: [
      "Set an incline bench at a 30–45-degree angle and sit down with a dumbbell in each hand.",
      "Hold the dumbbells at shoulder height with your palms facing forward.",
      "Press the dumbbells up until your arms are fully extended above your chest.",
      "Lower the dumbbells back down with control until your elbows are at a 90-degree angle or slightly deeper.",
      "Keep your core engaged and avoid arching your lower back."
    ]
  },
  "Incline Push-Ups": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/06/Incline-Push-Up.gif",
    description: "Incline push-ups are a variation of the traditional push-up that target the chest, shoulders, and triceps, with less strain on the lower back and core. They are performed with the hands elevated on a surface like a bench, table, or step.",
    instructions: [
      "Place your hands on an elevated surface, like a bench, with arms slightly wider than shoulder-width.",
      "Keep your body in a straight line, core engaged.",
      "Lower your chest toward the surface, then push back up.",
      "Repeat for desired reps."
    ]
  },
  "Incline Shoulder Taps": {
    gif:"https://gymvisual.com/img/p/2/3/7/0/4/23704.gif",
    description: "Incline shoulder taps are a variation of the shoulder tap exercise, performed with your hands elevated on an inclined surface. This reduces the intensity, making it a great core stability and shoulder workout.",
    instructions: [
      "Place your hands on an elevated surface like a bench or step, keeping your body in a straight line from head to heels.",
      "Lift one hand off the surface and tap your opposite shoulder.",
      "Return the hand to the surface and repeat with the other hand.",
      "Continue alternating sides, maintaining a stable torso and avoiding any rocking motion."
    ]
  },
  "Jog": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2021/07/Run.gif",
    description: "Light cardio for recovery and fat-burning.",
    instructions: [
      "Jog at steady pace for 10–20 minutes post-core to cool down and condition."
    ]
  },
  "Kettlebell Deadlift": {
    gif:"https://media.tenor.com/0PlWgJxSNi0AAAAM/single-bd-swing-dumbbell-workout.gif",
    description: "The kettlebell deadlift is a lower-body exercise that targets the glutes, hamstrings, and lower back. It's a great way to build strength in the posterior chain using a kettlebell.",
    instructions: [
      "Stand with feet hip-width apart, with a kettlebell on the floor between your feet.",
      "Hinge at your hips, bending your knees slightly, and grip the kettlebell with both hands.",
      "Keeping your back straight, push your hips back and lower the kettlebell towards the ground.",
      "Once the kettlebell passes your knees, reverse the movement by driving through your hips and returning to a standing position.",
      "Squeeze your glutes at the top and avoid rounding your back during the movement."
    ]
  },
  "Knee Push-Ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/04/knee-push-ups.gif",
    description: "The knee push-up is a beginner-friendly variation of the standard push-up that targets the chest, shoulders, and triceps with reduced body weight for easier execution.",
    instructions: [
      "Start in a push-up position but with your knees on the floor and feet crossed.",
      "Place your hands slightly wider than shoulder-width apart.",
      "Keep your body in a straight line from head to knees.",
      "Lower your chest toward the floor by bending your elbows.",
      "Push back up to the starting position, keeping your core tight."
    ]
  },
  "Lat Pulldown": {
    gif:"https://th.bing.com/th/id/OIP.MXfG1T_5-lSYM3XnJDUMbgHaHa?rs=1&pid=ImgDetMain",
    description: "The lat pulldown is a resistance exercise that targets the latissimus dorsi muscles in your back. It mimics the pull-up motion but is performed on a machine, making it accessible for beginners and adjustable by weight.",
    instructions: [
      "Sit at the lat pulldown machine and adjust the thigh pad to secure your legs.",
      "Grip the bar slightly wider than shoulder-width with palms facing forward.",
      "Pull the bar down to your upper chest while squeezing your shoulder blades together.",
      "Pause briefly, then slowly return the bar to the starting position.",
      "Repeat for the desired number of reps."
    ]
  },
  "Leg Curl Machine": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/seated-leg-curl.gif",
    description: "The leg curl machine targets the hamstrings, the muscles at the back of your thighs. It isolates and strengthens these muscles, aiding in knee joint stability and athletic performance.",
    instructions: [
      "Adjust the machine to fit your body: the pad should rest just above your heels.",
      "Lie face down (or sit, depending on the machine type) and grip the handles for support.",
      "Curl your legs upward by contracting your hamstrings, bringing the pad toward your glutes.",
      "Pause briefly at the top, then slowly lower the weight back to the start.",
      "Keep the motion controlled and avoid using momentum."
    ]
  },
  "Leg Press": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/single-leg-leg-press.gif",
    description: "The leg press is a machine-based exercise that targets the quadriceps, hamstrings, and glutes. It is a great alternative to squats, providing a safer, more controlled movement for leg strength and muscle building.",
    instructions: [
      "Sit on the leg press machine with your feet shoulder-width apart on the platform.",
      "Place your back and head against the pad, and ensure your knees are bent at about 90 degrees.",
      "Push through your heels to extend your legs and lift the weight, making sure not to lock your knees at the top.",
      "Slowly lower the weight by bending your knees, keeping them in line with your toes.",
      "Avoid letting your knees cave inward or extend too far beyond your toes."
    ]
  },
  "March in Place": {
    gif:"https://gymvisual.com/img/p/2/3/7/4/9/23749.gif",
    description: "Marching in place is a low-impact cardio exercise that improves circulation, warms up the body, and gently works the legs, hips, and core.",
    instructions: [
      "Stand tall with your feet hip-width apart and arms at your sides.",
      "Lift one knee to hip height while swinging the opposite arm forward.",
      "Lower your foot and repeat with the other leg.",
      "Continue alternating legs at a steady pace.",
      "Keep your core engaged and posture upright throughout."
    ]
  },
  "Overhead Dumbbell Press": {
    gif:"https://gymvisual.com/img/p/1/4/4/9/6/14496.gif",
    description: "The overhead dumbbell press is a compound upper-body exercise that primarily targets the shoulders (deltoids), with secondary activation of the triceps and upper chest. It improves shoulder strength and stability.",
    instructions: [
      "Sit or stand with a dumbbell in each hand at shoulder height, palms facing forward.",
      "Brace your core and keep your back straight.",
      "Press the dumbbells upward until your arms are fully extended overhead.",
      "Pause briefly, then slowly lower the weights back to shoulder level.",
      "Keep your movements controlled and avoid arching your lower back."
    ]
  },
  "Overhead Press": {
    gif:"https://musclemagfitness.com/wp-content/uploads/barbell-standing-military-press-exercise.gif",
    description: "A pressing move that strengthens the shoulders and stabilizers. That focuses on shoulders, triceps, and core.",
    instructions: [
      "Stand or sit with barbell at shoulder height. Press overhead until arms are straight, then lower."
    ]
  },
  "Overhead Tricep Extension": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/tricep-overhead-extensions.gif",
    description: "Stretches and strengthens long head of triceps.",
    instructions: [
      "Hold dumbbell with both hands, extend overhead, then lower behind head and press back up."
    ]
  },
  "Plank": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank.gif",
    description: "The plank is an isometric core exercise that strengthens your abdominals, back, and shoulders. It also improves posture and stability.",
    instructions: [
      "Start in a forearm position with elbows directly under shoulders and forearms parallel.",
      "Extend your legs back, resting on your toes, keeping your body in a straight line.",
      "Engage your core, glutes, and legs; avoid sagging or arching your back.",
      "Hold the position for a set time (e.g., 20–60 seconds).",
      "Breathe steadily throughout and avoid looking up or down."
    ]
  },
  "Prone Y Raise": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/11/prone-y-raise-movement.gif",
    description: "The prone Y raise is an upper-body exercise that targets the upper back, specifically the lower traps and shoulders. It helps improve posture and shoulder stability.",
    instructions: [
      "Lie face down on a bench or the floor with your arms extended in front of you in a \"Y\" shape (thumbs pointing up).",
      "Keep your head neutral with your spine and engage your core.",
      "Lift your arms off the ground, squeezing your shoulder blades together as you raise your arms to form the \"Y\" shape.",
      "Hold briefly at the top, then slowly lower your arms back to the starting position.",
      "Repeat for the desired number of reps, focusing on controlled movements."
    ]
  },
  "Pull-ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up.gif",
    description: "A bodyweight movement that develops upper body strength and endurance. That focuses on lats, biceps, and shoulders.",
    instructions: [
      "Grip bar, pull body up until chin is over the bar. Lower slowly with full range of motion."
    ]
  },
  "Push Press": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/04/push-press.gif",
    description: "Explosive overhead press using leg drive for full-body power. That focuses on shoulders, triceps, and legs",
    instructions: [
      "Dip at knees, press bar overhead using legs and arms."
    ]
  },
  "Push-Ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/11/push-up.gif",
    description: "Push-ups are a classic bodyweight exercise that target the chest, shoulders, triceps, and core. They build upper body strength and endurance.",
    instructions: [
      "Start in a high plank position with hands slightly wider than shoulder-width.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest toward the floor by bending your elbows.",
      "Push through your palms to return to the starting position.",
      "Keep your core tight and avoid letting your hips sag."
    ]
  },
  "Resistance Band Row": {
    gif:"https://spotebi.com/wp-content/uploads/2017/12/band-seated-row-exercise-illustration-spotebi.gif",
    description: "The resistance band row is a back-strengthening exercise that targets the lats, rhomboids, and traps. It's a versatile, joint-friendly movement ideal for home workouts.",
    instructions: [
      "Sit with your legs extended and loop the band around your feet (or anchor it securely at a low point).",
      "Hold the band handles or ends with arms extended and palms facing each other.",
      "Pull the band toward your torso, squeezing your shoulder blades together.",
      "Keep your back straight and elbows close to your body.",
      "Slowly return to the starting position and repeat."
    ]
  },
  "Reverse Flys": {
    gif:"https://fitnessprogramer.com/wp-content/uploads/2022/02/Band-Seated-Row.gif",
    description: "Isolation move for upper back and rear delts. That focuses on rear delts and rhomboids",
    instructions: [
      "Hinge forward, raise dumbbells to sides, squeeze shoulder blades."
    ]
  },
  "Romanian Deadlift": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/06/barbell-romanian-deadlift-movement.gif",
    description: "The Romanian deadlift is a hip hinge exercise that primarily targets the hamstrings, glutes, and lower back. It's a great movement for building posterior chain strength and improving flexibility.",
    instructions: [
      "Stand with feet hip-width apart, holding a barbell or dumbbells in front of your thighs.",
      "Keep your knees slightly bent and your back straight.",
      "Hinge at the hips, lowering the weight toward your shins, keeping it close to your body.",
      "Lower until you feel a stretch in your hamstrings.",
      "Reverse the movement by driving your hips forward to return to standing."
    ]
  },
  "Russian Twists": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2021/12/how-to-do-a-kettlebell-russian-twist.gif",
    description: "The Russian twist is a core exercise that targets the obliques and abdominal muscles. It improves rotational strength and core stability, often performed with or without added weight.",
    instructions: [
      "Sit on the floor with knees bent and feet flat (or raised for more difficulty).",
      "Lean back slightly while keeping your back straight and core engaged.",
      "Hold your hands together or grasp a weight/medicine ball.",
      "Twist your torso to the right, bringing your hands beside your hip.",
      "Return to center, then twist to the left—this is one rep.",
      "Continue alternating sides in a controlled motion."
    ]
  },
  "Seated Cable Row": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/09/cable-row.gif",
    description: "The seated cable row is a back exercise that primarily targets the lats, rhomboids, and traps. It helps improve posture and upper back strength.",
    instructions: [
      "Sit on the cable row machine with your feet placed on the footrests and knees slightly bent.",
      "Grip the handle with both hands, palms facing each other or facing downward, and extend your arms in front of you.",
      "Pull the handle toward your torso while squeezing your shoulder blades together.",
      "Keep your chest lifted and back straight as you row the handle back.",
      "Slowly return the handle to the starting position with control."
    ]
  },
  "Seated Dumbbell Shoulder Press": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/04/arnold-presses.gif",
    description: "The seated dumbbell shoulder press is a compound exercise that targets the deltoids, particularly the front and side heads, along with the triceps. Sitting provides added back support and stability.",
    instructions: [
      "Sit on a bench with back support, holding a dumbbell in each hand at shoulder height, palms facing forward.",
      "Engage your core and keep your feet flat on the floor.",
      "Press the dumbbells upward until your arms are fully extended overhead.",
      "Pause briefly at the top, then slowly lower the weights back to shoulder level.",
      "Keep your back pressed against the bench and avoid arching your spine."
    ]
  },
  "Seated Rear Delt Raises (bent over)": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/11/cabled-seated-rear-lateral-raise.gif",
    description: "Seated rear delt raises are an isolation exercise that targets the rear deltoids (back of the shoulders), as well as the upper back muscles like the rhomboids and traps. It helps improve shoulder balance and posture.",
    instructions: [
      "Sit on the edge of a bench with a dumbbell in each hand, arms hanging down.",
      "Lean forward at the hips, keeping your back flat and chest slightly up.",
      "With a slight bend in your elbows, raise the dumbbells out to the sides until they reach shoulder height.",
      "Squeeze your shoulder blades together at the top.",
      "Lower the dumbbells slowly back down under control."
    ]
  },
  "Skull Crushers": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/flat-bench-skull-crusher.gif",
    description: "Isolation movement for triceps growth.",
    instructions: [
      "Lie on bench, lower EZ bar to forehead, extend elbows to lift back up."
    ]
  },
  "Sled Push": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/sled-push-muscles.gif",
    description: "High-intensity full-body conditioning and strength. That focuses on legs, glutes, core, and heart",
    instructions: [
      "Push sled forward with strong drive, maintain low stance and steady pace."
    ]
  },
  "Squat": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/07/squat-jump.gif",
    description: "Squats are a foundational lower-body exercise that targets the quads, glutes, hamstrings, and core. They build strength, stability, and mobility.",
    instructions: [
      "Stand with feet shoulder-width apart, toes slightly turned out.",
      "Keep your chest up and core engaged.",
      "Bend your knees and push your hips back as if sitting into a chair.",
      "Lower until your thighs are parallel to the ground (or as low as comfortable).",
      "Push through your heels to return to standing, squeezing your glutes at the top."
    ]
  },
  "Standing Calf Raises": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/standing-calf-raise.gif",
    description: "Standing calf raises are a simple lower-leg exercise that targets the calf muscles (gastrocnemius and soleus). They help improve ankle strength, balance, and muscle definition.",
    instructions: [
      "Stand upright with your feet hip-width apart, near a wall or support for balance.",
      "Slowly raise your heels off the ground, coming up onto the balls of your feet.",
      "Pause and squeeze your calves at the top.",
      "Lower your heels back down under control.",
      "Repeat for desired reps, keeping the movement smooth and steady."
    ]
  },
  "Step-Ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/07/weighted-step-up.gif",
    description: "Step-ups are a functional lower-body exercise that targets the quads, glutes, and hamstrings. They also improve balance, coordination, and single-leg strength.",
    instructions: [
      "Stand in front of a sturdy bench or step, feet hip-width apart.",
      "Place one foot firmly on the step.",
      "Push through your front heel to lift your body up, bringing the other foot to the step.",
      "Step back down with the trailing foot, then return to the start position.",
      "Repeat on one leg or alternate legs each rep."
    ]
  },
  "T-Bar Row": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2021/10/t-bar-row-muscles.gif",
    description: "Compound back movement for thickness. That focuses on mid-back, lats and biceps.",
    instructions: [
      "Pull T-bar handle to chest, squeeze shoulder blades."
    ]
  },
  "Towel Row": {
    gif:"https://gymvisual.com/img/p/2/1/5/1/5/21515.gif",
    description: "The towel row is a simple, bodyweight exercise that targets the back muscles, including the lats, rhomboids, and traps. It can be performed at home using a towel and a sturdy surface like a door or pull-up bar.",
    instructions: [
      "Loop a towel over a sturdy door handle, bar, or rail.",
      "Hold each end of the towel with both hands and lean back, keeping your body straight and feet flat on the ground.",
      "Pull your body toward the towel by bending your elbows and squeezing your shoulder blades together.",
      "Keep your core engaged and chest up as you row your body toward the towel.",
      "Slowly lower your body back to the starting position and repeat."
    ]
  },
  "One-Arm Dumbbell Row (light)": {
    gif:"https://gymvisual.com/img/p/1/0/4/0/3/10403.gif",
    description: "A beginner-friendly version of the one-arm dumbbell row that targets the upper and middle back, especially the lats and rhomboids, with a lighter weight to focus on form and control. It also engages the biceps and core for stabilization.",
    instructions: [
      "Place your left knee and hand on a bench or sturdy surface for support.",
      "Hold a light dumbbell in your right hand with your arm fully extended toward the floor.",
      "Keep your back flat and core engaged.",
      "Pull the dumbbell up toward your torso by bending your elbow, keeping it close to your body.",
      "Squeeze your shoulder blade at the top, then slowly lower the dumbbell back down.",
      "Complete the reps on one side, then switch to the other."
    ]
  },
  "Tricep Rope Pushdown": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/11/cable-pushdown.gif",
    description: "Isolation movement to define and strengthen triceps.",
    instructions: [
      "Use cable rope, push down from chest level to thighs, extend elbows fully."
    ]
  },
  "Treadmill": {
    gif:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8945b0176219235.64c11350dbe8b.gif",
    description: "The treadmill is a cardio machine that simulates walking, jogging, or running indoors. It offers adjustable speed and incline for varied intensity.",
    instructions: [
      "Step onto the treadmill and set the speed to your desired pace.",
      "If desired, adjust the incline for added intensity.",
      "Keep your posture upright and avoid holding onto the handlebars unless necessary for balance.",
      "Maintain a steady stride, breathing rhythmically.",
      "Cool down by lowering speed for the last 5 minutes."
    ]
  },
  "Walking Lunges": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/08/bodyweight-walking-lunge-movement.gif",
    description: "A dynamic leg exercise that improves balance, coordination, and strength. That focuses on quads, hamstrings, and glutes",
    instructions: [
      "Step forward into a lunge, lowering back knee. Push up and bring back foot forward into next lunge."
    ]
  },
  "Wall Shoulder Taps": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/10/shoulder-tap.gif",
    description: "Wall shoulder taps are a beginner-friendly core and shoulder stability exercise. They help build strength in the shoulders, arms, and core while improving balance and coordination.",
    instructions: [
      "Face a wall and place your hands on it at shoulder height, arms extended.",
      "Step back slightly so your body is at a slight angle.",
      "Lift one hand off the wall and tap the opposite shoulder.",
      "Return your hand to the wall and repeat with the other side.",
      "Keep your core tight and hips steady throughout the movement."
    ]
  },
  "Wall Sit": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/08/wall-sit.gif",
    description: "The wall sit is an isometric exercise that targets the quadriceps, glutes, and core. It helps improve endurance and lower body strength.",
    instructions: [
      "Stand with your back against a wall and slide down into a seated position, thighs parallel to the ground.",
      "Keep your knees at a 90-degree angle, with your feet flat on the floor and hips aligned.",
      "Hold the position, keeping your core engaged and your back against the wall.",
      "Hold for as long as possible, then slowly rise back to standing."
    ]
  },
  "Water Bottle Lateral Raises": {
    gif:"https://gymvisual.com/img/p/2/7/1/9/5/27195.gif",
    description: "Water bottle lateral raises target the shoulders, particularly the deltoid muscles. It's a simple exercise that uses household items, like water bottles, for resistance.",
    instructions: [
      "Hold a water bottle in each hand with arms at your sides.",
      "Stand tall with feet hip-width apart and core engaged.",
      "Raise your arms out to the sides until they're level with your shoulders.",
      "Slowly lower the bottles back to your sides.",
      "Repeat for the desired reps, focusing on controlled movements."
    ]
  },
  "Archer Push-ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/archer-push-up.gif",
    description: "Push-up variation that increases load on one side, targets chest, triceps, shoulders.",
    instructions: [
      "Get into push-up position. Shift weight to one side, extend the opposite arm out straight. Lower and press. Alternate sides."
    ]
  },
  "Inverted Rows": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/03/inverted-row.gif",
    description: "Bodyweight pulling movement.",
    instructions: [
      "Lie under a sturdy table.",
      "Grip the edge, keep your body straight, and pull your chest to the table.",
      "Lower back down with control."
    ]
  },
  "Jump Squats": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/07/squat-jump.gif",
    description: "Explosive lower-body movement.",
    instructions: [
      "Perform a bodyweight squat and explode upward into a jump.",
      "Land softly and go right into the next rep.",
      "Keep core tight and back straight."
    ]
  },
  "Leg Raises": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/06/lying-leg-raise.gif",
    description: "Core-focused exercise targeting lower abs and hip flexors.",
    instructions: [
      "Lie on back, lift straight legs toward ceiling, slowly lower without touching the floor."
    ]
  },
  "Pike Push-ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/pike-push-up.gif",
    description: "Vertical pressing movements.",
    instructions: [
      "Get into a pike position and lower head toward the floor, then press up."
    ]
  },
  "Pistol Squats": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/09/pistol-squat-muscles.gif",
    description: "A single-leg squat requiring balance, mobility, and strength.",
    instructions: [
      "Stand on one leg, extend the other forward.", 
      "Lower into a squat while keeping your torso upright.",
      "Go as low as possible, then push back up. Use a chair/wall for balance if needed."
    ]
  },
  "Single-Leg Calf Raises": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2024/01/single-leg-calf-raise.gif",
    description: "Isolation for calves, improving balance and ankle stability.",
    instructions: [
      "Stand on one leg on a raised surface, lower heel below level, then raise as high as possible."
    ]
  },
  "Superman Hold": {
    gif:"https://gymvisual.com/img/p/2/0/9/0/2/20902.gif",
    description: "Isometric exercise that targets the lower back, glutes, and shoulder stabilizers.",
    instructions: [
      "Lie face down, extend arms and legs. Lift both simultaneously and hold while contracting glutes and back muscles. Keep neck neutral."
    ]
  },
  "Towel Bicep Curl Isometrics": {
    gif:"https://wellnessed.com/wp-content/uploads/2023/03/bicep-curls.jpg",
    description: "Isometric hold that targets the biceps through sustained tension.",
    instructions: [
      "Stand on a towel, gripping both ends. Pull up as if curling, while resisting with your foot. Hold for 30–60 seconds."
    ]
  },
  "Wall Walks": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/08/wall-walk-muscles.gif",
    description: "Core-intensive movement that strengthens shoulders, chest, and stabilizers.",
    instructions: [
      "Start in a push-up position near a wall, walk feet up wall while walking hands back toward the wall, then return."
    ]
  },
  "Leg Curls": {
    description: "Isolates and strengthens the hamstrings.",
    instructions: [
      "Sit or lie on the machine, curl the pad toward your glutes, then slowly return."
    ]
  },
  "Burpees": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/01/burpee-movement.gif",
    description: "A full-body explosive movement combining strength and cardio. Builds power, endurance, and coordination.",
    instructions: [
      "Start standing. Drop into a squat, place hands on the floor, jump feet back to a plank. Perform a push-up (optional), then jump feet forward and explode into a jump. Land softly and repeat. Keep your pace fast but form tight."
    ]
  },
  "Deep Squat Hold": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/11/pause-jump-squats.gif",
    description: "An isometric mobility and strength hold for the hips, ankles, and lower back. Improves squat depth and postureV",
    instructions: [
      "Lower into the deepest squat your body allows while keeping heels down.", 
      "Keep your chest upright and elbows inside knees.",
      "Hold the position, breathe deeply, and use this time to open up hips and ankles."
    ]
  },
  "Diamond Push-ups": {
    gif: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Diamond-Push-up.gif",
    description: "A close-grip push-up variation that targets the triceps, inner chest, and front delts with high intensity.",
    instructions: [
      "Start in a plank with hands under your chest forming a diamond shape with thumbs and index fingers.", 
      "Lower your chest directly over your hands, keeping elbows close to your sides.",
      "Push back up without flaring elbows. Keep core braced and back flat."
    ]
  },
  "Hollow Body Hold": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/11/hollow-body-holds.gif",
    description: "A gymnastic core hold that trains total-body tension and deep core stability.",
    instructions: [
      "Lie on your back, arms extended overhead, legs straight. Lift shoulders and legs off the floor, pressing lower back into the ground. Hold the position tightly, keeping neck neutral and breathing steady."
    ]
  },
  "Mountain Climbers": {
    gif:"https://i.pinimg.com/originals/fb/fa/09/fbfa0902f381a5735972c21255935aff.gif",
    description: "A full-body cardio and core movement, improving coordination, endurance, and shoulder stability.",
    instructions: [
      "Begin in a high plank position.",
      "Drive one knee toward your chest, then switch rapidly as if running horizontally.", 
      "Keep hips low and back flat, moving legs in a fast, controlled rhythm."
    ]
  },
  "Shoulder and Hip Mobility Flows": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/08/hip-circle.gif",
    description: "A sequence of active stretches to increase joint range of motion and prepare the body for intense movement.",
    instructions: [
      "Flow through controlled movements such as arm circles, shoulder dislocates (with towel), hip circles, 90/90 switches, world's greatest stretch, and cat-cow.",
      "Focus on slow, deliberate motion and breathwork for best results."
    ]
  },
  "V-Ups": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2022/05/v-sit-ups.gif",
    description: "A dynamic core move targeting the upper and lower abs simultaneously.",
    instructions: [
      "Lie flat, arms overhead. In one motion, lift your torso and legs to meet in a 'V' shape. Reach hands toward toes. Lower back down with control. Keep movements sharp, not rushed"
    ]
  },
  "Side Plank": {
    gif:"https://www.inspireusafoundation.org/wp-content/uploads/2023/10/side-plank-muscles.gif",
    description: "A powerful isometric core drill targeting obliques, glute medius, and shoulder stabilizers..",
    instructions: [
      "Lie on one side, forearm on floor under shoulder.",
      "Lift hips off ground, forming a straight line from head to feet.",
      "Hold.", 
      "Switch sides. Keep hips lifted and neck aligned."
    ]
  }
};

function App() {
  const [search, setSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigate = useNavigate();

  const filteredExercises = exercises.filter(ex =>
    ex.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleRoute = (exercise) => {
    setSelectedExercise(exercise);
  };

  const closePopup = () => {
    setSelectedExercise(null);
  };

    const details =
    selectedExercise && exerciseDetails[selectedExercise.label]
      ? exerciseDetails[selectedExercise.label]
      : null;

   return (
    <>
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="navbar">
        <span className="brand">
          Welcome to <a href="#" className="brand-span">FitnessPro</a>
        </span>
        <div className="nav-buttons">
          <a className="nav-btn active" onClick={() => navigate('/goal-setting')}>Homepage</a>
          <a className="nav-btn" onClick={() => navigate("/workout-progress")}>Progress</a>

        </div>
      </div>
      <div className={`exercise-list-container${selectedExercise ? " dimmed" : ""}`}>
        <div className="exercise-grid-scroll-wrapper">
          <div className="exercise-header">
            <h1 className="exercise-title">Exercise Directory</h1>
            <input
              className="exercise-search"
              placeholder="🔍 Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="exercise-grid">
            {filteredExercises.map((ex, idx) => (
              <button
                className="exercise-card"
                style={{ border: "none", cursor: "pointer" }}
                onClick={() => handleRoute(ex)}
                key={idx}
                type="button"
              >
                <div className="exercise-img-bg">
                  <img className="exercise-img" src={ex.img} alt={ex.label} />
                </div>
                <div className="exercise-label">{ex.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedExercise && (
        <div className="popup-overlay">
          <div className="popup-window" style={{ maxWidth: 700 }}>
            <button className="popup-close" onClick={closePopup}>&times;</button>
            <h2 className="popup-title" style={{ marginTop: 0 }}>{selectedExercise.label}</h2>
            <img
  className="popup-img"
  src={
    (details && details.gif)
      ? details.gif
      : selectedExercise.img
  }
  alt={selectedExercise.label}
/>
            {details ? (
              <>
                <p style={{ color: "#222", fontSize: "1.1rem", margin: "24px 0 18px 0" }}>
                  {details.description}
                </p>
                <div style={{ textAlign: "left", margin: "0 auto", maxWidth: 520 }}>
                  <b style={{ color: 'navy' }}>Instructions:</b>
                  <ol style={{ marginTop: 8, color: 'navy' }}>
                    {details.instructions.map((step, i) => (
                      <li key={i} style={{ marginBottom: 4, color: 'navy' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </>
            ) : (
              <p style={{ color: "#222", fontSize: "1.1rem", margin: "24px 0 18px 0" }}>
                No additional information available for this exercise.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;