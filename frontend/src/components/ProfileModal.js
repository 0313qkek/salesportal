import React, { useState, useEffect }from 'react';
import './ProfileModal.css';
import { useUser } from '../context/UserContext';

function ProfileModal({ isOpen, closeModal }) {
    const { user, updateUserProfile } = useUser();
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userGoal, setUserGoal] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [picturePreview, setPicturePreview] = useState("https://via.placeholder.com/100");

    useEffect(() => {
        if (user) {
            setUserFirstName(user.firstName);
            setUserLastName(user.lastName);
            setUserPhone(user.phone);
            setUserGoal(user.goal);
            setPicturePreview(user.picture || "https://via.placeholder.com/100");
        }
    }, [user]);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setPicturePreview(URL.createObjectURL(file));
    };

    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);
        formData.append("firstName", userFirstName);
        formData.append("lastName", userLastName);
        formData.append("phone", userPhone);
        formData.append("goal", userGoal);

        try {
            const response = await fetch("http://localhost:4000/users/update-profile", {
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
                        alt="Profile" />
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
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                            placeholder={userFirstName}
                        />
                    </div>
                    <div className='input-group'>
                        <label>Last Name</label>
                        <input 
                            type='text'
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                            placeholder={userLastName}
                        />
                    </div>
                    <div className='input-group'>
                        <label>Phone Number</label>
                        <input 
                            type='text'
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            placeholder={userPhone}
                        />
                    </div>
                    <div className='input-group'>
                        <label>Goal</label>
                        <textarea 
                            type='text'
                            value={userGoal}
                            onChange={(e) => setUserGoal(e.target.value)}
                            placeholder={userGoal}
                        />
                    </div>
                </div>

                <button className='edit-profile-btn' onClick={handleSaveChanges}>Edit Profile</button>
            </div>

        </div>
    );
}

export default ProfileModal;