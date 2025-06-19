import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import UnitConverter from "../../components/UnitConverter/UnitConverter";
import "./Setup.css";

const Setup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userSetup, setUserSetup] = useState({
    firstName: "",
    lastName: "",
    username: localStorage.getItem("username") || "", // Pre-fill from signup
    height: "",
    weight: "",
    birthday: "", // Add birthday field
    gender: "", // Default gender
  });
  const [showTermsPopup, setShowTermsPopup] = useState(false); // Initially hidden
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserSetup({ ...userSetup, [name]: value });
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Show terms popup if not already agreed
    if (!agreedToTerms) {
      setShowTermsPopup(true);
      return;
    }

    setLoading(true);

    // Validate all fields are filled
    if (
      !userSetup.firstName.trim() ||
      !userSetup.lastName.trim() ||
      !userSetup.username.trim() ||
      !userSetup.height.trim() ||
      !userSetup.weight.trim()
    ) {
      setError("All fields are required. Please fill out the form completely.");
      setLoading(false);
      return;
    }

    // Validate userId exists
    if (!userId) {
      setError("User ID not found. Please try logging in again.");
      setLoading(false);
      return;
    }

    // --- Save isMinor flag in localStorage if user is a minor ---
    let isMinor = false;
    if (userSetup.birthday) {
      const birthYear = new Date(userSetup.birthday).getFullYear();
      const nowYear = new Date().getFullYear();
      if (nowYear - birthYear < 18) {
        isMinor = true;
        localStorage.setItem("isMinor", "true");
      } else {
        localStorage.removeItem("isMinor");
      }
    }

    try {
      console.log("Setup data:", { userId, ...userSetup }); // Debug log
      const response = await fetch(`${API_BASE_URL}/setup/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSetup),
      });

      const data = await response.json();
      console.log("Setup response:", data);
      
      // Log all response headers for debugging
      console.log("Response headers:");
      response.headers.forEach((value, key) => {
          console.log(key + ": " + value);
      });
      
      if (!response.ok) {
        throw new Error(data.message || "Setup failed");
      }
      
      // Save username to localStorage with both keys for consistency
      if (data.user && data.user.name) {
        console.log("[Setup] Saving username to localStorage:", data.user.name);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userName", data.user.name);
      } else {
        console.warn("[Setup] No username found in response data.user");
      }
      // Attempt to retrieve token from data or common header keys
      const token = data.token || 
                    response.headers.get("authorization") || 
                    response.headers.get("x-access-token");
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored:", token);
      } else {
        console.log("No token found in response data or headers");
      }
      alert("Profile setup completed successfully!");
      navigate("/user-preference"); // Redirect to UserPreference after setup
    } catch (error) {
      console.error("Setup error:", error);
      setError(error.message || "Failed to complete setup");
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeAndSubmit = () => {
    if (!agreedToTerms) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }
    setAgreedToTerms(true);
    setShowTermsPopup(false);
    handleSetupSubmit(new Event("submit")); // Trigger form submission
  };

  const handleSetupComplete = () => {
    // Logic for completing setup
    navigate('/user-preference'); 
  };

  return (
    <div className="setup-container">
      <h2>Complete Your Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading...</div>}
      <form onSubmit={handleSetupSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userSetup.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userSetup.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userSetup.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={userSetup.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>
        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            step="0.01" // Allow decimals
            name="height"
            value={userSetup.height}
            onChange={handleInputChange}
            min="0"
            max="300"
            placeholder="Enter height in centimeters"
          />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.01" // Allow decimals
            name="weight"
            value={userSetup.weight}
            onChange={handleInputChange}
            min="0"
            max="250"
          />
        </div>
        <div className="form-group">
          <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={userSetup.birthday}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-save" disabled={loading}>
          Save Profile
        </button>
      </form>

      {/* Terms and Conditions Popup */}
      {showTermsPopup && (
        <div className="terms-popup">
          <div className="terms-content">
            <h3>Terms and Conditions</h3>
            <p style={{ textAlign: "left" }}>
              Welcome to FitnessPro! By accessing our facilities, participating
              in our programs, or using our services, you agree to the
              following Terms and Conditions:
            </p>
            <p style={{ textAlign: "left" }}>
              Assumption of Risk: You acknowledge and voluntarily assume full
              responsibility for all inherent risks associated with FitnessPro
              activities and facility use, including potential injury, illness,
              death, or property damage.{" "}
            </p>
            <p style={{ textAlign: "left" }}>
              Health Representation: You confirm you are in good physical
              condition suitable for exercise and acknowledge FitnessPro
              strongly recommends consulting a physician beforehand as no
              medical advice is provided by us.{" "}
            </p>
            <p style={{ textAlign: "left" }}>
              Waiver and Release of Liability: To the fullest extent permitted
              by law, you waive, release, and discharge FitnessPro and its
              representatives from all liability for any injury, illness,
              death, or property damage sustained in connection with your
              presence or activities at FitnessPro, even if arising from
              negligence.
            </p>
            <p style={{ textAlign: "left" }}>
              Personal Property: FitnessPro is not responsible for the loss,
              theft, or damage of any personal property brought onto the
              premises.
            </p>
            <p style={{ textAlign: "left" }}>
              Agreement: By signing up, you confirm you have read, understood,
              and voluntarily agree to all these Terms and Conditions, including
              the Assumption of Risk and Waiver of Liability.
            </p>

            {/* Parent/Guardian Consent for Minors */}
            {new Date().getFullYear() -
              new Date(userSetup.birthday).getFullYear() <
              18 && (
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="parentConsent"
                  checked={userSetup.parentConsent || false}
                  onChange={(e) =>
                    setUserSetup({
                      ...userSetup,
                      parentConsent: e.target.checked,
                    })
                  }
                />
                <label htmlFor="parentConsent">
                  As parent/legal guardian, I agree to all FitnessPro Terms &
                  Conditions (including Risk Assumption & Liability Waiver) for
                  the named minor and consent to their participation and
                  facility use.
                </label>
              </div>
            )}

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="agreeToTerms">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              className="btn btn-agree"
              onClick={handleAgreeAndSubmit}
              disabled={
                !agreedToTerms ||
                (new Date().getFullYear() -
                  new Date(userSetup.birthday).getFullYear() <
                  18 &&
                  !userSetup.parentConsent)
              }
            >
              Submit
            </button>
            <button
              className="btn btn-close"
              onClick={() => setShowTermsPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <UnitConverter allowNegative={false} />
      
    </div>
  );
};

export default Setup;
