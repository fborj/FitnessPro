import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginSignup.module.css"; // Import modular CSS
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { API_BASE_URL } from "../../config"; // Import the backend URL
import logo from "../Assets/logo fitness.png"; // Import your logo

const LoginSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Sign In
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const trimmedEmail = formData.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("[Login] Login response data:", data);

      if (response.ok) {
        // Save username to localStorage with both keys for backward compatibility
        if (data.user && data.user.name) {
          console.log("[Login] Saving username to localStorage:", data.user.name);
          localStorage.setItem("username", data.user.name);
          localStorage.setItem("userName", data.user.name);
        } else {
          console.warn("[Login] No username found in response data.user");
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        navigate("/goal-setting"); // Redirect to goal-setting page
      } else {
        console.error("[Login] Login error:", data.message);
        alert(data.message || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("[Login] An error occurred during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleCreateAccount = async () => {
    const trimmedEmail = formData.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      console.log("[Signup] Sending signup request:", { name: formData.name, email: trimmedEmail });
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: trimmedEmail,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("[Signup] Signup response:", data);

      if (response.ok) {
        setSignupSuccess(true);
        setSignupMessage(data.message);
        // Store email and userId for verification page
        localStorage.setItem("pendingVerificationEmail", trimmedEmail);
        if (data.user && data.user._id) {
          localStorage.setItem("userId", data.user._id);
        }
        // Navigate to verification page
        navigate("/verify-email");
      } else {
        alert(data.message || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("[Signup] An error occurred during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* New left section with welcome message and logo */}
      <div className={styles.welcomeSection}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>
        <div className={styles.welcomeText} style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            color: '#4da6ff',
            marginBottom: '-2rem',
            marginTop: '1rem',
            fontWeight: 'bold'
          }}>
            Welcome to <span style={{ color: '#f97316'}}>FitnessPro</span>
          </h1>
        </div>
        <p style={{textAlign: 'center', fontWeight: "bold", marginTop: '3rem'}}> Track your goals, build better habits, and achieve more with our powerful Fitness Platform. Join our community of achievers today! </p>
      <div className={styles.backToHome}>
      <p className={styles.backToHome}>
            Go back to <span onClick={() => navigate("/")}>Homepage</span> </p>
      </div>
      </div>

      {/* Your existing auth container */}
      <div className={styles.authSection}>
        <div className={styles.authBox}>
          <div className={styles.rightPanel}>
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            <div className={styles.inputs}>
              {isSignUp && (
                <div className={styles.input}>
                  <img src={user_icon} alt="Username Icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className={styles.input}>
                <img src={email_icon} alt="Email Icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input}>
                <img src={password_icon} alt="Password Icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {isSignUp ? (
              <button
                type="button"
                className={styles.createAccountBtn}
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            ) : (
              <>
                <p className={styles.forgotPassword}>
                  Forgot Password? <span onClick={() => navigate("/forgot-password")}>Click Here</span>
                </p>
                <button className={styles.submit} onClick={handleLogin}>
                  Sign In
                </button>
              </>
            )}
            <p className={styles.switchMode}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;