import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./VerifyEmail.module.css";
import { API_BASE_URL } from "../../config";
import logo from "../Assets/logo fitness.png";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the pending email and userId from localStorage
    const email = localStorage.getItem("pendingVerificationEmail");
    const id = localStorage.getItem("userId");
    if (email) {
      setPendingEmail(email);
    }
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        // If no token, show the initial verification message
        setVerificationStatus("initial");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setVerificationStatus("success");
          // Clear the pending email from localStorage
          localStorage.removeItem("pendingVerificationEmail");
        } else {
          setVerificationStatus("error");
          setErrorMessage(data.message || "Verification failed");
        }
      } catch (error) {
        setVerificationStatus("error");
        setErrorMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [location.search]);

  const handleContinueToSetup = () => {
    if (userId) {
      navigate(`/setup/${userId}`);
    } else {
      // If no userId found, go to login
      navigate("/login");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.welcomeSection}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>
        <div className={styles.welcomeText}>
          <h1>Email <span style={{ color: '#f97316'}}>Verification</span></h1>
        </div>
      </div>

      <div className={styles.authSection}>
        <div className={styles.authBox}>
          <div className={styles.rightPanel}>
            {verificationStatus === "initial" && (
              <div className={styles.message}>
                <h2>Check Your Email</h2>
                <p>
                  We've sent a verification link to {pendingEmail ? <strong>{pendingEmail}</strong> : "your email address"}.
                  Please check your inbox and click the link to verify your account.
                </p>
                <p className={styles.instructions}>
                  If you don't see the email, please check your spam folder.
                </p>
                <button 
                  className={styles.submit} 
                  onClick={() => navigate("/login")}
                >
                  Return to Login
                </button>
              </div>
            )}

            {verificationStatus === "verifying" && (
              <div className={styles.message}>
                <h2>Verifying Your Email</h2>
                <p>Please wait while we verify your email address...</p>
              </div>
            )}

            {verificationStatus === "success" && (
              <div className={styles.message}>
                <h2>Email Verified Successfully!</h2>
                <p>Your email has been verified. Let's complete your profile setup to get started.</p>
                <button 
                  className={styles.submit} 
                  onClick={handleContinueToSetup}
                >
                  Continue to Profile Setup
                </button>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className={styles.message}>
                <h2>Verification Failed</h2>
                <p>{errorMessage}</p>
                <button 
                  className={styles.submit} 
                  onClick={() => navigate("/login")}
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

export default VerifyEmail; 