import React, { useState, useEffect } from 'react';
import './Settings.css';

function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [timeZones, setTimeZones] = useState([]);

    useEffect(() => {
        // A static list of time zones
        setTimeZones([
            'UTC',
            'America/New_York',
            'America/Chicago',
            'America/Los_Angeles',
            'Europe/London',
            'Europe/Berlin',
            'Asia/Tokyo',
            'Asia/Seoul',
            'Australia/Sydney',
        ]);
    }, []);

    const handleUpdatePassword = async () => {

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
                alert("Password updated successfully!");
            } else {
                alert(data.error || "Failed to update password.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error(error);
        }
    };

    const handleTimeZoneChange = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/update-timezone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ timeZone }),
            });

            if (response.ok) {
                alert('Time zone updated successfully!');
            } else {
                alert('Failed to update time zone.');
            }
        } catch (error) {
            console.error('Error updating time zone:', error);
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
                    <button className="update-btn" onClick={handleUpdatePassword}>
                        Update Password
                    </button>
                </div>
            </div>

            <div className='settings-section'>
                <h3>Time Zone</h3>
                <p>Select your preferred time zone.</p>
                <select
                    className="settings-input"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                >
                    <option value="">Select Time Zone</option>
                    {timeZones.map((zone) => (
                        <option key={zone} value={zone}>
                            {zone}
                        </option>
                    ))}
                </select>
                <button className="update-btn" onClick={handleTimeZoneChange}>
                    Update Time Zone
                </button>
            </div>
        </div>
    );
}

export default Settings;