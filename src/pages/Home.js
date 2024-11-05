import React, { useState } from 'react';
import './Home.css';
import ProfileModal from '../components/ProfileModal';
import MeetingModal from '../components/MeetingModal';

function Home() {
  const initialMeetings = [
    {
      id: 1,
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith']
    },
    {
      id: 2,
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith', 'John Doe']
    },
    {
      id: 3,
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith']
    },
    {
      id: 4,
      title: 'Client Meeting',
      date: 'Wed Sep 4 7:00 PM',
      clients: ['Jane Smith']
    }
  ];

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);

  const handleViewProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleViewMeeting = () => {
    setIsMeetingModalOpen(true);
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const closeMeetingModal = () => {
    setIsMeetingModalOpen(false);
  }

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
    setSelectedMeetingId(null);
  };

  const handleCardClick = (id) => {
    setSelectedMeetingId(id === selectedMeetingId ? null : id);
  };


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
        <button onClick={handleViewProfile} className="view-profile-btn">View Profile</button>
        <ProfileModal isOpen={isProfileModalOpen} closeModal={closeProfileModal} />
      </div>

      <div className="meetings-section">
        <div className='meetings-header'>
          <h2>Upcoming meetings</h2>
          <button onClick={handleViewMeeting} className="add-meeting-btn">Add Meeting</button>
          <MeetingModal isOpen={isMeetingModalOpen} closeModal={closeMeetingModal} />
        </div>
        <div className="meetings-grid">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="meeting-card" onClick={() => handleCardClick(meeting.id)}>
              <div className="meeting-details">
                <p className="meeting-title">{meeting.title}</p>
                <p className="meeting-date">{meeting.date}</p>
                <p className="meeting-client">
                  <span className="client-dot"></span>
                  {meeting.clients[0]}
                  {meeting.clients.length > 1 && <span> + more</span>}
                </p>
              </div>
              <div className="meeting-tooltip">
                <p><strong>Meeting Name:</strong> {meeting.title}</p>
                <p><strong>Date:</strong> {meeting.date}</p>
                <p><strong>Attendees:</strong> {meeting.clients.join(', ')}</p>
              </div>
              {selectedMeetingId === meeting.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering card click
                    deleteMeeting(meeting.id);
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
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