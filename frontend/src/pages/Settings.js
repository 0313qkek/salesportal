import React, { useState } from 'react';
import './Settings.css';

function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            setFeedbackMessage("New password and confirmation do not match.");
            return;
        }

        if (!currentPassword || !newPassword) {
            setFeedbackMessage("Please fill out all fields.");
            return;
        }

        setIsLoading(true);
        setFeedbackMessage('');

        try {
            const response = await fetch('/api/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFeedbackMessage("Password updated successfully!");
            } else {
                setFeedbackMessage(data.error || "Failed to update password.");
            }
        } catch (error) {
            setFeedbackMessage("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='settings-container'>
            <h2 className='settings-title'>Settings</h2>

            <div className='settings-section'>
                <h3>Password</h3>
                <p>Change your password.</p>
                <div className='password-inputs'>
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="settings-input"
                        placeholder="Current password"
                    />
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="settings-input"
                        placeholder="New password"
                    />
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="settings-input"
                        placeholder="Confirm new password"
                    />
                    <button
                        className="update-btn"
                        onClick={handleUpdatePassword}
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                    {feedbackMessage && (
                        <p className="feedback-message">{feedbackMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;