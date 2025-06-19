import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserPreference.css";

const API_BASE_URL = "http://localhost:8080/api"; 
function App() {
  const [formData, setFormData] = useState({
    level: "Beginner",
    place: "Home",
    days: "1x a week", // Changed to match select options
  });
  const [isMinor, setIsMinor] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getUserIdFromToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    // Debug: log what is in localStorage
    const setupRaw = localStorage.getItem("userSetup");
    console.log("userSetup from localStorage:", setupRaw);
    const setup = JSON.parse(setupRaw || "{}");
    let minor = false;
    if (setup.birthday) {
      const birthYear = new Date(setup.birthday).getFullYear();
      const nowYear = new Date().getFullYear();
      if (nowYear - birthYear < 18) {
        minor = true;
      }
    }
    // Fallback: check isMinor flag
    if (localStorage.getItem("isMinor") === "true") {
      minor = true;
    }
    setIsMinor(minor);
    if (minor) {
      setFormData(prev => ({ ...prev, level: "Beginner" }));
    }
    if (!token) {
      console.error("No token found in localStorage");
      alert("Please log in first");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    // Prevent changing level to Advanced for minors
    if (e.target.name === "level" && isMinor && e.target.value === "Advanced") {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveData = async () => {
    try {
      const id = getUserIdFromToken(token);
      if (!id) {
        alert("Invalid token. Please login again.");
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/userpreferences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log the confirmation message in the browser's console
        // Set userPref in localStorage for ExerciseInfo page
        const program =
          formData.level === "Beginner"
            ? (formData.place === "Home" ? "Beginner (Home)" : "Beginner")
            : (formData.place === "Home" ? "Advanced (Home)" : "Advanced (Gym)");
        // Convert days like "2x a week" to "2x"
        const split = (formData.days || "1x a week").split("x")[0] + "x";
        localStorage.setItem(
          "userPref",
          JSON.stringify({
            program,
            split,
            day: 1 // Always start at day 1 after setting preferences
          })
        );
        navigate("/goal-setting");
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || "Failed to save preferences";
        console.error("Error saving preferences:", errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred while saving preferences:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div
        className="background-container"></div>
      <div className="overlay"></div>

      <nav className="navbar">
        <h1 className="welcome-text">
          Welcome to <span>FitnessPro</span>
        </h1>
        <div className="nav-buttons">
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button
            onClick={() => {
              localStorage.removeItem("token"); // Clear token on sign out
              navigate("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <main
          className="main-content"
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
            textAlign: "left"
          }}>
            User Preference
          </h2>
          <div
            className="goal-form"
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
            <div className="input-group" style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "white",
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              width: "100%",
              marginBottom: "8px",
              gap: "18px"
            }}>
              <label style={{ minWidth: "220px", marginBottom: 0 }}>
                <strong>Experience Level:</strong>
              </label>
              <select
                name="level"
                value={formData.level || ""}
                onChange={handleChange}
                style={{ fontSize: "1.1rem", width: "100%", padding: "8px" }}
                disabled={isMinor} // Prevent changing for minors
                title={isMinor ? "Advanced level is not available for users under 18" : ""}
              >
                <option value="Beginner">Beginner</option>
                {/* Remove Advanced completely for minors */}
                {!isMinor && <option value="Advanced">Advanced</option>}
              </select>
              {isMinor && (
                <div style={{ 
                  fontSize: "0.95rem", 
                  color: "#ffd700", 
                  marginTop: "6px",
                  fontStyle: "italic"
                }}>
                  Advanced level is not available for minors for their safety.
                </div>
              )}
            </div>
            <div className="input-group" style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "white",
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              width: "100%",
              marginBottom: "8px",
              gap: "18px"
            }}>
              <label style={{ minWidth: "220px", marginBottom: 0 }}>
                <strong>Preferred Place to Workout:</strong>
              </label>
              <select
                name="place"
                value={formData.place || ""}
                onChange={handleChange}
                style={{ fontSize: "1.1rem", width: "100%", padding: "8px" }}
              >
                <option value="Home">Home</option>
                <option value="Gym">Gym</option>
              </select>
            </div>
            <div className="input-group" style={{
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "white",
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              width: "100%",
              marginBottom: "8px",
              gap: "18px"
            }}>
              <label style={{ minWidth: "220px", marginBottom: 0 }}>
                <strong>Workout Availability:</strong>
              </label>
              <select
                name="days"
                value={formData.days || ""}
                onChange={handleChange}
                style={{ fontSize: "1.1rem", width: "100%", padding: "8px" }}
              >
                <option value="1x a week">1x a week</option>
                <option value="2x a week">2x a week</option>
                <option value="3x a week">3x a week</option>
                <option value="4x a week">4x a week</option>
                <option value="5x a week">5x a week</option>
              </select>
            </div>
            <button
              className="record-btn"
              onClick={handleSaveData}
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
                cursor: "pointer"
              }}
            >
              Save Preferences
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;