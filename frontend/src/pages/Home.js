import React, { useState, useEffect } from 'react';
import './Home.css';
import ProfileModal from '../components/ProfileModal';
import CalendarView from '../components/CalendarView';
import { useUser } from '../context/UserContext';

function Home() {
  const { user } = useUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'https://localhost:4000/auth/microsoft';
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:4000';

  const handleViewProfile = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  // // Capture token from URL and reload user context
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
        console.log("Microsoft connection data:", data);
        setIsConnected(data.connected);

        if (data.connected) {
          // Fetch user details after connection
          const userResponse = await fetch(`${API_BASE_URL}/users/details`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          if (!userResponse.ok) throw new Error("Failed to fetch user details.");
          const userData = await userResponse.json();
          console.log("Fetched user details:", userData);
          setUserDetails(userData);
        }
      } catch (error) {
        console.error("Error checking Microsoft connection:", error);
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
          console.log("Raw calendar data:", data);
          setCalendarEvents(
            data.map(event => ({
              title: event.subject,
              start: new Date(event.start.dateTime),
              end: event.end?.dateTime ? new Date(event.end.dateTime) : null,
              location: event.location?.displayName || "N/A",
              description: event.bodyPreview || "", // Optional description
            }))
          );
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
        <>
          {!isConnected ? (
            <>
              <div className="connect-container">
                <button onClick={() => (window.location.href = AUTH_URL)}>Connect Microsoft Account</button>
                <p className='connect-info'>Please connect with Bunchful Microsoft account</p>
              </div>
            </>
          ) : (
            <>
              <CalendarView events={calendarEvents} />
            </>)}
        </>
        {/* {calendarEvents.map((event, idx) => (
          <li key={idx}>
            <strong>{event.title}</strong>
            <p>{new Date(event.start).toLocaleString()}</p>
            <p>Location: {event.location}</p>
          </li>
        ))} */}
      </div>
    </div>
  );
}

export default Home;