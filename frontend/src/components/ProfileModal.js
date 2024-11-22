import React, { useState, useEffect } from 'react';
import './ProfileModal.css';
import { useUser } from '../context/UserContext';

function ProfileModal({ isOpen, closeModal }) {
    const { user, updateUserProfile } = useUser();
    const [userDetails, setUserDetails] = useState({});
    const [picturePreview, setPicturePreview] = useState("https://via.placeholder.com/100");

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:4000';

    useEffect(() => {
        if (user) {
            setUserDetails({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                goal: user.goal,
                picture: user.picture || "https://via.placeholder.com/100",
            });
        }
    }, [user]);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            picture: file,
        }));
        setPicturePreview(URL.createObjectURL(file));
    };

    const handleInputChange = (field, value) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("profilePicture", userDetails.picture);
        formData.append("firstName", userDetails.firstName);
        formData.append("lastName", userDetails.lastName);
        formData.append("phone", userDetails.phone);
        formData.append("goal", userDetails.goal);

        try {
            const response = await fetch(`${API_BASE_URL}/users/update-profile`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                updateUserProfile(data.user);
                localStorage.setItem('token', data.token);
                alert("Profile updated successfully!");
                closeModal();
                window.location.reload();
            } else {
                alert(data.message || "Failed to update profile.");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const checkMicrosoftConnection = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/check-connection`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!response.ok) throw new Error("Failed to check Microsoft connection.");
                const data = await response.json();

                if (data.connected) {
                    // Fetch user details after connection
                    const userResponse = await fetch(`${API_BASE_URL}/users/details`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                    if (!userResponse.ok) throw new Error("Failed to fetch user details.");
                    const userData = await userResponse.json();
                    setUserDetails(userData);
                }
            } catch (error) {
                console.error("Error checking Microsoft connection:", error);
            }
        };

        checkMicrosoftConnection();
    }, [API_BASE_URL]);

    if (!isOpen) return null;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h2>Profile Settings</h2>
                    <span className='close' onClick={closeModal}>&times;</span>
                </div>

                <div className='user-picture'>
                    <img
                        className='profile-picture'
                        src={picturePreview}
                        alt="Profile"
                    />
                    <div className='edit-picture'>
                        <h3>Profile Picture</h3>
                        <p>We support PNGs, JPEGs, and GIFs under 10MB</p>
                        <input type="file" accept="image/*" onChange={handlePictureChange} />
                    </div>
                </div>

                <div className='user-details'>
                    <div className='input-group'>
                        <label>First Name</label>
                        <input
                            type='text'
                            value={userDetails.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="First Name"
                        />
                    </div>
                    <div className='input-group'>
                        <label>Last Name</label>
                        <input
                            type='text'
                            value={userDetails.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Last Name"
                        />
                    </div>
                    <div className='input-group'>
                        <label>Phone Number</label>
                        <input
                            type='text'
                            value={userDetails.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className='input-group'>
                        <label>Goal</label>
                        <textarea
                            type='text'
                            value={userDetails.goal}
                            onChange={(e) => handleInputChange('goal', e.target.value)}
                            placeholder="Your Goal"
                        />
                    </div>
                </div>

                <button className='edit-profile-btn' onClick={handleSaveChanges}>Edit Profile</button>
            </div>
        </div>
    );
}

export default ProfileModal;