import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-info">
          <h2>Thomas Laub</h2>
          <p className="role">Sales Team Member</p>
          <p className="goals">Goals:</p>
          <p className="goal-description">
            When you upload your personalized goal on the profile, it will show up in here.
          </p>
        </div>
        <button className="view-profile-btn">View Profile</button>
      </div>

      <div className="meetings-section">
        <h2>Upcoming meetings</h2>
        <div className="meetings-container">
          {/* Meeting card structure */}
          <div className="meeting-card">
            <p>Client Meeting</p>
            <span>Wed Sep 4 7:00 PM</span>
            <p>Jane Smith</p>
          </div>
          <div className="meeting-card">
            <p>Client Meeting</p>
            <span>Wed Sep 4 7:00 PM</span>
            <p>Jane Smith</p>
          </div>
          <div className="meeting-card">
            <p>Client Meeting</p>
            <span>Wed Sep 4 7:00 PM</span>
            <p>Jane Smith</p>
          </div>
        </div>
      </div>

      <div className="footer-message">
        Join us in making a positive impact with sustainable practices and philanthropic efforts.
      </div>
    </div>
  );
}

export default Home;