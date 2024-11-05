import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`settings-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>

        {/* Password Section */}
        <div className="settings-section">
          <h3>Password</h3>
          <p>Change your password.</p>
          <div className="password-inputs">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="settings-input"
              placeholder="Current password"
            />
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="settings-input"
              placeholder="New password"
            />
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="settings-input"
              placeholder="Confirm new password"
            />
            <button className="update-btn">Update Password</button>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="settings-section">
          <h3>Dark Mode</h3>
          <p>Toggle dark mode for the application.</p>
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Settings;