import React, { useEffect, useState } from "react";
import styles from "./workout-progress.module.css";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const getWeekOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
};

const getWeeksInMonth = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return getWeekOfMonth(lastDay);
};

const WorkoutProgress = () => {
  const username = localStorage.getItem("username");
  const userPref = JSON.parse(localStorage.getItem("userPref") || "{}");
  const daysPerWeek = userPref.split
    ? parseInt((userPref.split.match(/\d+/) || [1])[0])
    : userPref.days
      ? parseInt((userPref.days.match(/\d+/) || [1])[0])
      : 1;

  const [daysDone, setDaysDone] = useState(0);
  const [weeksCompleted, setWeeksCompleted] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [completionDates, setCompletionDates] = useState([]);
  const [currentWeekCount, setCurrentWeekCount] = useState(0);

  const navigate = useNavigate();

  // Fetch overall progress (daysCompleted) and completionDates from backend
  useEffect(() => {
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
        setDaysDone(data.daysCompleted);
        setCompletionDates(data.completionDates || []);
      })
      .catch(err => {
        console.error("Error fetching progress:", err);
      });
  }, []);

  // Calculate weekly progress based on completionDates (real calendar week)
  useEffect(() => {
    // Get start of current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
    const diffToMonday = (dayOfWeek + 6) % 7; // 0 if Mon, 1 if Tue, ...
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - diffToMonday);

    // Count completions in current week
    const count = completionDates.filter(dateStr => {
      const d = new Date(dateStr);
      return d >= monday && d <= now;
    }).length;
    setCurrentWeekCount(count);
    setWeeklyProgress(Math.min(count / daysPerWeek, 1));

    // Calculate weeks completed (all time)
    const weeksMetGoal = Math.floor(daysDone / daysPerWeek);
    setWeeksCompleted(weeksMetGoal);
  }, [completionDates, daysDone, daysPerWeek]);

  const totalWeeks = getWeeksInMonth();
  const monthlyProgressPercent = totalWeeks ? Math.round((weeksCompleted / totalWeeks) * 100) : 0;
  const weeklyProgressPercent = Math.round(weeklyProgress * 100);

  return (
    <div className={styles.progressBg}>
      <div className={styles.progressCard}>
        <h1 className={styles.progressTitle}>Workout Progress</h1>
        <div className={styles.progressInfo}>
          {daysDone > 0 ? (
            <>
              <span className={styles.progressDone}>{daysDone}</span>
              <span style={{ marginLeft: 8 }}>days completed</span>
            </>
          ) : (
            <>No workout days tracked yet.</>
          )}
        </div>
        {/* Weekly Progress Bar */}
        <div style={{ marginTop: 32, width: "100%" }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Weekly Progress ({weeklyProgressPercent}%)
          </div>
          <div className={styles.progressBarOuter}>
            <div className={styles.progressBarInner} style={{ width: `${weeklyProgressPercent}%`, background: "#3182ce" }} />
          </div>
          <div style={{ fontSize: "1rem", color: "#fff" }}>
            {currentWeekCount} / {daysPerWeek} days this week
          </div>
        </div>
        {/* Monthly Progress Bar */}
        <div style={{ marginTop: 32, width: "100%" }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Monthly Progress</div>
          <div className={styles.progressBarOuter}>
            <div className={styles.progressBarInner} style={{ width: `${monthlyProgressPercent}%` }} />
          </div>
          <div style={{ fontSize: "1rem", color: "#fff" }}>
            {weeksCompleted} / {getWeeksInMonth()} weeks completed ({monthlyProgressPercent}%)
          </div>
        </div>
        <button className={styles.progressBackBtn} onClick={() => navigate('/goal-setting')}>
          Back
        </button>
      </div>
    </div>
  );
};

export default WorkoutProgress;
