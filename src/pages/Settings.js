import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [name, setName] = useState('Jane');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [goal, setGoal] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);
  const handleGoalChange = (e) => setGoal(e.target.value);

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>

        {/* Profile Section */}
        <div className="settings-section">
          <h3>Your Profile</h3>
          <p>Choose how you are displayed.</p>
          <div className="profile-content">
            <div className="profile-details">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="settings-input"
              />
            </div>
            <div className="profile-picture-section">
              <label>Profile Picture</label>
              <div className="profile-picture">
                <img src="https://via.placeholder.com/100" alt="Profile" />
              </div>
            </div>
          </div>
        </div>

        {/* Email and Phone Section */}
        <div className="settings-section">
          <h3>Email and Phone</h3>
          <p>Manage the email and phone you use to sign into Bunchful Sales Portal.</p>
          <div className="contact-inputs">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="settings-input"
              placeholder="Enter your email"
            />
            <button className="update-btn">Update</button>
          </div>
          <div className="contact-inputs">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="settings-input"
              placeholder="Enter your phone number"
            />
            <button className="update-btn">Update</button>
          </div>
          <p className="security-notice">
            For your security, we will send you a code to verify any change to your email or phone number.
          </p>
        </div>

        {/* Goal Section */}
        <div className="settings-section">
          <h3>Goal</h3>
          <p>Set your personal goal.</p>
          <input
            type="text"
            value={goal}
            onChange={handleGoalChange}
            className="settings-input"
            placeholder="Set your goal"
          />
        </div>

        <div className="save-changes-container">
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;