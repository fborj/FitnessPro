import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './userConfig.css';
import { API_BASE_URL } from "../../config";
import UnitConverter from '../../components/UnitConverter/UnitConverter';

const UserConfig = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: '', // Revert back to 'username'
    firstName: '',
    lastName: '',
    height: '',
    weight: '',
    bmi: '',
    bmiCategory: '',
    birthday: '', // Add birthday field
    gender: '', // Add gender to state
  });
  const [completedGoals, setCompletedGoals] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [bmiProgress, setBmiProgress] = useState([]); // Add state for BMI progress
  const [canEditBMI, setCanEditBMI] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
      return;
    }
    fetchUserProfile();
    fetchCompletedGoals();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setUserProfile(prev => ({
        ...data,
        username: data.username || 'N/A', // Fetch 'username' from the correct field
        height: data.height || "N/A",
        birthday: data.birthday || "N/A",
        gender: data.gender || "N/A", // Fetch gender
      }));
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompletedGoals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/completed-goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch completed goals');
      }

      const data = await response.json();
      setCompletedGoals(data.completedGoals);
    } catch (error) {
      console.error("Error fetching completed goals:", error);
    }
  };

  const calculateBMI = () => {
    const heightInMeters = parseFloat(userProfile.height || 0) / 100;
    const weightInKg = parseFloat(userProfile.weight || 0);
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      let bmiCategory = "";

      if (bmiValue < 18.5) {
        bmiCategory = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        bmiCategory = "Normal";
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        bmiCategory = "Overweight";
      } else if (bmiValue >= 30 && bmiValue < 34.9) {
        bmiCategory = "Obese";
      } else {
        bmiCategory = "Extremely Obese";
      }

      return { value: bmiValue, category: bmiCategory };
    }
    return { value: "N/A", category: "N/A" };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === "firstName" || name === "lastName") && /[^a-zA-Z\s]/.test(value)) {
      return;
    }

    if (name === "weight" && value < 1) {
      return;
    }

    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  // Fetch BMI progress from backend
  const fetchBmiProgress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/bmi-progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch BMI progress');
      const data = await response.json();
      setBmiProgress(data);

      // Check the date of the latest BMI entry (assuming latest is first)
      if (data.length > 0) {
        // If not sorted, sort by date descending
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastEntryDate = new Date(sorted[0].date);
        const currentDate = new Date();
        const daysDifference = Math.floor((currentDate - lastEntryDate) / (1000 * 60 * 60 * 24));
        setCanEditBMI(daysDifference >= 3);
      } else {
        setCanEditBMI(true); // No entries, allow editing
      }
    } catch (err) {
      setBmiProgress([]);
      setCanEditBMI(true); // On error, allow editing
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchBmiProgress();
    }
  }, [userId]);

  // Separate handler for BMI update
  const handleBmiUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!canEditBMI) return;
    // Update user profile height/weight as before
    const bmiUpdatePayload = {
      height: userProfile.height,
      weight: userProfile.weight,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/update/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bmiUpdatePayload)
      });
      if (!response.ok) throw new Error('Failed to update BMI');
      // Save BMI progress to backend
      const currentBmi = calculateBMI();
      if (currentBmi.value !== "N/A") {
        await fetch(`${API_BASE_URL}/user/bmi-progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bmiValue: currentBmi.value })
        });
        await fetchBmiProgress();
      }
      setCanEditBMI(false);
      setSuccess('BMI updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
      await fetchUserProfile();
    } catch (error) {
      setError('Failed to update BMI. Please try again.');
    }
  };

  // Update handleSubmit to only update profile fields, not BMI or restriction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Only include profile fields, not BMI-related fields or birthday
    const profileUpdatePayload = {
      username: userProfile.username,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/update/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileUpdatePayload)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Save username to localStorage if changed
      if (userProfile.username) {
        console.log("[Profile] Saving username to localStorage:", userProfile.username);
        localStorage.setItem("username", userProfile.username);
        localStorage.setItem("userName", userProfile.username);
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
      await fetchUserProfile(); // Refresh profile data
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setError(null);
    fetchUserProfile();
    console.log('Profile update canceled');
  };

  const clearBmiProgress = () => {
    localStorage.removeItem(`bmiProgress_${userId}`); // Remove BMI progress for the current user
    setBmiProgress([]); // Clear the state
    console.log("BMI progress cleared for the current user.");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <h1 className="welcome-text" style={{ margin: 0 }}>
            Welcome to <span>FitnessPro</span>
          </h1>
          <div className="nav-buttons" style={{ display: "flex", gap: "20px", margin: 0 }}>
            <button onClick={() => navigate('/goal-setting')}>Homepage</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              navigate('/login');
            }}>Sign out</button>
          </div>
        </div>
      </nav>

      <div className="profile-details-container" style={{ zIndex: 1000 }}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <h3 style={{ color: 'white', textAlign: 'center' }}>User Details</h3>
        <div className="vital-stats" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
          <p><strong>First Name:</strong> {userProfile.firstName}</p>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Gender:</strong> {userProfile.gender || "N/A"}</p>
          <p><strong>Height:</strong> {userProfile.height || "N/A"} cm</p>
          <p><strong>Weight:</strong> {userProfile.weight || "N/A"} kg</p>
          <p><strong>BMI:</strong> {calculateBMI().value}</p>
          <p><strong>BMI Category:</strong> {calculateBMI().category}</p>
          <p>
            <strong>Age:</strong> {userProfile.birthday ? 
              Math.floor((new Date() - new Date(userProfile.birthday)) / (365.25 * 24 * 60 * 60 * 1000)) 
              : "N/A"}
          </p>
        </div>
        <div className="BMIprogress-container" style={{ zIndex: 1000 }}>
          <h3 style={{ marginBottom: '15px', textAlign: 'center', paddingTop: '20px' }}>BMI Progress</h3>
          <div className="bmi-progress-text" style={{ marginTop: '15px', fontSize: '16px', marginLeft: '10px' }}>
            {calculateBMI().value !== "N/A" ? `Current BMI: ${calculateBMI().value}` : "No Data"}
          </div>
          <div className="bmi-progress-date" style={{ marginTop: '10px', fontSize: '14px', marginLeft: '10px' }}>
            {`Date: ${new Date().toLocaleDateString()}`}
          </div>
          {bmiProgress.length > 0 ? (
            <ul>
              {bmiProgress.slice(0, 5).map((entry, index) => (
                <li key={entry._id || index} style={{ marginBottom: '10px', fontSize: '14px' }}>
                  <strong>BMI:</strong> {entry.bmiValue} <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ marginTop: '15px', fontSize: '16px' }}>No BMI progress recorded yet.</div>
          )}
        </div>
      </div>
      <div className="profile-update-container" style={{ zIndex: 1000 }}>
        <h3 style={{ color:'white', textAlign: 'center', fontSize: '40px', margin:'-5px', marginBottom:'15px'}}>Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userProfile.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userProfile.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-save">Save Changes</button>
          </div>
        </form>
      </div>

      <UnitConverter />

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <h3>BMI</h3>
        <form onSubmit={handleBmiUpdate}>
          <div className="form-group">
            <label htmlFor="sidebar-height">Height (cm)</label>
            <input
              type="number"
              id="sidebar-height"
              name="height"
              value={userProfile.height}
              onChange={handleInputChange}
              min="0"
              max="300"
              disabled={!canEditBMI} // Disable input if BMI cannot be edited
            />
          </div>
          <div className="form-group">
            <label htmlFor="sidebar-weight">Weight (kg)</label>
            <input
              type="number"
              id="sidebar-weight"
              name="weight"
              value={userProfile.weight}
              onChange={handleInputChange}
              disabled={!canEditBMI} // Disable input if BMI cannot be edited
            />
          </div>
          <div className="form-group">
            <label htmlFor="sidebar-bmi">BMI</label>
            <input
              type="text"
              id="sidebar-bmi"
              value={calculateBMI().value}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="sidebar-bmi-category">BMI Category</label>
            <input
              type="text"
              id="sidebar-bmi-category"
              value={calculateBMI().category}
              readOnly
            />
          </div>
          {!canEditBMI && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              You can update your BMI again in 3 days.
            </p>
          )}
          <button className="btn btn-save" type="submit" disabled={!canEditBMI}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserConfig;