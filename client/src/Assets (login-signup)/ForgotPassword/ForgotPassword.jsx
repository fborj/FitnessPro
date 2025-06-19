import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { API_BASE_URL } from "../../config";
import logo from "../Assets/logo fitness.png";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email input, 2: success message
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    token: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Detect token in URL and set in formData
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setFormData((prev) => ({ ...prev, token }));
      setStep(3); // 3: reset password form
    }
  }, [location.search]);

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate password as user types
    if (name === "newPassword") {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    const trimmedEmail = formData.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset instructions have been sent to your email.");
        setStep(2);
      } else {
        alert(data.message || "Failed to process request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    if (!formData.token) {
      alert("Reset token is missing. Please request a new password reset.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: formData.token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password has been reset successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.welcomeSection}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>
        <div className={styles.welcomeText}>
          <h1>Reset Your <span style={{ color: '#f97316'}}>Password</span></h1>
        </div>
        <div className={styles.backToHome}>
          <p>
            Go back to <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>

      <div className={styles.authSection}>
        <div className={styles.authBox}>
          <div className={styles.rightPanel}>
            {formData.token && step === 3 ? (
              <>
                <h2>Set New Password</h2>
                <p className={styles.instructions}>
                  Enter your new password below.
                </p>
                <div className={styles.inputs}>
                  <div className={styles.input}>
                    <img src={password_icon} alt="Password Icon" />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {passwordError && (
                    <p className={styles.errorMessage}>{passwordError}</p>
                  )}
                  <div className={styles.input}>
                    <img src={password_icon} alt="Password Icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button 
                  className={styles.submit} 
                  onClick={handleResetPassword}
                  disabled={!!passwordError}
                >
                  Reset Password
                </button>
              </>
            ) : step === 1 ? (
              <>
                <h2>Forgot Password</h2>
                <p className={styles.instructions}>
                <p style={{textAlign: 'center', fontWeight: "bold", color:"white", fontSize: "13px"}}>Enter your email address and we'll send you instructions to reset your password.</p>
                </p>
                <div className={styles.inputs}>
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
                </div>
                <button className={styles.submit} onClick={handleForgotPassword}>
                  Send Reset Instructions
                </button>
              </>
            ) : (
                <div className={styles.successMessage}>
                <h2>Check Your Email</h2>
                <p className={styles.instructions}>
                  We've sent password reset instructions to your email address. Please check your inbox and follow the link to reset your password.
                </p>
                <button 
                  className={styles.submit} 
                  onClick={() => navigate("/login")}
                  style={{ marginTop: "20px" }}
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 