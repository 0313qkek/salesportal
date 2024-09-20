import React from 'react';
import './Home.css';

function Home() {
  const meetings = [
    {
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith']
    },
    {
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith', 'John Doe']
    },
    {
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith']
    },
    {
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith']
    }
  ];

  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-info">
          <img className="profile-picture" src="https://via.placeholder.com/100" alt="Profile" />
          <div className="profile-details">
            <h2>Thomas Laub</h2>
            <p className="role">Sales Team Member</p>
            <p className="goals">Goals:</p>
            <p className="goal-description">
              When you upload your personalized goal on the profile, it will show up in here.
            </p>
          </div>
        </div>
        <button className="view-profile-btn">View Profile</button>
      </div>

      <div className="meetings-section">
        <h2>Upcoming meetings</h2>
        <div className="meetings-grid">
          {meetings.map((meeting, index) => (
            <div key={index} className="meeting-card">
              <div className="meeting-image"></div>
              <div className="meeting-details">
                <p className="meeting-title">{meeting.title}</p>
                <p className="meeting-date">{meeting.date}</p>
                <p className="meeting-client">
                  <span className="client-dot"></span>
                  {meeting.clients[0]}
                  {meeting.clients.length > 1 && (
                    <span> + more</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-message">
        Join us in making a positive impact with sustainable practices and philanthropic efforts.
      </div>
    </div>
  );
}

export default Home;