import React from 'react';
import './ProfileModal.css';

function ProfileModal({ isOpen, closeModal }) {
    if (!isOpen) return null;

    return (
        <div className='modal'>

            <div className='modal-content'>

                <div className='modal-header'>
                    <h2>Profile Settings</h2>
                    <span className='close' onClick={closeModal}>&times;</span>
                </div>

                <div className='user-picture'>
                    <img className='profile-picture' src="https://via.placeholder.com/100" alt="Profile" />
                    <div className='edit-picture'>
                        <h3>Profile Picture</h3>
                        <p>We support PNGs, JPEGs, and GIFs under 10MB</p>
                        <button className='upload-btn'>Upload</button>
                    </div>
                </div>

                <div className='user-details'>
                    <div className='input-group'>
                        <label>First Name</label>
                        <input type='text'/>
                    </div>
                    <div className='input-group'>
                        <label>Last Name</label>
                        <input type='text'/>
                    </div>
                    <div className='input-group'>
                        <label>Phone Number</label>
                        <input type='text'/>
                    </div>
                    <div className='input-group'>
                        <label>Goal</label>
                        <textarea type='text'/>
                    </div>
                </div>

                <button className='edit-profile-btn'>Edit Profile</button>
            </div>

        </div>
    );
}

export default ProfileModal;