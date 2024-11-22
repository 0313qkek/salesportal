import React, { useState, useEffect } from 'react';
import './Home.css';
import ProfileModal from '../components/ProfileModal';
import { useUser } from '../context/UserContext';

function Home() {
  const { user } = useUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'https://localhost:4000/auth/microsoft';
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:4000';

  const handleViewProfile = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  // Capture token from URL and reload user context
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      urlParams.delete('token');
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  }, []);

  // Load user details
  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        goal: user.goal,
        picture: user.picture || "https://via.placeholder.com/100",
      });
    }
  }, [user]);

  // Check Microsoft connection
  useEffect(() => {
    const checkMicrosoftConnection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/check-connection`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) throw new Error("Failed to check Microsoft connection.");
        const data = await response.json();
        setIsConnected(data.connected);
      } catch (error) {
        console.error("Error checking Microsoft connection:", error);
      } finally {
        setLoading(false);
      }
    };

    checkMicrosoftConnection();
  }, [API_BASE_URL]);

  // Fetch calendar events if connected
  useEffect(() => {
    const fetchCalendar = async () => {
      if (!isConnected) return;

      try {
        const response = await fetch(`${API_BASE_URL}/calendar`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (response.ok) {
          const data = await response.json();
          setCalendarEvents(data);
        } else {
          console.error("Error fetching calendar events:", await response.text());
          if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem('token');
            window.location.href = AUTH_URL;
          }
        }
      } catch (error) {
        console.error("Error fetching calendar:", error);
      }
    };

    fetchCalendar();
  }, [isConnected, API_BASE_URL]);

  if (loading) return <div>Loading...</div>;

  if (!isConnected) {
    return (
      <div className="connect-container">
        <h2>Connect to Microsoft Account</h2>
        <button onClick={() => (window.location.href = AUTH_URL)}>Connect Microsoft Account</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-info">
          <img className="profile-picture" src={userDetails.picture} alt="Profile" />
          <div className="profile-details">
            <h2>{userDetails.firstName} {userDetails.lastName}</h2>
            <p className="role">{userDetails.role}</p>
            <p className="goals">Goals:</p>
            <p className="goal-description">{userDetails.goal}</p>
          </div>
        </div>
        <button onClick={handleViewProfile} className="view-profile-btn">View Profile</button>
        <ProfileModal isOpen={isProfileModalOpen} closeModal={closeProfileModal} />
      </div>
      <div className="meetings-section">
        <h2>Your Upcoming Meetings</h2>
        {calendarEvents.length > 0 ? (
          <ul>
            {calendarEvents.map((event, idx) => (
              <li key={idx}>
                <strong>{event.subject}</strong>
                <p>{new Date(event.start.dateTime).toLocaleString()}</p>
                <p>{event.location.displayName || "N/A"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;