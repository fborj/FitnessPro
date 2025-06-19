import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import styles from "./GoalSetting.module.css";
import { getPlanByUserPref } from '../workoutPlans';

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

function GoalSetting() {
  const [userPref, setUserPref] = useState(null);
  const [plan, setPlan] = useState(null);
  const [exerciseImage, setExerciseImage] = useState(null); // new state for fetched image
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [lastWorkoutDate, setLastWorkoutDate] = useState(null);
  const [currentWorkoutDay, setCurrentWorkoutDay] = useState(1);
  console.log("[GoalSetting] Username from localStorage:", username);
  // Replace the current workout done status with an expiration check:
  const workoutDoneKey = username ? `workoutDone_${username}_Day${userPref && userPref.day ? userPref.day : ''}` : "workoutDone";
  let isWorkoutDone = false;
  const storedWorkoutDone = localStorage.getItem(workoutDoneKey);
  if (storedWorkoutDone) {
    try {
      const data = JSON.parse(storedWorkoutDone);
      if (data.status && data.expiry > Date.now()) {
        isWorkoutDone = true;
      } else {
        localStorage.removeItem(workoutDoneKey);
      }
    } catch (e) {
      isWorkoutDone = storedWorkoutDone === "true";
    }
  }

  // Add state for loading and error
  const [recording, setRecording] = useState(false);
  const [recordError, setRecordError] = useState(null);

  const [completions, setCompletions] = useState([]);
  useEffect(() => {
    if (!token || !username) return;
    fetch(`${API_BASE_URL}/workout-completions/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCompletions(data.completions || []))
      .catch(err => setCompletions([]));
  }, [token, username]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    // Fetch user preferences as before
    const fetchPreferences = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/userpreferences`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUserPref(data);
        } else {
          setUserPref(null);
        }
      } catch {
        setUserPref(null);
      }
    };
    fetchPreferences();
  }, [token, navigate]);

  // --- REPLACE getPlanContent with shared plan logic ---
  useEffect(() => {
    if (!userPref) return;
    // Debug: log raw userPref
    console.log('[GoalSetting] Raw userPref:', userPref);
    // Normalize userPref
    const normalizedPref = normalizeUserPref(userPref);
    console.log('[GoalSetting] Normalized userPref:', normalizedPref);
    // Use the shared helper to get the plan array
    const planArr = getPlanByUserPref(normalizedPref);
    console.log('[GoalSetting] planArr:', planArr);
    if (!planArr) {
      setPlan({ title: "Custom Plan", workouts: [{ day: "Day 1", routine: "Your custom workout will appear here." }] });
      return;
    }
    setPlan({
      title: `${normalizedPref.level} ${normalizedPref.place ? `(${normalizedPref.place})` : ""} Workout (${normalizedPref.split}/week)`,
      workouts: planArr.map(dayObj => ({
        day: `Day ${dayObj.day}`,
        routine: dayObj.exercises.map(ex => ex.label).join(", ")
      }))
    });
  }, [userPref]);

  // Helper: get workout done status per day for this user
  function getPerDayWorkoutStatus() {
    if (!plan || !username) return [];
    return plan.workouts.map((w, idx) => {
      // Check if this day is in completions
      const done = completions.some(c => c.dayNumber === idx + 1);
      return { day: w.day, done };
    });
  }
  const perDayStatus = getPerDayWorkoutStatus();

  // Automatically increment workout day if current day is done and not at the last day
  useEffect(() => {
    if (!userPref || !completions.length || !plan || !plan.workouts) return;

    // Find the latest completed day
    const latestCompletion = completions.reduce((latest, curr) => {
      return (!latest || curr.dayNumber > latest.dayNumber) ? curr : latest;
    }, null);

    if (!latestCompletion) return;

    // Use createdAt or completedDate
    const completedAt = new Date(latestCompletion.createdAt || latestCompletion.completedDate);
    const now = new Date();
    const hoursPassed = (now - completedAt) / (1000 * 60 * 60);

    // Debug logging
    console.log('DEBUG:', {
      completions,
      latestCompletion,
      completedAt,
      hoursPassed,
      userPrefDay: userPref.day,
      latestCompletionDay: latestCompletion.dayNumber
    });

    // If 0.01 hours (36 seconds) have passed and userPref.day is not already the next day
    if (
      hoursPassed >= 10 && // 10 hours
      userPref.day === latestCompletion.dayNumber &&
      userPref.day < plan.workouts.length // Don't go past last day
    ) {
      const newUserPref = { ...userPref, day: userPref.day + 1 };
      localStorage.setItem("userPref", JSON.stringify(newUserPref));
      setUserPref(newUserPref);
    }
  }, [userPref, completions, plan]);

  // Function to record workout day to backend
  const recordWorkoutDay = async () => {
    setRecording(true);
    setRecordError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/user/userprogresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to record workout day");
      }
      // Optionally update UI or refetch preferences if needed
    } catch (err) {
      setRecordError(err.message);
    } finally {
      setRecording(false);
    }
  };

  // Add function to persist workout progress in the backend
  const recordWorkoutProgress = async (newCurrentDay, completedStatuses) => {
    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`${API_BASE_URL}/user/userprogresses/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ currentDay: newCurrentDay, completedStatuses })
        });
        if (!res.ok) throw new Error((await res.json()).errorMessage);
        const data = await res.json();
        console.log("Persistent progress updated:", data.progress);
    } catch (err) {
        console.error("Error updating progress on backend:", err);
    }
};

  // Add function to check if it's a new day
  const isNewDay = () => {
    const now = new Date();
    const lastDate = lastWorkoutDate ? new Date(lastWorkoutDate) : null;
    
    if (!lastDate) return true;
    
    return now.getDate() !== lastDate.getDate() || 
           now.getMonth() !== lastDate.getMonth() || 
           now.getFullYear() !== lastDate.getFullYear();
  };

  // Add function to handle workout completion
  const handleWorkoutCompletion = async () => {
    const now = new Date();
    const workoutKey = `workout_${username}_${currentWorkoutDay}`;
    
    // Store completion with expiry at next midnight
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    localStorage.setItem(workoutKey, JSON.stringify({
      completed: true,
      expiry: tomorrow.getTime()
    }));
    
    setLastWorkoutDate(now.toISOString());
    
    // If user has more workouts per week, increment the day
    if (userPref && userPref.days) {
      const workoutFrequency = parseInt(userPref.days.split('x')[0]);
      if (currentWorkoutDay < workoutFrequency) {
        setCurrentWorkoutDay(prev => prev + 1);
      } else {
        // Reset to day 1 on Monday at midnight
        const isMonday = now.getDay() === 1;
        if (isMonday) {
          setCurrentWorkoutDay(1);
        }
      }
    }
    
    // Update backend
    await recordWorkoutDay();
  };

  // Add effect to check workout status on load
  useEffect(() => {
    if (!username) return;
    
    const checkWorkoutStatus = () => {
      const workoutKey = `workout_${username}_${currentWorkoutDay}`;
      const storedWorkout = localStorage.getItem(workoutKey);
      
      if (storedWorkout) {
        const { completed, expiry } = JSON.parse(storedWorkout);
        if (expiry < Date.now()) {
          localStorage.removeItem(workoutKey);
        }
      }
    };
    
    checkWorkoutStatus();
    
    // Check every minute for midnight
    const interval = setInterval(() => {
      if (isNewDay()) {
        checkWorkoutStatus();
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [username, currentWorkoutDay]);

  // Ensure userPref.day is always set (default to 1 if undefined or null)
  useEffect(() => {
    if (userPref && (userPref.day === undefined || userPref.day === null)) {
      const newUserPref = { ...userPref, day: 1 };
      localStorage.setItem("userPref", JSON.stringify(newUserPref));
      setUserPref(newUserPref);
    }
  }, [userPref]);

  return (
    <div>
      {/* Background and overlay */}
      <div className="background-container" style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        // Use fetched image if available, else fallback to original URL
        background: `url('${exerciseImage ? exerciseImage : "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"}') no-repeat center center/cover`,
        filter: "blur(10px)", zIndex: 1
      }}></div>
      <div className="overlay" style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(10, 25, 60, 0.6)",
        zIndex: 2
      }}></div>

      {/* Navbar */}
      <nav className={styles.navbar} style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        background: "rgba(20, 40, 80, 0.95)",
        padding: "0 40px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px", width: "100%" }}>
          <h1 className={styles.logo} style={{
            fontSize: "24px",
            color: "#ffffff",
            fontWeight: "bold",
            margin: 0
          }}>
            Welcome to <span style={{ color: "#4da6ff" }}>FitnessPro</span>
          </h1>
          <div className={styles["nav-buttons"]} style={{
            display: "flex",
            gap: "20px",
            margin: 0
          }}>
            <button
              style={{
                background: "#4da6ff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/workout-progress")}
            >
              Progress
            </button>
            <button
              style={{
                background: "#4da6ff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              style={{
                background: "#4da6ff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/search")}
            >
              Search
            </button>
            <button
              style={{
                background: "#4da6ff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onClick={() => navigate("/diet-plan")}
            >
              Food Guide
            </button>
          </div>
          <div style={{ flex: 1 }}></div>
          <button
            style={{
              background: "#4da6ff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
              marginRight: "50px"
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Sidebar with per-day workout status indicator */}
      {perDayStatus.length > 0 && (
        <div className={styles.sidebar}>
          <div style={{fontWeight: 600, marginBottom: 10, fontSize: "1.13rem"}}>Workout Completion</div>
          <ul style={{paddingLeft: 0, margin: 0, listStyle: "none"}}>
            {perDayStatus.map((d, idx) => (
              <li key={d.day} style={{marginBottom: 8, display: "flex", alignItems: "center"}}>
                <span style={{fontWeight: 500, minWidth: 70, display: "inline-block"}}>{d.day}:</span>
                {d.done
                  ? <span style={{color: "#38a169", fontWeight: 700, marginLeft: 6}}>✅ Done</span>
                  : <span style={{color: "#e53e3e", fontWeight: 700, marginLeft: 6}}>❌ Not Done</span>
                }
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Card */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" // <-- add this to stack main and below container
      }}>
        <main
          style={{
            background: "rgba(20, 40, 80, 0.95)",
            borderRadius: "20px",
            padding: "48px 48px 40px 48px",
            minWidth: "500px",
            maxWidth: "700px",
            width: "100%",
            boxShadow: "0 6px 32px rgba(0,0,0,0.30)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px"
          }}
        >
          <h2 style={{
            alignSelf: "flex-start",
            marginBottom: "18px",
            color: "white",
            fontSize: "2.4rem",
            fontWeight: 700,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "18px"
          }}>
            {userPref ? (
              <>
                {userPref.level === "Beginner" ? "Beginner Workout" : "Advanced Workout"}
                {isWorkoutDone && (
                  <span style={{
                    color: "#38a169",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginLeft: "12px",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <span style={{
                      fontSize: "1.3rem",
                      marginRight: "4px"
                    }}>✅</span>
                    Workout Done
                  </span>
                )}
              </>
            ) : (
              "Workout"
            )}
          </h2>
          <div
            style={{
              width: "100%",
              maxWidth: "690px",
              textAlign: "left",
              background: "rgba(30, 50, 100, 0.85)",
              borderRadius: "14px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              boxSizing: "border-box",
              padding: "40px 36px",
              fontSize: "1.35rem",
              color: "white",
              fontWeight: 500,
              alignItems: "flex-start"
            }}
          >
            <div style={{ marginBottom: "18px" }}>
              <strong>Plan:</strong> {plan ? plan.title : "Loading..."}
            </div>
            <div>
              <strong>Workout Routine:</strong>
              <ul style={{ marginTop: "10px" }}>
                {plan && plan.workouts.map((w, idx) => (
                  <li key={idx}>
                    <strong>{w.day}:</strong> {w.routine}
                  </li>
                ))}
              </ul>
            </div>
            <button
              style={{
                fontSize: "1.3rem",
                padding: "18px 0",
                width: "80%",
                maxWidth: "350px",
                alignSelf: "center",
                marginTop: "24px",
                borderRadius: "10px",
                fontWeight: 700,
                background: "#38a169",
                color: "white",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: recording ? "not-allowed" : "pointer",
                opacity: recording ? 0.7 : 1
              }}
              onClick={() => {
                navigate("/exercise-info");
              }}
              disabled={recording}
            >
              {recording ? "Recording..." : "Start Workout"}
            </button>
            {recordError && (
              <div style={{ color: "#e53e3e", marginTop: 10 }}>
                {recordError}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default GoalSetting;
